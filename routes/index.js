var express = require('express');
var router = express.Router();
const dataPath = './data/index.json';
const fs = require('fs');
const cors = require('cors');

router.get('/', cors(),function (req, res, next) {
  const accounts = getAccountData()
  res.send(accounts);
});

router.post('/', (req, res) => {

  var existAccounts = getAccountData();
  const newAccountId = Math.floor(100000 + Math.random() * 900000)
  existAccounts[newAccountId] = req.body

  saveAccountData(existAccounts);
  res.send({
    success: true,
    msg: 'account added successfully'
  })
});

router.delete('/', (req, res) => {

  var existAccounts = getAccountData();
  delete existAccounts[req.body.id]

  saveAccountData(existAccounts);
  res.send({
    success: true,
    msg: 'dataset deleted successfully'
  })
});

router.put('/', (req, res) => {

  var existAccounts = getAccountData();
  let id = Object.keys(req.body)[0];
  existAccounts[id] = req.body[id];
  saveAccountData(existAccounts);
  res.send({
    success: true,
    msg: 'dataset updated successfully'
  })
});

const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}

module.exports = router;