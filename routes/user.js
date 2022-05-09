const { Route } = require('express')
const express=require('express')
const router=express.Router()
const db=require('../config/config')

var mysql = require('mysql');

var dbcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "piyush1996",
    database:"mydb"
  });
  
  dbcon.connect(function(err) {
    if (err) throw err;
    console.log("Connected!.............");
    
  });

//add the todlist

router.post('/create',(req,res,next)=>{
    var title=req.body.title;
    var sql = `INSERT INTO todlist (title) VALUES ("${title}")`;
    dbcon.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result)
        console.log("1 todolist inserted");
      });
  
})

//get all todolist

router.get('/info',(req,res,next)=>{
   
    dbcon.query("SELECT title FROM todolist", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
        console.log(fields);
      });
})

//update the todolist

router.put('/update', function(req, res, next) {
    var title=req.body.title;
    var sql = `UPDATE todolist SET title="${title}"  WHERE title="prashant"`;
    dbcon.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
     res.send(result)
     console.log('update the todolist')
    })
  });

router.delete('/delete',function(req,res,next){
  var title=req.body.title;
    var sql = `DELETE FROM todlist WHERE email ="${title}"`;
    dbcon.query(sql, function (err, result) {
      if (err) throw err;
    res.send(result)

    console.log("todolist is deleted")
    });
})

module.exports=router;