export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    const host = incoming.hostname.toLowerCase();
    const apex = "alluvium.johnwardsinternet.lol";
    let prefix = "";

    if (host === apex) {
      prefix = "";
    } else {
      const match = /^alluvium-([a-z0-9][a-z0-9-]{0,19})\.johnwardsinternet\.lol$/.exec(host);
      if (!match) {
        return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
      }
      prefix = "/" + match[1];
    }

    let path = incoming.pathname;
    if (path === "/" || path.endsWith("/")) {
      path += "index.html";
    }

    // assets.local is ignored by the asset binding; only the pathname is used.
    const assetUrl = new URL("https://assets.local" + prefix + path);
    return env.ASSETS.fetch(new Request(assetUrl, request));
  },
};
