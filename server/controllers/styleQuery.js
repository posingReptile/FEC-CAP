/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const Style = require('../../db/models/styleSchema');

exports.getStyle = (req, res) => {
  const { product_id } = req.params;
  Style.findOne({ product_id: product_id - 37310 })
    .then((data) => {
      res.json(data);
    }).catch((err) => {
      console.log(err);
    });
};
