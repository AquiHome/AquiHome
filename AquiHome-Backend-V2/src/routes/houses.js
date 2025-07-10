const express = require('express');
const {
  createHouse,
  getAllHouses,
  getHouseById,
} = require('../controllers/houseController');
const { protect, restrictTo } = require('../middleware/auth');
const router = express.Router();

router.get('/',       getAllHouses);
router.get('/:id',    getHouseById);
router.post(
  '/',
  protect,
  restrictTo('provider'),
  createHouse
);

module.exports = router;
