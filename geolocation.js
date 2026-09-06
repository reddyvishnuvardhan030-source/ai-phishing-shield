/**
 * Geolocation Lookup Service using ipwho.is (Native HTTPS, free, no API key required).
 * Resolves domain hostnames via Secure DNS-over-HTTPS (Google/Cloudflare DoH) first,
 * then retrieves geolocation and ISP/ASN metadata over native HTTPS.
 */

export async function getGeoLocation(domainOrIp) {
  if (!domainOrIp || typeof domainOrIp !== 'string') {
    return { success: false, error: 'Invalid domain or IP input' };
  }

  // Clean domain or IP input by stripping protocol, path, port, and search params
  let cleanHost = domainOrIp.trim();
  cleanHost = cleanHost.replace(/^https?:\/\//i, '').split('/')[0].split('?')[0].split('#')[0].split(':')[0];

  // If host is an email address, extract domain part after @
  if (cleanHost.includes('@')) {
    cleanHost = cleanHost.split('@').pop().trim();
  }

  if (!cleanHost) {
    return { success: false, error: 'Empty domain or IP' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    let targetIp = cleanHost;
    const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(cleanHost) || cleanHost.startsWith('[');

    // If cleanHost is a domain hostname, resolve to IP via Google/Cloudflare DNS over HTTPS
    if (!isIpAddress) {
      try {
        const dnsRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cleanHost)}&type=A`, {
          signal: controller.signal
        });
        if (dnsRes.ok) {
          const dnsData = await dnsRes.json();
          if (dnsData.Answer && dnsData.Answer.length > 0) {
            const aRecord = dnsData.Answer.find(ans => ans.type === 1);
            if (aRecord && aRecord.data) {
              targetIp = aRecord.data;
            }
          }
        }
      } catch (dnsErr) {
        // Fallback to Cloudflare DoH if Google DoH is unreachable
        try {
          const cfDnsRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanHost)}&type=A`, {
            headers: { 'Accept': 'application/dns-json' },
            signal: controller.signal
          });
          if (cfDnsRes.ok) {
            const cfDnsData = await cfDnsRes.json();
            if (cfDnsData.Answer && cfDnsData.Answer.length > 0) {
              const aRecord = cfDnsData.Answer.find(ans => ans.type === 1);
              if (aRecord && aRecord.data) {
                targetIp = aRecord.data;
              }
            }
          }
        } catch (e) {}
      }
    }

    // Now query ipwho.is with resolved IP address over native HTTPS
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(targetIp)}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response || !response.ok) {
      return { success: false, error: 'Geolocation API request failed' };
    }

    const data = await response.json();

    if (!data.success) {
      return { success: false, error: data.message || 'Geolocation unavailable' };
    }

    const locationParts = [data.city, data.region, data.country].filter(Boolean);
    const locationFormatted = locationParts.length > 0 ? locationParts.join(', ') : 'Unknown Location';

    const ispStr = data.connection?.isp || data.connection?.org || 'Unknown ISP';
    let asnStr = 'Unknown ASN';
    if (data.connection?.asn) {
      const orgOrIsp = data.connection?.org || data.connection?.isp || '';
      asnStr = `AS${data.connection.asn}${orgOrIsp ? ' ' + orgOrIsp : ''}`;
    }

    return {
      success: true,
      ip: data.ip || targetIp,
      country: data.country || 'Unknown Country',
      region: data.region || 'Unknown Region',
      city: data.city || 'Unknown City',
      isp: ispStr,
      asn: asnStr,
      locationFormatted
    };
  } catch (err) {
    return { success: false, error: 'Geolocation unavailable' };
  }
}
