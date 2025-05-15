const express = require("express");

const router = express.Router();

const bookmarkController = require("../controllers/bookmarkController");

router.get("/getAllBookmarks", bookmarkController.getAllBookmarks);

router.post("/addBookmark", bookmarkController.addBookmark);

router.delete("/deleteBookmark/:id", bookmarkController.deleteBookmark);

router.get("/getBookmark/:id", bookmarkController.getBookmark);

router.put("/updateBookmark/:id", bookmarkController.updateBookmark);


module.exports = router;