// Page groupings used by base.njk for author bylines.
// Every page NOT listed in nonArticles or calculators is treated as an article.
module.exports = {
  author: {
    name: "Brian A.",
    role: "Director of Performance",
    url: "https://athletecalculator.com/about#author",
    bio: "Brian A. is Director of Performance at a top-tier speed school, with decades of coaching and performance work. He reviews the benchmarks behind every calculator on this site and writes its training guidance.",
  },
  calculators: ["vertical-jump-percentile", "sprint-speed-calculator", "squat-strength-calculator", "can-i-dunk-calculator", "broad-jump-sprint-speed-calculator"],
  nonArticles: ["index", "articles", "about", "contact", "privacy-policy", "sitemap"],
};
