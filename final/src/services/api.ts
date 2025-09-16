
export async function getUtcIsoNow(): Promise<string> {
  try {
    const r = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
    const j = await r.json();
    if (typeof j.datetime === 'string') return j.datetime;
  } catch {}
  return new Date().toISOString();
}
