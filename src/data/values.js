const VALUES = [
  ["W", "Welcome", "Everyone deserves a place to belong."],
  ["E", "Equality", "Every member matters; no one is above the family."],
  ["S", "Support", "We show up for one another."],
  ["T", "Trust", "Loyalty and integrity matter, especially behind closed doors."],
  ["S", "Strength", "We stand together through challenges."],
  ["Y", "You", "You don’t have to lose your individuality to belong here."],
  ["D", "Development", "We encourage growth, learning and progress."],
  ["E", "Excellence", "Whatever we represent, we aim to represent it well."],
];

const values = VALUES.map(([letter, word, body]) => ({
  letter,
  word,
  body,
}));

export default values;