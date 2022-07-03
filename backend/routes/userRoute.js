const express = require("express")
const { registerUser, loginUser, logOut, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require("../controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logOut)
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/profile/update").put(isAuthenticatedUser, updateProfile)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

// Admin Routes
router.route("/admin/users").get(getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles, getSingleUser).put(isAuthenticatedUser, authorizeRoles("admin"), updateRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)



module.exports = router