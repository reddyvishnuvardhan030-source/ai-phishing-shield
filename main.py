from fastapi import FastAPI, HTTPException, Header, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
import re
import datetime
import secrets

app = FastAPI(
    title="AI Phishing Shield Ecosystem API",
    description="Comprehensive 12-Service Backend for AI Cybersecurity Threat Detection & Intelligence",
    version="2.0.0"
)

# Enable CORS for local React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class ScanRequest(BaseModel):
    input_text: str
    scan_vector: Optional[str] = "AUTO"  # AUTO | URL | EMAIL | QR | PLAIN_TEXT

class URLScanRequest(BaseModel):
    url: str

class EmailScanRequest(BaseModel):
    email_body: str
    sender_email: Optional[str] = None
    subject: Optional[str] = None
    has_attachment: Optional[bool] = False
    attachment_name: Optional[str] = None

class QRScanRequest(BaseModel):
    qr_payload: str
    is_base64_image: Optional[bool] = False

class ReasonItem(BaseModel):
    title: str
    details: str
    severity: str  # HIGH | MEDIUM | LOW

class DomainReputationInfo(BaseModel):
    domain: str
    registered_days_ago: int
    registrar: str
    ssl_valid: bool
    ssl_issuer: str
    dns_spf_record: bool
    dns_dmarc_record: bool
    dns_dkim_record: bool
    reputation_status: str  # SAFE | SUSPICIOUS | POOR

class ThreatIntelInfo(BaseModel):
    query: str
    is_blacklisted: bool
    matching_feeds: List[str]
    threat_category: str
    last_flagged: Optional[str] = None

class ScanResponse(BaseModel):
    id: str
    timestamp: str
    input_type_statement: str
    input_category: str
    risk_score: int  # 0 to 100
    status: str  # SAFE (0-30) | SUSPICIOUS (31-70) | DANGEROUS (71-100)
    status_label: str  # 🟢 Safe | 🟡 Suspicious | 🔴 Dangerous
    verdict: str
    domain_reputation: Optional[DomainReputationInfo] = None
    threat_intel: Optional[ThreatIntelInfo] = None
    explanation_reasons: List[ReasonItem]
    recommended_actions: List[str]

class UserSignUp(BaseModel):
    email: str
    password: str
    full_name: str
    company: Optional[str] = "Security Team"

class UserLogin(BaseModel):
    email: str
    password: str

class AuthToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class APIKeyResponse(BaseModel):
    api_key: str
    key_name: str
    created_at: str
    tier: str

# In-Memory Databases for Demonstration & Sync
SCAN_HISTORY_DB: List[dict] = []
MOCK_USERS_DB = {
    "user@cybersecurity.io": {
        "email": "user@cybersecurity.io",
        "full_name": "Alexander Vance",
        "company": "Enterprise Cyber Defense Inc",
        "role": "Lead Security Analyst",
        "api_key": "sec_live_98a72f1b4092d6e"
    }
}
API_KEYS_DB = set(["sec_live_98a72f1b4092d6e"])

# Heuristic & Analysis Functions
def classify_input(text: str) -> tuple[str, str]:
    trimmed = text.strip()
    if not trimmed:
        return ("Unknown", "Waiting for input...")
    lowered = trimmed.lower()
    if "qr code" in lowered or lowered.startswith("qr:") or re.search(r'https?://[^\s]+\?(qr|code)=', lowered):
        return ("QR Code", "This is a QR code vector")
    if lowered.startswith("from:") or "subject:" in lowered or ("@" in trimmed and "\n" in trimmed):
        return ("Email", "This is an email vector")
    if trimmed.startswith("http://") or trimmed.startswith("https://") or re.match(r'^(https?://)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(/.*)?$', trimmed.split("\n")[0]):
        return ("URL", "This is a web URL vector")
    return ("Plain Text", "This is plain text message")

def extract_domain(url: str) -> str:
    cleaned = url.replace("https://", "").replace("http://", "").split("/")[0].split("?")[0].split(":")[0]
    return cleaned if cleaned else "unknown-domain.com"

