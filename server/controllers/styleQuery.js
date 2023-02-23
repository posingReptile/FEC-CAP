/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const Style = require('../../db/models/styleSchema');

exports.getStyle = (req, res) => {
  console.log('started getStyle');
  const { product_id } = req.params;
  console.time('getStyle');
  Style.findOne({ product_id: product_id - 37310 })
    .then((data) => {
      console.timeEnd('getStyle');
      res.send(data);
    }).catch((err) => {
      console.log(err);
    });
};
