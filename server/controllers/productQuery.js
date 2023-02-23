/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const Products = require('../../db/models/productSchema');
const Features = require('../../db/models/featureSchema');
const RelatedProduct = require('../../db/models/relatedSchema');

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
  Products.findOne({ id: number })
    .then((data) => {
      const copy = { ...data._doc };
      return copy;
    }).then((next) => {
      Features.findOne({ id: number })
        .then((featureData) => {
          next.features = featureData.features;
          res.json(next);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRelatedProduct = (req, res) => {
  const { product_id } = req.params;
  RelatedProduct.findOne({ id: product_id - 37310 })
    .then(({ relatedProductId }) => {
      res.json(relatedProductId);
    }).catch((err) => {
      console.log(err);
    });
};
