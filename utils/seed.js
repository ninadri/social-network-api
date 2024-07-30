const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  for (let i in thoughts) {
    const dataThoughts = await Thought.create(thoughts[i]);
    await User.create({
      ...users[i],
      thoughts: [dataThoughts._id],
    });
  }

  const allUsers = await User.find();
  for (const user of allUsers) {
    const newFriend = [
      allUsers[Math.floor(Math.random() * allUsers.length)]._id,
    ];
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { friends: newFriend } },
      { new: true }
    );
  }
  console.info("Seeded");
  process.exit(0);
});
