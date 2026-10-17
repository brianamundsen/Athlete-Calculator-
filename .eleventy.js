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
  eleventyConfig.addFilter("isoDate", (d) => (d ? d.toISOString().slice(0, 10) : ""));

  // Insert an HTML snippet right after the page's first </h1>.
  eleventyConfig.addFilter("afterH1", (content, snippet) => {
    if (!snippet || typeof content !== "string") return content;
    const i = content.indexOf("</h1>");
    if (i === -1) return content;
    return content.slice(0, i + 5) + snippet + content.slice(i + 5);
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
