const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate({
        path: "thoughts",
        select: "-__v",
      });
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate({
        path: "thoughts",
        select: "-__v",
      });

      if (!user) {
        return res.status(404).json({ message: "No users found with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const oldUser = await User.findOne({ _id: req.params.userId });
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      await Thought.updateMany(
        { username: oldUser.username },
        { username: req.body.username },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      await Thought.deleteMany({ username: user.username });
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addNewFriend(req, res) {
    try {
      const friend = await User.findOne({ _id: req.params.friendId });
      if (!friend) {
        res.status(404).json({ message: "No friend found with this id!" });
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friend } },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: "No user found with this userId!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const friend = await User.findOne({ _id: req.params.friendId });
      if (!friend) {
        res.status(404).json({ message: "No friend found with this id!" });
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: "No user found with this userId!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
