// Page groupings used by base.njk for author bylines.
// Every page NOT listed in nonArticles or calculators is treated as an article.
module.exports = {
  author: {
    name: "Brian A.",
    role: "Director of Performance",
    url: "https://athletecalculator.com/about#author",
    bio: "Brian A. is Director of Performance at a top-tier speed school, with decades of coaching and performance work. He reviews the benchmarks behind every calculator on this site and writes its training guidance.",
  },
  calculators: ["vertical-jump-percentile", "40-yard-dash-calculator", "ras-calculator", "one-rep-max-calculator", "sprint-speed-calculator", "squat-strength-calculator", "can-i-dunk-calculator", "broad-jump-sprint-speed-calculator"],
  nonArticles: ["index", "articles", "about", "contact", "privacy-policy", "sitemap"],

  // Manual AdSense display units on calculator pages (base.njk). Placed below
  // the calculator/results and before the FAQ — never between inputs and results.
  // Renders nothing until `slot` is set to a responsive display ad unit ID
  // from AdSense (Ads -> By ad unit -> Display ads).
  adsense: {
    client: "ca-pub-1673639828321526",
    slot: "8089362017",
    // In-article (native, fluid) unit used inside article bodies.
    articleSlot: "8512420887",
  },

  // Amazon Associates "Gear" block on calculator pages (base.njk), shown after
  // the pro-links block. Links are Amazon search results (no fixed ASINs, so
  // nothing goes stale or shows a wrong price). Renders nothing until `tag`
  // is set to the Associates tracking ID (e.g. "athletecalc-20").
  affiliate: {
    tag: "",
    picks: {
      "vertical-jump-percentile": {
        heading: "Gear for training your vertical",
        items: [
          { label: "Soft foam plyo box", q: "soft foam plyometric box", note: "Box jumps without the shin scrapes" },
          { label: "Loop resistance bands", q: "loop resistance bands set", note: "Hip and glute activation before jumping" },
          { label: "Weighted jump rope", q: "weighted jump rope", note: "Ankle stiffness and foot speed" },
        ],
      },
      "can-i-dunk-calculator": {
        heading: "Gear for your dunk program",
        items: [
          { label: "Soft foam plyo box", q: "soft foam plyometric box", note: "Box jumps and depth drops" },
          { label: "Adjustable weighted vest", q: "adjustable weighted vest", note: "Loaded jumps once your landings are solid" },
          { label: "Loop resistance bands", q: "loop resistance bands set", note: "Warm-ups and hip strength" },
        ],
      },
      "40-yard-dash-calculator": {
        heading: "Gear for a faster 40",
        items: [
          { label: "Sprint resistance sled", q: "sprint resistance sled", note: "Acceleration strength for the first 10 yards" },
          { label: "Agility ladder", q: "agility ladder", note: "Foot speed and rhythm work" },
          { label: "Agility cones", q: "agility cones set", note: "Mark out your 10, 20 and 40" },
        ],
      },
      "sprint-speed-calculator": {
        heading: "Gear for sprint training",
        items: [
          { label: "Speed resistance parachute", q: "speed training resistance parachute", note: "Resisted top-speed runs" },
          { label: "Sprint resistance sled", q: "sprint resistance sled", note: "Acceleration strength" },
          { label: "Agility ladder", q: "agility ladder", note: "Foot speed and rhythm work" },
        ],
      },
      "broad-jump-sprint-speed-calculator": {
        heading: "Gear for broad jump and power work",
        items: [
          { label: "Soft foam plyo box", q: "soft foam plyometric box", note: "Bounds and box jumps" },
          { label: "100 ft measuring tape", q: "100 ft measuring tape", note: "Measure jumps and mark sprint distances" },
          { label: "Loop resistance bands", q: "loop resistance bands set", note: "Hip extension warm-ups" },
        ],
      },
      "squat-strength-calculator": {
        heading: "Gear for heavier squats",
        items: [
          { label: "Lifting belt", q: "weightlifting belt", note: "Bracing support on heavy sets" },
          { label: "Weightlifting shoes", q: "weightlifting shoes", note: "A raised heel for deeper squats" },
          { label: "Knee sleeves", q: "knee sleeves 7mm", note: "Warmth and support under load" },
        ],
      },
      "one-rep-max-calculator": {
        heading: "Gear for max-effort lifting",
        items: [
          { label: "Lifting belt", q: "weightlifting belt", note: "Bracing support on heavy singles" },
          { label: "Wrist wraps", q: "wrist wraps weightlifting", note: "Wrist support for bench and overhead press" },
          { label: "Lifting chalk", q: "lifting chalk", note: "A secure grip on heavy pulls" },
        ],
      },
      "ras-calculator": {
        heading: "Gear for testing like the combine",
        items: [
          { label: "Agility cones", q: "agility cones set", note: "Set up the 3-cone and shuttle" },
          { label: "100 ft measuring tape", q: "100 ft measuring tape", note: "Measure the broad jump and 40" },
          { label: "Sports stopwatch", q: "sports stopwatch", note: "Time your sprints and agility drills" },
        ],
      },
    },
  },

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
    "ras-calculator": {
      heading: "See how NFL players tested",
      links: [
        { url: "/relative-athletic-score-nfl", label: "RAS explained: what scores mean by position", tag: "Guide" },
        { url: "/nfl-combine-scores-explained", label: "Every combine test, with good and elite marks", tag: "Benchmark" },
        { url: "/kenyon-sadiq-eli-stowers-combine-vertical-jump", label: "Kenyon Sadiq's record-setting TE combine", tag: "NFL" },
        { url: "/travis-hunter-two-way-season-athletic-profile", label: "Travis Hunter's two-way athletic profile", tag: "NFL" },
        { url: "/jeffery-simmons-bears-trade-athletic-profile", label: "Jeffery Simmons: 305 lbs, 28 bench reps", tag: "NFL" },
        { url: "/nfl-combine", label: "Everything NFL combine in one place", tag: "Hub" },
      ],
    },
    "one-rep-max-calculator": {
      heading: "Put your strength to work",
      links: [
        { url: "/squat-strength-calculator", label: "What your squat predicts for your vertical and 40", tag: "Calculator" },
        { url: "/squat-strength-sprint-speed", label: "Does squat strength make you faster?", tag: "Science" },
        { url: "/how-much-to-squat-to-dunk", label: "How much do you need to squat to dunk?", tag: "Benchmark" },
        { url: "/nfl-combine-scores-explained", label: "NFL combine bench press reps by position", tag: "NFL" },
        { url: "/jeffery-simmons-bears-trade-athletic-profile", label: "Jeffery Simmons: 305 lbs, 28 bench reps", tag: "NFL" },
        { url: "/strength-power", label: "Everything strength and power in one place", tag: "Hub" },
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
        { url: "/one-rep-max-calculator", label: "Estimate your 1RM on any lift", tag: "Calculator" },
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
        { url: "/ras-calculator", label: "Estimate your RAS from your combine numbers", tag: "Calculator" },
        { url: "/kenyon-sadiq-eli-stowers-combine-vertical-jump", label: "Kenyon Sadiq's record-setting TE combine", tag: "NFL" },
        { url: "/germie-bernard-combine-profile-steelers-rookie-record", label: "Germie Bernard's 4.48 combine profile", tag: "NFL" },
        { url: "/nfl-combine-2026-position-group-speed-records", label: "2026 combine speed records by position", tag: "NFL" },
      ],
    },
  },
};
