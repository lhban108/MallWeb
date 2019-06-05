var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall')

// 检查数据库是否连接成功
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected success.")
});

// 数据库连接出错
mongoose.connection.on("error", () => {
  console.log('MongoDB connected error.')
})

// 断开连接
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connected disconnected.")
});

router.get("/", (req, res, next) => {
  Goods.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: 'err',
        msg: err.message
      })
    } else {
      res.json({
        status: 'success',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router;
