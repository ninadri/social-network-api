const users = [
  { username: "uso", email: "bloodline@gmail.com" },
  { username: "nightmare", email: "cody@gmail.com" },
  { username: "machoman", email: "machoman@mail.com" },
];

const reactions = [
  { reactionBody: "acknowledge me", username: "uso" },
  { reactionBody: "oh yeah", username: "macho man" },
  { reactionBody: "finish the story", username: "nightmare" },
];

const thoughts = [
  {
    thoughtText: "I miss my brother!",
    username: "uso",
    reactions: [reactions[0]],
  },
  {
    thoughtText: "I'm the cream of the crop!",
    username: "machoman",
    reactions: [reactions[1]],
  },
  {
    thoughtText: "What do you want to talk about?",
    username: "nightmare",
    reactions: [reactions[2]],
  },
];

module.exports = { users, thoughts };
