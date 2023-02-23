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
  Style.find({ product_id: 1 })
    .then((data) => {
      // console.log('from get', data);
      // data[0];
      res.send(data[0]);
    }).catch((err) => {
      console.log(err);
    });
  console.timeEnd('getStyle');
};
