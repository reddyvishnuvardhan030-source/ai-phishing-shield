/**
 * Geolocation Lookup Service using public ip-api.com API.
 * Resolves domain hostnames and IP addresses to geolocation and ISP/ASN metadata.
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

    const fields = 'status,message,country,regionName,city,isp,as,query';
    let url = `http://ip-api.com/json/${encodeURIComponent(cleanHost)}?fields=${fields}`;

    let response;
    try {
      response = await fetch(url, { signal: controller.signal });
    } catch (netErr) {
      // Retry over https if http fetch failed (e.g., HTTPS enforcement)
      url = `https://ip-api.com/json/${encodeURIComponent(cleanHost)}?fields=${fields}`;
      response = await fetch(url, { signal: controller.signal });
    }

    clearTimeout(timeoutId);

    if (!response || !response.ok) {
      return { success: false, error: 'Geolocation API request failed' };
    }

    const data = await response.json();

    if (data.status !== 'success') {
      return { success: false, error: data.message || 'Geolocation unavailable' };
    }

    const locationParts = [data.city, data.regionName, data.country].filter(Boolean);
    const locationFormatted = locationParts.length > 0 ? locationParts.join(', ') : 'Unknown Location';

    return {
      success: true,
      ip: data.query || cleanHost,
      country: data.country || 'Unknown Country',
      region: data.regionName || 'Unknown Region',
      city: data.city || 'Unknown City',
      isp: data.isp || 'Unknown ISP',
      asn: data.as || 'Unknown ASN',
      locationFormatted
    };
  } catch (err) {
    return { success: false, error: 'Geolocation unavailable' };
  }
}
