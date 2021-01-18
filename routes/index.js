'use strict'
var express = require('express');
var router = express.Router();
var Telnet = require('telnet-client');
//var net = require('net');

var config = {
  host: '192.168.2.227',
  port: 1986,
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/', async (req, res) => {
  let result =  await run(req.body.command);
  res.render('index', { result:result });
})


async function run(command) {
  let connection = new Telnet()

  // these parameters are just examples and most probably won't work for your use-case.
  let params = {
    host: '192.168.1.196',
    port: 1986,
    negotiationMandatory: false,
    //shellPrompt: '/ # ', // or negotiationMandatory: false
  }

  try {
    await connection.connect(params)
    let res = await connection.send(command)
    //console.log('async result:', res)
    return res;
  } catch(error) {
    //console.log("error: ",error);
    return  error;
  }
}
module.exports = router;