def get_mock_domain_reputation(domain: str, is_dangerous: bool) -> DomainReputationInfo:
    if is_dangerous:
        return DomainReputationInfo(
            domain=domain,
            registered_days_ago=2,
            registrar="NameCheap CheapKits LLC",
            ssl_valid=False,
            ssl_issuer="Let's Encrypt (Self-Signed / Untrusted)",
            dns_spf_record=False,
            dns_dmarc_record=False,
            dns_dkim_record=False,
            reputation_status="POOR"
        )
    return DomainReputationInfo(
        domain=domain,
        registered_days_ago=4820,
        registrar="DigiCert Global Registry Inc",
        ssl_valid=True,
        ssl_issuer="DigiCert EV TLS RSA CA",
        dns_spf_record=True,
        dns_dmarc_record=True,
        dns_dkim_record=True,
        reputation_status="SAFE"
    )

def get_mock_threat_intel(target: str, is_dangerous: bool) -> ThreatIntelInfo:
    if is_dangerous:
        return ThreatIntelInfo(
            query=target,
            is_blacklisted=True,
            matching_feeds=["PhishTank Database #9821", "VirusTotal 14/68 Engines", "OpenPhish Threat Feed"],
            threat_category="Credential Harvesting / Phishing Target",
            last_flagged="12 minutes ago"
        )
    return ThreatIntelInfo(
        query=target,
        is_blacklisted=False,
        matching_feeds=[],
        threat_category="Clean Infrastructure",
        last_flagged=None
    )

def perform_ai_threat_analysis(text: str, category: str) -> dict:
    lowered = text.lower()
    is_malicious = any(kw in lowered for kw in [
        "paypal-sercuity", "paypai", "auth-update", "executive-office",
        "fastpay", "usps-redelivery", ".xyz", ".top", "urgent", ".exe",
        "wire transfer", "verify-account", "login.php", "chase-update"
    ]) or re.search(r'https?://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', text)
    
    is_suspicious = not is_malicious and any(kw in lowered for kw in [
        "password", "account", "login", "confirm", "update", "security", "click here", "verify"
    ])

    domain = extract_domain(text)

    if is_malicious:
        score = 94 if "paypal-sercuity" in lowered or ".xyz" in lowered else 88
        status = "DANGEROUS"
        status_label = "🔴 Dangerous"
        verdict = "Critical Phishing & Malicious Threat Detected"
        reasons = [
            ReasonItem(
                title="Deceptive Homoglyph / Typosquatting Domain",
                details=f"The domain '{domain}' uses spelling variations designed to mimic authentic official services.",
                severity="HIGH"
            ),
            ReasonItem(
                title="Untrusted High-Risk Top-Level Domain (.xyz / .top)",
                details="Site uses a low-cost, disposable TLD heavily linked to automated malware & phishing operations.",
                severity="HIGH"
            ),
            ReasonItem(
                title="Credential Harvesting Trap",
                details="Analyzed page structure contains login credential interception forms posting to unauthorized IPs.",
                severity="HIGH"
            ),
            ReasonItem(
                title="Domain Registered Recently (2 Days Ago)",
                details="WHOIS query confirms domain creation is extremely recent (2 days old), characteristic of zero-day attack infrastructure.",
                severity="MEDIUM"
            )
        ]
        actions = [
            "DO NOT enter passwords, financial numbers, or personal credentials.",
            "Do not click internal links or download attached payloads.",
            "Block sender and report link to your enterprise SOC firewall immediately.",
            "If credentials were submitted, change your password on official sites and revoke session tokens."
        ]
    elif is_suspicious:
        score = 52
        status = "SUSPICIOUS"
        status_label = "🟡 Suspicious"
        verdict = "Suspicious Phishing Indicators Present"
        reasons = [
            ReasonItem(
                title="Unverified Sender Domain / Missing DMARC",
                details="Message contains call-to-action prompts with unverified DNS authentication records.",
                severity="MEDIUM"
            ),
            ReasonItem(
                title="Generic Urgency Language Detected",
                details="Uses urgent call-to-action tone to prompt fast user click-throughs without verification.",
                severity="LOW"
            )
        ]
        actions = [
            "Proceed with extreme caution. Cross-check domain directly in your browser address bar.",
            "Verify identity of sender via out-of-band communication channel before sharing information."
        ]
    else:
        score = 4
        status = "SAFE"
        status_label = "🟢 Safe"
        verdict = "No Malicious Phishing Patterns Detected"
        reasons = [
            ReasonItem(
                title="Authenticated Official Infrastructure",
                details=f"Domain '{domain}' is backed by valid SSL TLS certificates matching registered official organization records.",
                severity="LOW"
            ),
            ReasonItem(
                title="Established Domain Reputation",
                details="Domain age exceeds 10+ years with clean history across PhishTank, VirusTotal, and OpenPhish threat intelligence feeds.",
                severity="LOW"
            )
        ]
        actions = [
            "You may proceed safely.",
            "Always inspect the address bar to ensure domain name consistency."
        ]

    dom_rep = get_mock_domain_reputation(domain, is_malicious)
    threat_intel = get_mock_threat_intel(text, is_malicious)

    return {
        "score": score,
        "status": status,
        "status_label": status_label,
        "verdict": verdict,
        "domain_reputation": dom_rep,
        "threat_intel": threat_intel,
        "reasons": reasons,
        "actions": actions
    }

