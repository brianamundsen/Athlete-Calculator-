const { execSync } = require("child_process");
const pageDates = require("./src/_data/pageDates.json");

// Last-updated date for a page: explicit front matter `updated` wins, then the
// committed pageDates.json snapshot, then the file's last git commit (works for
// newly added articles even on a shallow clone, since their only commit is recent).
function lastUpdated(slug, inputPath, frontMatterDate) {
  if (frontMatterDate) return new Date(frontMatterDate);
  if (pageDates[slug]) return new Date(pageDates[slug] + "T12:00:00Z");
  try {
    const out = execSync(`git log -1 --format=%cs -- "${inputPath}"`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (out) return new Date(out + "T12:00:00Z");
  } catch (e) {}
  return null;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  eleventyConfig.addFilter("lastUpdated", (page, updated) => lastUpdated(page.fileSlug, page.inputPath, updated));

  eleventyConfig.addFilter("readableDate", (d) =>
    d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : ""
  );
  // Keep JSON-LD dateModified in step with the visible "Updated" date and the sitemap:
  // all three come from lastUpdated() (front matter > pageDates.json > git).
  eleventyConfig.addFilter("syncDateModified", (jsonld, d) => {
    if (!jsonld || !d) return jsonld;
    const iso = d.toISOString().slice(0, 10);
    return jsonld.replace(/("dateModified"\s*:\s*")[^"]*(")/g, `$1${iso}$2`);
  });

  eleventyConfig.addFilter("isoDate", (d) => (d ? d.toISOString().slice(0, 10) : ""));

  // Insert an HTML snippet right after the page's first </h1>.
  eleventyConfig.addFilter("afterH1", (content, snippet) => {
    if (!snippet || typeof content !== "string") return content;
    const i = content.indexOf("</h1>");
    if (i === -1) return content;
    return content.slice(0, i + 5) + snippet + content.slice(i + 5);
  });

  // Insert an HTML snippet right after the first occurrence of `marker`
  // (leaves content unchanged if the marker is missing).
  eleventyConfig.addFilter("afterMarker", (content, marker, snippet) => {
    if (!snippet || typeof content !== "string") return content;
    const i = content.indexOf(marker);
    if (i === -1) return content;
    return content.slice(0, i + marker.length) + snippet + content.slice(i + marker.length);
  });

  // In-article ads: one before the 3rd <h2> of the article body (after two
  // full sections), and a second before the FAQ heading only when at least
  // three sections separate it from the first ad. Only counts <h2>s inside
  // <div class="content"> and before the sidebar.
  eleventyConfig.addFilter("inArticleAds", (content, snippet) => {
    if (!snippet || typeof content !== "string") return content;
    const start = content.indexOf('<div class="content">');
    if (start === -1) return content;
    let end = content.indexOf('<aside class="sidebar"', start);
    if (end === -1) end = content.length;
    const heads = [];
    const re = /<h2[\s>]/g;
    re.lastIndex = start;
    let m;
    while ((m = re.exec(content)) && m.index < end) heads.push(m.index);
    if (heads.length < 4) return content;
    const spots = [heads[2]];
    const faq = heads.findIndex((i) => content.startsWith("<h2>Frequently Asked Questions</h2>", i));
    if (faq >= 5) spots.push(heads[faq]);
    let out = content;
    for (const i of spots.reverse()) out = out.slice(0, i) + snippet + out.slice(i);
    return out;
  });

  // Insert an HTML snippet right before the first occurrence of `marker`
  // (falls back to appending at the end if the marker is missing).
  eleventyConfig.addFilter("beforeMarker", (content, marker, snippet) => {
    if (!snippet || typeof content !== "string") return content;
    const i = content.indexOf(marker);
    if (i === -1) return content + snippet;
    return content.slice(0, i) + snippet + content.slice(i);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
