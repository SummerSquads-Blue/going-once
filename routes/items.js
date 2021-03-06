const express = require('express');
const router = express.Router();
const itemCtrl = require('../controllers/items');

/*---------- Public Routes ----------*/
router.get("/", itemCtrl.index)
router.get("/city/:city", itemCtrl.findItemsByCity)
router.get("/:id", itemCtrl.findItemById)

// router.post("/", itemCtrl.postItem)
/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.get("/favorite/:id", checkAuth, itemCtrl.getFavorites)
router.post("/", checkAuth, itemCtrl.postItem)
router.put("/favorite/:id", checkAuth, itemCtrl.addOrRemoveFavorite)
router.delete('/:id', checkAuth, itemCtrl.deleteItem)
router.post("/:id", checkAuth, itemCtrl.postComment)

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;