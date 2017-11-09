const Sequelize = require('sequelize');

const mysql = require('../middlewares/sequelize');

const schema = {
  cnvd_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  pub_time: {
    type: Sequelize.STRING
  },
  harm_rank: {
    type: Sequelize.STRING
  },
  products_aff: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  ref_url: {
    type: Sequelize.STRING
  },
  solution: {
    type: Sequelize.TEXT
  },
  detector: {
    type: Sequelize.STRING
  },
  patch: {
    type: Sequelize.STRING
  }
};

const options = {
  timestamp: false
};

const Bug = mysql.define('bug', schema, options);

Bug.sync({force: true}).then();

module.exports = Bug;