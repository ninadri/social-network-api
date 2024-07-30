const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(deleteFriend);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
