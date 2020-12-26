const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db_mysql.js');

// validate post input error
function validate(report) {
  const errors = [];
  // change later
  if (report.content.length === 0) {
    errors.push('Report cannot be empty');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function get(_, { id }) {
  const db = getDb();
  const report = await db.Report.findByPk(id);
  return report;
}
async function list(_, { userId, postId }) {
  const db = getDb();
  let reports;
  // fix this
  if (userId && postId) reports = await db.Report.findAll({ where: { userId, postId } });
  else if (userId) reports = await db.Report.findAll({ where: { userId } });
  else if (postId) reports = await db.Report.findAll({ where: { postId } });
  else reports = await db.Report.findAll();
  // reverse to show newer first
  return reports;
}
async function create(_, { report }) {
  const db = getDb();
  validate(report);
  console.log(report);
  const newReport = Object.assign({}, report);
  const result = await db.Report.create(newReport);
  const savedReport = await db.Report.findByPk(result.id);
  return savedReport;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes) {
    const Report = await db.Report.findByPk(id);
    Object.assign(Report, changes);
    validate(Report);
    // console.log("Report has been validated: ", Report );
  }
  await db.Report.update(changes, { where: { id } });
  return db.Report.findByPk(id);
}

// return boolean
async function remove(_, { id }) {
  const db = getDb();
  const Report = await db.Report.findByPk(id);
  if (!Report) return false;
  const result = await db.Report.destroy({ where: { id } });
  // ???
  return result === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, update, delete: remove, list,
};
