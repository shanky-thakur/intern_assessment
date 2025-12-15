// import app router
const express = require("express");
const router = express.Router();

// import verify jwt middleware
const verifyJWT = require("../middleware/verify_jwt");

// import service functions
const {
  add_user,
  login_user,
  get_items,
  add_item,
  update_item,
  delete_item
} = require("../controllers/user");

// ------------------------------------------ User Routes ------------------------------------------------

// Register new user
router.post("/register", add_user);

// Login user and get access token
router.post("/login", login_user);

// ------------------------------------------ Item Routes ------------------------------------------------

// Get all items (protected)
router.get("/items", verifyJWT, get_items);

// Add a new item (protected)
router.post("/items", verifyJWT, add_item);

// Update item by ID (protected)
router.put("/items/:id", verifyJWT, update_item);

// Delete item by ID (protected)
router.delete("/items/:id", verifyJWT, delete_item);

module.exports = router;