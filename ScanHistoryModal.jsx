import React, { useState } from 'react';
import {
  History,
  X,
  Search,
  Trash2,
  Download,
  ExternalLink,
  Globe,
  Mail,
  QrCode,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export default function ScanHistoryModal({ isOpen, onClose, historyList = [], onClearHistory, onLoadScan }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedItemId, setExpandedItemId] = useState(null);

  if (!isOpen) return null;

  const filteredHistory = (historyList || []).filter((item) => {
    if (!item) return false;

    const verdict = item.verdict || item.riskLevel || '';
    const statement = item.input_type_statement || item.inputTypeStatement || item.statement || '';
    const itemId = item.id || '';
    const category = item.input_category || item.category || item.inputCategory || '';
    const status = item.status || '';

    const matchesSearch =
      verdict.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itemId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' || category.toUpperCase() === categoryFilter.toUpperCase();

    const matchesStatus =
      statusFilter === 'ALL' || status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleExportJSON = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(historyList, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `ai_phishing_scan_history_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const getVectorIcon = (category) => {
    const cat = (category || '').toUpperCase();
    if (cat.includes('URL')) return <Globe className="w-4 h-4 text-cyan-400" />;
    if (cat.includes('EMAIL')) return <Mail className="w-4 h-4 text-indigo-400" />;
    if (cat.includes('QR')) return <QrCode className="w-4 h-4 text-amber-400" />;
    return <FileText className="w-4 h-4 text-emerald-400" />;
  };

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#070d1e]/95 border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] rounded-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#040914] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-neon py-0.5 px-2 text-[10px]">BACKEND SERVICE #9</span>
                <span className="text-xs font-mono text-cyan-300">SCAN HISTORY ENGINE</span>
              </div>
              <h3 className="text-xl font-bold text-white font-[Space_Grotesk]">
                Historical Scan Repository
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {historyList && historyList.length > 0 && (
              <button
                onClick={handleExportJSON}
                className="btn-secondary-cyber text-xs py-2 px-3 flex items-center gap-1.5"
                title="Export history log as JSON file"
              >
                <Download className="w-3.5 h-3.5" />
                Export Logs
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by verdict, ID, or vector payload..."
                className="w-full bg-[#081026] border border-cyan-500/30 rounded-xl py-2 pl-10 pr-4 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#081026] border border-slate-700 text-xs font-mono text-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-cyan-400"
              >
                <option value="ALL">All Vectors</option>
                <option value="URL">URL</option>
                <option value="EMAIL">Email</option>
                <option value="QR CODE">QR Code</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#081026] border border-slate-700 text-xs font-mono text-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-cyan-400"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="DANGEROUS">🔴 Dangerous</option>
                <option value="SUSPICIOUS">🟡 Suspicious</option>
                <option value="SAFE">🟢 Safe</option>
              </select>

              {historyList && historyList.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 transition-all text-xs flex items-center gap-1 shrink-0"
                  title="Clear all saved history logs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable History List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <History className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-300 font-mono">No Scan Records Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {(!historyList || historyList.length === 0)
                  ? 'Perform a live URL, Email, or QR scan using the interactive scanner to record history logs.'
                  : 'No scan results match your active search filter criteria.'}
              </p>
            </div>
          ) : (
            filteredHistory.map((item, idx) => {
              const itemId = item.id || `SCAN-${idx}`;
              const isDangerous = item.status === 'DANGEROUS';
              const isSuspicious = item.status === 'SUSPICIOUS';
              const category = item.input_category || item.category || item.inputCategory || 'VECTOR';
              const statement = item.input_type_statement || item.inputTypeStatement || item.statement || 'Scanned Payload';
              const verdict = item.verdict || 'Threat Analysis Completed';
              const riskScore = item.risk_score ?? item.score;
              const statusLabel = item.status_label || item.statusLabel || (isDangerous ? '🔴 Dangerous' : isSuspicious ? '🟡 Suspicious' : '🟢 Safe');
              const reasons = item.explanation_reasons || item.reasons || [];
              const isExpanded = expandedItemId === itemId;

              return (
                <div
                  key={itemId}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isDangerous
                      ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60'
                      : isSuspicious
                      ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60'
                      : 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/60'
                  }`}
                >
                  {/* Card Main Row */}
                  <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                          isDangerous
                            ? 'bg-rose-950/50 border-rose-500/40'
                            : isSuspicious
                            ? 'bg-amber-950/50 border-amber-500/40'
                            : 'bg-emerald-950/50 border-emerald-500/40'
                        }`}
                      >
                        {getVectorIcon(category)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-cyan-400">{itemId}</span>
                          {item.timestamp && (
                            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              {item.timestamp}
                            </span>
                          )}
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                            {category}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white font-[Space_Grotesk]">
                          {verdict}
                        </h4>

                        <p className="text-xs text-slate-300 font-mono truncate max-w-lg">
                          {statement}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 border-slate-800/80 pt-3 md:pt-0">
                      <div className="text-right">
                        <div className="text-[9px] font-mono text-slate-400 uppercase">RISK SCORE</div>
                        <div
                          className={`text-lg font-mono font-extrabold ${
                            isDangerous ? 'text-rose-400' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {riskScore !== undefined ? `${riskScore} / 100` : 'N/A'}
                        </div>
                      </div>

                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
                          isDangerous
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : isSuspicious
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {statusLabel}
                      </span>

                      {reasons.length > 0 && (
                        <button
                          onClick={() => toggleExpand(itemId)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                          title="Toggle detailed AI explanation reasons"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}

                      {onLoadScan && (
                        <button
                          onClick={() => {
                            onLoadScan(item);
                            onClose();
                          }}
                          className="btn-secondary-cyber text-xs py-1.5 px-3 flex items-center gap-1"
                          title="Load scan details into main inspection view"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded AI Explanation Reasons Drawer */}
                  {isExpanded && reasons.length > 0 && (
                    <div className="p-4 bg-slate-950/80 border-t border-slate-800 space-y-2 fade-in">
                      <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>AI Explanation Reasons Recorded:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {reasons.map((r, rIdx) => (
                          <div key={rIdx} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs">
                            <div className="font-bold text-slate-200 font-mono mb-0.5">{r.title || r}</div>
                            {r.details && <p className="text-[11px] text-slate-400">{r.details}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#040914] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Showing {filteredHistory.length} of {historyList ? historyList.length : 0} recorded scans</span>
          <button onClick={onClose} className="btn-primary-neon py-1.5 px-4 text-xs">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
