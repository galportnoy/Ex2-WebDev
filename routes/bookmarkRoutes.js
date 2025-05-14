const express = require("express");

const router = express.Router();

const bookmarkController = require("../controllers/bookmarkController");

router.get("/getAllBookmarks", bookmarkController.getAllBookmarks);

router.post("/addBookmark", bookmarkController.addBookmark);

module.exports = router;