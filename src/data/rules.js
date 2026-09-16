const RULES = [
  "One seat is one player. No sharing an account and no playing for someone else.",
  "You may register for a maximum of two games across both nights.",
  "Be on the panel when your name is called — 90 seconds, then the first reserve takes the seat.",
  "The Game Master’s decision is final once “lock in” has been called.",
  "No insults, no dragging, no fighting on the panel. Play the game, not the person.",
  "Winners are announced on the panel and posted in the family group the same night.",
];

const rules = RULES.map((text, index) => ({
  no: String(index + 1).padStart(2, "0"),
  text,
}));

export default rules;