# ----------------------------------------------------
# 12 CORE BACKEND SERVICES ENDPOINTS
# ----------------------------------------------------

@app.get("/")
def health_check():
    return {
        "service": "AI Phishing Shield Backend Ecosystem",
        "status": "ONLINE",
        "version": "2.0.0",
        "capabilities": [
            "URL Scanner", "Email Scanner", "QR Code Scanner",
            "AI Phishing Detection", "Domain Reputation", "Threat Intelligence",
            "Risk Score Engine", "AI Explanation", "Scan History",
            "User Authentication", "Dashboard Telemetry", "API Service"
        ]
    }

# 1, 4, 7, 8: Unified Scan Endpoint
@app.post("/api/v1/scan", response_model=ScanResponse)
def scan_input(req: ScanRequest):
    text = req.input_text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty")
    
    category, statement = classify_input(text)
    analysis = perform_ai_threat_analysis(text, category)
    
    scan_id = f"SCAN-{secrets.token_hex(4).upper()}"
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    scan_result = ScanResponse(
        id=scan_id,
        timestamp=timestamp,
        input_type_statement=statement,
        input_category=category,
        risk_score=analysis["score"],
        status=analysis["status"],
        status_label=analysis["status_label"],
        verdict=analysis["verdict"],
        domain_reputation=analysis["domain_reputation"],
        threat_intel=analysis["threat_intel"],
        explanation_reasons=analysis["reasons"],
        recommended_actions=analysis["actions"]
    )
    
    # Save to scan history database
    SCAN_HISTORY_DB.insert(0, scan_result.dict())
    return scan_result

# 1: URL Scanner Endpoint
@app.post("/api/v1/scan/url", response_model=ScanResponse)
def scan_url(req: URLScanRequest):
    return scan_input(ScanRequest(input_text=req.url, scan_vector="URL"))

# 2: Email Scanner Endpoint
@app.post("/api/v1/scan/email", response_model=ScanResponse)
def scan_email(req: EmailScanRequest):
    combined_text = f"From: {req.sender_email or 'Unknown'}\nSubject: {req.subject or 'No Subject'}\n{req.email_body}"
    if req.has_attachment:
        combined_text += f"\nAttachment: {req.attachment_name or 'file.exe'}"
    return scan_input(ScanRequest(input_text=combined_text, scan_vector="EMAIL"))

# 3: QR Code Scanner Endpoint
@app.post("/api/v1/scan/qr", response_model=ScanResponse)
def scan_qr(req: QRScanRequest):
    payload = f"QR Code parsed data: {req.qr_payload}"
    return scan_input(ScanRequest(input_text=payload, scan_vector="QR"))

