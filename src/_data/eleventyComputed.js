module.exports = {
  // Default every page to a flat "slug.html" output file instead of the
  // Eleventy default "slug/index.html" directory structure.
  //
  // Why: directory-style output requires a trailing slash to resolve
  // correctly, so Netlify 301-redirects bare extensionless requests
  // (/page) to the slash version (/page/). That redirect conflicts with
  // our <link rel="canonical"> tags, which always point to the bare
  // extensionless URL. A flat .html file is served by Netlify directly
  // at the bare URL with no redirect, matching canonical exactly.
  //
  // sitemap.xml keeps its own explicit non-HTML permalink.
  permalink: (data) => {
    if (data.page.fileSlug === "sitemap") return "sitemap.xml";
    return data.page.fileSlug ? `${data.page.fileSlug}.html` : "index.html";
  },
};
