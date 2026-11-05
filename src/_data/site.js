// Page groupings used by base.njk for author bylines.
// Every page NOT listed in nonArticles or calculators is treated as an article.
module.exports = {
  author: {
    name: "Brian A.",
    role: "Director of Performance",
    url: "https://athletecalculator.com/about#author",
    bio: "Brian A. is Director of Performance at a top-tier speed school, with decades of coaching and performance work. He reviews the benchmarks behind every calculator on this site and writes its training guidance.",
  },
  calculators: ["vertical-jump-percentile", "40-yard-dash-calculator", "sprint-speed-calculator", "squat-strength-calculator", "can-i-dunk-calculator", "broad-jump-sprint-speed-calculator"],
  nonArticles: ["index", "articles", "about", "contact", "privacy-policy", "sitemap"],

  // "Compare yourself to the pros" link block shown on each calculator,
  // inserted by base.njk just before the calculator's article section.
  // Only link to indexable pages.
  proLinks: {
    "vertical-jump-percentile": {
      heading: "Compare your vertical to the pros",
      links: [
        { url: "/victor-wembanyama-vertical-jump", label: "Victor Wembanyama's vertical jump", tag: "NBA" },
        { url: "/lebron-james-vertical-jump", label: "LeBron James' vertical and standing reach", tag: "NBA" },
        { url: "/aj-dybantsa-vertical-jump", label: "AJ Dybantsa's 42-inch combine vertical", tag: "NBA Draft" },
        { url: "/average-nba-vertical-jump", label: "Average NBA vertical jump", tag: "Benchmark" },
        { url: "/vertical-jump-basketball-position", label: "Average vertical by basketball position", tag: "Benchmark" },
        { url: "/good-vertical-jump-by-age", label: "Good vertical jump by age", tag: "Chart" },
      ],
    },
    "40-yard-dash-calculator": {
      heading: "Compare your 40 to the pros",
      links: [
        { url: "/average-40-yard-dash-times", label: "Average 40 times by age, position and level", tag: "Chart" },
        { url: "/nfl-combine-2026-position-group-speed-records", label: "2026 combine speed records by position", tag: "NFL" },
        { url: "/fastest-nfl-rookies-2026-midseason-speed-check", label: "Fastest NFL rookies of 2026", tag: "NFL" },
        { url: "/kenneth-walker-iii-combine-profile-chiefs-rushing-record", label: "Kenneth Walker III's 4.38 profile", tag: "NFL" },
        { url: "/travis-kelce-height-wingspan-40-time-vertical-jump", label: "Travis Kelce's 4.61 40 time", tag: "NFL" },
        { url: "/how-to-run-faster-40-yard-dash", label: "How to run a faster 40", tag: "Training" },
      ],
    },
    "sprint-speed-calculator": {
      heading: "Compare your speed to the pros",
      links: [
        { url: "/40-yard-dash-calculator", label: "40-yard dash calculator by NFL position", tag: "Calculator" },
        { url: "/average-40-yard-dash-times", label: "Average 40 times by age, position and level", tag: "Chart" },
        { url: "/fastest-nfl-rookies-2026-training-camp", label: "Fastest NFL rookies of 2026", tag: "NFL" },
        { url: "/how-fast-are-world-cup-players", label: "How fast World Cup players run in mph", tag: "Soccer" },
        { url: "/shai-gilgeous-alexander-speed", label: "How fast is Shai Gilgeous-Alexander?", tag: "NBA" },
        { url: "/how-fast-is-the-average-person", label: "How fast is the average person?", tag: "Benchmark" },
      ],
    },
    "squat-strength-calculator": {
      heading: "See how strength shows up in the pros",
      links: [
        { url: "/squat-strength-sprint-speed", label: "Does squat strength make you faster?", tag: "Science" },
        { url: "/how-much-to-squat-to-dunk", label: "How much do you need to squat to dunk?", tag: "Benchmark" },
        { url: "/nfl-combine-scores-explained", label: "NFL combine tests explained", tag: "NFL" },
        { url: "/relative-athletic-score-nfl", label: "Relative Athletic Score (RAS) by position", tag: "NFL" },
        { url: "/jeffery-simmons-bears-trade-athletic-profile", label: "Jeffery Simmons: 305 lbs, 28 bench reps", tag: "NFL" },
        { url: "/how-to-increase-vertical-jump", label: "8-week vertical jump program", tag: "Training" },
      ],
    },
    "can-i-dunk-calculator": {
      heading: "Compare yourself to NBA athletes",
      links: [
        { url: "/vertical-jump-needed-to-dunk", label: "Vertical jump needed to dunk at your height", tag: "Chart" },
        { url: "/jalen-brunson-height-wingspan", label: "Jalen Brunson: 6'1\" with a 6'4\" wingspan", tag: "NBA" },
        { url: "/shai-gilgeous-alexander-speed", label: "SGA's height, wingspan and vertical", tag: "NBA" },
        { url: "/giannis-antetokounmpo-athletic-profile", label: "Giannis' 7'4\" wingspan and vertical", tag: "NBA" },
        { url: "/lebron-james-vertical-jump", label: "LeBron James' vertical and standing reach", tag: "NBA" },
        { url: "/how-much-to-squat-to-dunk", label: "How much do you need to squat to dunk?", tag: "Benchmark" },
      ],
    },
    "broad-jump-sprint-speed-calculator": {
      heading: "Compare your power to NFL prospects",
      links: [
        { url: "/40-yard-dash-calculator", label: "40-yard dash calculator by NFL position", tag: "Calculator" },
        { url: "/nfl-combine-scores-explained", label: "NFL combine tests explained", tag: "NFL" },
        { url: "/relative-athletic-score-nfl", label: "Relative Athletic Score (RAS) by position", tag: "NFL" },
        { url: "/kenyon-sadiq-eli-stowers-combine-vertical-jump", label: "Kenyon Sadiq's record-setting TE combine", tag: "NFL" },
        { url: "/germie-bernard-combine-profile-steelers-rookie-record", label: "Germie Bernard's 4.48 combine profile", tag: "NFL" },
        { url: "/nfl-combine-2026-position-group-speed-records", label: "2026 combine speed records by position", tag: "NFL" },
      ],
    },
  },
};