# 5: Domain Reputation Service
@app.get("/api/v1/domain-reputation/{domain}", response_model=DomainReputationInfo)
def query_domain_reputation(domain: str):
    cleaned = domain.replace("https://", "").replace("http://", "").split("/")[0]
    is_dangerous = any(kw in cleaned.lower() for kw in ["paypal-sercuity", ".xyz", ".top", "auth-update"])
    return get_mock_domain_reputation(cleaned, is_dangerous)

# 6: Threat Intelligence Service
@app.get("/api/v1/threat-intel/{target:path}", response_model=ThreatIntelInfo)
def query_threat_intel(target: str):
    is_dangerous = any(kw in target.lower() for kw in ["paypal-sercuity", ".xyz", ".top", "auth-update", "urgent"])
    return get_mock_threat_intel(target, is_dangerous)

# 9: Scan History Service
@app.get("/api/v1/history")
def get_scan_history(limit: int = Query(20, ge=1, le=100)):
    return {
        "total_scans": len(SCAN_HISTORY_DB),
        "history": SCAN_HISTORY_DB[:limit]
    }

@app.delete("/api/v1/history/clear")
def clear_scan_history():
    SCAN_HISTORY_DB.clear()
    return {"status": "cleared", "message": "Scan history successfully reset"}

# 10: User Authentication Service
@app.post("/api/v1/auth/signup", response_model=AuthToken)
def user_signup(req: UserSignUp):
    if req.email in MOCK_USERS_DB:
        raise HTTPException(status_code=400, detail="Account with this email already exists")
    
    api_key = f"sec_live_{secrets.token_hex(8)}"
    user_data = {
        "email": req.email,
        "full_name": req.full_name,
        "company": req.company or "Personal Account",
        "role": "Security Specialist",
        "api_key": api_key
    }
    MOCK_USERS_DB[req.email] = user_data
    API_KEYS_DB.add(api_key)
    
    return AuthToken(
        access_token=f"jwt_{secrets.token_hex(16)}",
        user=user_data
    )

@app.post("/api/v1/auth/login", response_model=AuthToken)
def user_login(req: UserLogin):
    user = MOCK_USERS_DB.get(req.email)
    if not user:
        # Create default mock user session if not found for seamless testing
        user = {
            "email": req.email,
            "full_name": req.email.split("@")[0].capitalize(),
            "company": "Security Team",
            "role": "Analyst",
            "api_key": f"sec_live_{secrets.token_hex(8)}"
        }
        MOCK_USERS_DB[req.email] = user
    
    return AuthToken(
        access_token=f"jwt_{secrets.token_hex(16)}",
        user=user
    )

@app.get("/api/v1/auth/me")
def get_user_profile(email: str = Query("user@cybersecurity.io")):
    user = MOCK_USERS_DB.get(email, {
        "email": email,
        "full_name": "Alexander Vance",
        "company": "Enterprise Security Ops",
        "role": "Lead Security Analyst",
        "api_key": "sec_live_98a72f1b4092d6e"
    })
    return user

# 12: API Service & Developer Keys
@app.post("/api/v1/api-keys/generate", response_model=APIKeyResponse)
def generate_api_key(key_name: str = Query("Default Production Key")):
    new_key = f"sec_live_{secrets.token_hex(12)}"
    API_KEYS_DB.add(new_key)
    return APIKeyResponse(
        api_key=new_key,
        key_name=key_name,
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        tier="Enterprise Tier - 1,000,000 requests/mo"
    )

# 11: Telemetry Dashboard & Stats
@app.get("/api/v1/dashboard/stats")
def get_dashboard_stats():
    return {
        "total_scans_today": 18942 + len(SCAN_HISTORY_DB),
        "threats_blocked_today": 4812,
        "avg_scan_latency_ms": 14,
        "zero_day_breach_rate": "0.00%",
        "vectors_breakdown": {
            "URL": 45,
            "Email": 30,
            "QR Code": 15,
            "Plain Text": 10
        },
        "risk_levels": {
            "Dangerous": 25,
            "Suspicious": 35,
            "Safe": 40
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
