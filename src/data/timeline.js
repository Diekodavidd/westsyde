const TIMELINE = [
  [
    "Sept 2025",
    "The family is founded",
    "WestSyde opens its doors with one rule: more than a community, a family.",
  ],
  [
    "Late 2025",
    "The first hundred",
    "Members arrive from every timezone. The panel never really goes quiet again.",
  ],
  [
    "Early 2026",
    "PinkSyde opens",
    "The ladies of WestSyde take a crest of their own.",
  ],
  [
    "Mid 2026",
    "The stag appears",
    "A celebration emblem is drawn for the anniversary drop.",
  ],
  [
    "Sept 2026",
    "One year",
    "Twelve games, two nights, the whole family on one panel.",
  ],
];

const timeline = TIMELINE.map(([when, title, body]) => ({
  when,
  title,
  body,
}));

export default timeline;