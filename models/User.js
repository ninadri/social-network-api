const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  thoughts: [
    {
      type: Schema.Typpes.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
