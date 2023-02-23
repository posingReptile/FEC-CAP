/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const Products = require('../../db/models/productSchema');
const Features = require('../../db/models/featureSchema');
const RelatedProduct = require('../../db/models/relatedSchema');

exports.getProducts = (req, res) => {
  console.time('getProducts');
  Products.find().limit(5)
    .then((data) => {
      console.log('from get', data);
      res.json(data);
    }).catch((err) => {
      console.log(err);
    });
  console.timeEnd('getProducts');
};

exports.getOneProduct = (req, res) => {
  const pid = req.originalUrl;
  const number = pid.match(/\d+/g) - 37310;
  console.log(pid);
  console.log(`GET request received from ${number}`);
  let result;
  console.time('getOneProduct');
  Products.findOne({ id: number })
    .then((data) => {
      const copy = { ...data._doc };
      delete copy._id;
      delete copy.__v;
      return copy;
    }).then((next) => {
      Features.findOne({ id: number })
        .then((featureData) => {
          next.features = featureData.features;
          console.log(next);
          res.json(next);
          console.timeEnd('getOneProduct');
        });
    }).catch((err) => {
      console.log(err);
    });
};

exports.getRelatedProduct = (req, res) => {
  console.log('started getall');
  RelatedProduct.find().limit(5)
    .then((data) => {
      console.log('from get', data);
      res.json(data);
    }).catch((err) => {
      console.log(err);
    });
};
