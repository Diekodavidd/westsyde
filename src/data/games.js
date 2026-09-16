export const games = [
  {
    id: "g21",
    day: 1,
    no: 1,
    name: "21 Game",
    groups: 2,
    seatsPerGroup: 10,
    reserves: 2,
    blurb:
      "A counting duel where the wrong number ends your night. Nerve over speed.",
    explanation:
      "Starting with the first player, each turn you may say a minimum of 1 number and a maximum of 3 consecutive numbers. The count continues from where the previous player stopped. For example, if a player says 12, the next player can say 13, or 13 and 14, or 13, 14 and 15. Whoever is forced to say 21 is out. You are also out if you say more than 3 numbers or if you are too slow or hesitate. The game continues until one player remains.",
  },

  {
    id: "lws",
    no: 2,
    day: 1,
    name: "Last Word Sentence",
    blurb:
      "Each player builds a sentence that must begin with the last word spoken before them.",
    explanation:
      "The first player says a complete, sensible sentence. The next player must start their own complete sentence using the last word of the previous player's sentence. For example, if a player says, \"WestSyde is the best family,\" the next player must begin with \"Family\" and create a sensible sentence such as, \"Family is the best place to receive love from.\" Questions are not allowed. Your sentence must make sense and be complete. If you cannot form a valid sentence, fail to use the correct last word, or take too long, you are out. The game continues until one player remains.",
  },

  {
    id: "con",
    no: 3,
    day: 1,
    name: "Concentration",
    groups: 2,
    seatsPerGroup: 10,
    reserves: 2,
    blurb:
      "Keep the rhythm, keep the category, never repeat and never break the beat.",
    explanation:
      "Players take turns naming things that belong to a chosen category. For example, if the category is car brands, the first player might say \"Lexus,\" the next player could say \"Toyota,\" and the game continues around the panel. You cannot repeat something that has already been said, and you cannot use the same category in back-to-back rounds. If you cannot think of a valid answer, repeat an answer, break the category, or take too long, you flop and are out. The game continues until one player remains.",
  },

  {
    id: "mbr",
    no: 4,
    day: 1,
    name: "Move. Bounce. Reverse.",
    blurb:
      "Three commands, one panel. Do the wrong one and the panel moves on without you.",
    explanation:
      "The first player must always start by saying \"Move.\" That sends the turn to the next player. From then on, each player has three choices: Move, Bounce, or Reverse. \"Move\" sends the turn to the next player. \"Bounce\" skips the next player and sends the turn to the player after them. \"Reverse\" sends the turn back in the opposite direction, and play continues that way until another Reverse changes the direction again. You must respond quickly. Hesitating, being too slow, giving the wrong command, or failing to follow the direction of play puts you out. The game continues until one player remains.",
  },

  {
    id: "lov",
    no: 6,
    day: 1,
    name: "Love Island",
    blurb:
      "Ten seats, two sides, one long night of coupling up. Gender decides your side of the villa.",
    explanation:
      "Every round, each player chooses the person they are most attracted to from the eligible players on the opposite side. If that person accepts you, you are safe for the round. If they decline you, you are out. If two or more players choose the same person, that person must decide between them. In every new round, you must choose a different person of the opposite gender. You cannot choose the same person again until you have chosen every eligible person of the opposite gender at least once. The game continues until the final players remain. If the game reaches 2 boys and 2 girls, they play 21 to eliminate one person, after which the remaining player chooses their partner. The final boy-and-girl pairing wins.",
  },

  {
    id: "maf",
    no: 5,
    day: 1,
    name: "Mafia Game",
    blurb:
      "The family turns on itself. Find the mafia before the mafia finishes the family.",
    explanation:
      "Ten players enter the game, with roles secretly assigned by the Game Master. Two players are Mafia, one player is the Doctor, and the remaining players are members of the family trying to uncover the killers. During the night phase, the Mafia secretly chooses someone to eliminate while the Doctor has a chance to protect a player. During the day, everyone discusses, investigates, and votes on who they believe is Mafia. If both Mafia players are discovered and eliminated, the remaining players win. If the Mafia successfully eliminates the other players without being caught, the Mafia wins. The Game Master controls the roles and night actions.",
  },

  {
    id: "lem",
    no: 7,
    day: 2,
    name: "Lemon Game",
    groups: 2,
    seatsPerGroup: 10,
    reserves: 2,
    blurb:
      "A word-and-nerve game where one slip hands the lemon straight to you.",
    explanation:
      "Players take turns answering quick prompts or completing the challenge set by the Game Master while the lemon moves around the panel. The pressure increases as the game continues. You must answer correctly and keep the game moving without hesitation. A wrong answer, repeated answer, failed challenge, or delay can put the lemon on you and send you out. The Game Master keeps the pace and decides when a player has failed. The rounds continue until one player remains.",
  },

  {
    id: "spe",
    no: 8,
    day: 2,
    name: "Spelling Bee",
    blurb:
      "Straight spelling under the clock. One miss and your mic goes quiet.",
    explanation:
      "Players are given words to spell by the Game Master. The words begin at an easier level and gradually become more difficult, moving from easy to medium and then advanced. Each player must spell their word correctly when called. A wrong spelling eliminates the player from the game. The difficulty continues to increase until only one player remains. The final player standing wins the Spelling Bee.",
  },

  {
    id: "sca",
    no: 9,
    day: 2,
    name: "Scavenger Hunt",
    blurb:
      "Items called live. Be the first back on camera holding the right one.",
    explanation:
      "Players remain seated at their panels while the Game Master calls out an item that they must find in their surroundings. It could be something simple such as a brush, pot, sponge, or another everyday object. Once the item is called, players race to find it and return to the camera with the correct item. The last player to return with the required item is disqualified. Each round gets the field smaller until only one player remains.",
  },

  {
    id: "qui",
    no: 10,
    day: 2,
    name: "Quiz",
    blurb:
      "General knowledge plus a WestSyde round only real family will survive.",
    explanation:
      "Players compete by answering trivia questions from a mixture of general knowledge and questions about WestSyde and the family. Questions can cover different subjects and may become more challenging as the game progresses. Players who answer incorrectly or fail to answer within the allowed time can be eliminated. The remaining players continue through the rounds until the winner is decided. Winners receive prizes.",
  },

  {
    id: "bom",
    no: 11,
    day: 2,
    name: "Pass The Bomb",
    groups: 2,
    seatsPerGroup: 10,
    reserves: 2,
    blurb:
      "Answer, pass, survive. Whoever is holding it when the timer goes is out.",
    explanation:
      "The bomb moves from player to player, but it can only be safely passed twice. The first player must always pass the bomb and cannot bomb someone directly. For example, they might say, \"I pass the bomb to Banky.\" Banky can then either pass it to another player or bomb someone directly. If Banky says, \"I bomb Emperor,\" Emperor is eliminated and the player after Emperor starts the game again. If Banky instead passes the bomb to Emperor, that counts as the second pass. Whoever Emperor passes the bomb to receives the third bomb and is automatically eliminated. Choose carefully between passing the bomb to a friend or bombing an enemy. The game continues until one player remains.",
  },

  {
    id: "mil",
    no: 12,
    day: 2,
    name: "Million Dollar Secret",
    blurb:
      "One secret, one liar, one pot. Trust the wrong face and you lose it all.",
    explanation:
      "One of the ten players is secretly given the million-dollar grand prize by the Game Master. Only the chosen player and the Game Master know who has the money. The secret player's mission is to blend in with everyone else while secretly completing tasks given to them each round. The other players must observe the panel, work out who is carrying the money, and vote to expose them. If the secret player is caught, the money moves to another player and the game continues. Successfully completing a secret task gives the holder an advantage in the next vote, while failing a task results in a penalty. The game continues through eliminations until the final player standing wins the million-dollar prize.",
  },
];