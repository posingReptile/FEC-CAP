/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const Products = require('../../db/models/productSchema');
const Features = require('../../db/models/featureSchema');
const RelatedProduct = require('../../db/models/relatedSchema');

// console.time('getProducts');
// console.timeEnd('getProducts');
exports.getProducts = (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const amount = count * page;
  Products.find({ id: { $lte: amount } })
    .then((data) => {
      res.json(data);
    }).catch((err) => {
      console.log(err);
    });
};

exports.getOneProduct = (req, res) => {
  const pid = req.originalUrl;
  const number = pid.match(/\d+/g) - 37310;
  // console.log(`GET request received from ${number}`);
  let result;
  // console.time('getOneProduct');
  Products.findOne({ id: number })
    .then((data) => {
      const copy = { ...data._doc };
      return copy;
    }).then((next) => {
      Features.findOne({ id: number })
        .then((featureData) => {
          next.features = featureData.features;
          // console.log(next);
          res.json(next);
          // console.timeEnd('getOneProduct');
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRelatedProduct = (req, res) => {
  RelatedProduct.find().limit(5)
    .then((data) => {
      res.json(data);
    }).catch((err) => {
      console.log(err);
    });
};
