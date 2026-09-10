// Cached proxy in front of the API Gateway events endpoint.
//
// This exists because a vercel.json rewrite does NOT work: Vercel's edge
// passes external rewrites straight through without caching them (verified in
// production -- x-vercel-cache MISS on every request). Function responses,
// however, ARE cached when they set s-maxage. Hence a function.
//
// s-maxage is the shared/CDN cache -- one visitor's fetch now serves everyone
// for 5 minutes. stale-while-revalidate lets the edge serve slightly stale
// data while it refreshes in the background, so nobody waits on a cold fetch.
const EVENTS_API = "https://foo8rsm3la.execute-api.us-east-1.amazonaws.com/prod";

module.exports = async (req, res) => {
  try {
    const upstream = await fetch(EVENTS_API);
    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
    const body = await upstream.text();

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    );
    return res.status(200).send(body);
  } catch (err) {
    // Don't cache failures -- otherwise one blip poisons the edge for 5min.
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ error: String(err), events: [] });
  }
};
