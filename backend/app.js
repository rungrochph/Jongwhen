var express = require("express");
var app = express();

var cors = require("cors");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();


const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
const secret = "Jongwhen_log"

app.use(cors());

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jongwhen_schema",
});

//สมัครใช้งาน hash ก่อนเก็บรหัส
app.post("/register", jsonParser, function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const position = req.body.position;
  const salary = req.body.salary;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    connection.query(
      'INSERT INTO jw_users( email, password, fname, lname, position, salary) VALUES (?,?,?,?,?,?)',
      [email, hash, fname, lname, position, salary],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } 
          res.json({ status: "ok" });
      }
    );
});
 
});


// ล็อกอิน จากนั้นเก็บ Token ลงเครื่อง กำหนดเวลาหมดอายุ token
app.post("/login", jsonParser, function (req, res, next) {
  connection.query(
    'SELECT * FROM jw_users WHERE email =?',
    [req.body.email],
    function (err, users, fields) {
      if (err) {res.json({ status: "error", message: err }); return;} 
      if(users.length == 0){res.json({ status: "error", message: "user not found" }); return;} 
      bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
        if(isLogin){
          var token = jwt.sign({email : users[0]. email}, secret, {expiresIn: '1h'});
          res.json({ status: "ok", message: "login sucess" ,token});
        }else{
          res.json({ status: "error", message: "Login failed" }); 
        }
    });
  });
});


// 
app.post("/authen", jsonParser, function (req, res, next) {
  try{
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token,secret)
    res.json({ status: "ok", decoded});
  }catch(err){
    res.json({ status: "error", message:err.message });
  }
});

//ส่งข้อมูลไปเก็บที่ calender table 
app.post("/calender/create", jsonParser, function (req, res, next){
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  // const color = req.body.color;
  const allDay = req.body.allDay;
  const event_type_id = req.body.event_type_id;
  const editable = req.body.editable;
  const userNameId = req.body.userNameId;
  const price = req.body.price;

  connection.query(
    'INSERT INTO jw_calender(title, start, end, allDay, event_type_id, editable, userNameId, price) VALUES (?,?,?,?,?,?,?,?)',
      [title,start, end, allDay, event_type_id, editable, userNameId, price],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } 
          res.json({ status: "ok" });
      }
    ); 
});

// ส่งข้อมูลเมื่อ Drag drop
app.post("/calender/create/drag", jsonParser, function (req, res, next){
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const allDay = req.body.allDay;
  const event_type_id = req.body.event_type_id;
  const editable = req.body.editable;


  connection.query(
    'INSERT INTO jw_calender(title, start, end, allDay, event_type_id, editable) VALUES (?,?,?,?,?,?)',
      [title, start, end, allDay, event_type_id, editable],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } 
          res.json({ status: "ok" });
      }
    ); 
});

//ดึงข้อมูล จาก calender
app.get("/calender/getEvent", jsonParser, function (req, res, next){
  connection.query(
    `SELECT 
    jc.id as id 
    ,jc.title as title 
    ,jc.event_type_id as event_type_id 
    ,jc.start as start 
    ,jc.end as end 
    ,jc.editable as editable 
    ,jc.allDay as allDay 
    ,jc.userNameId as userNameId 
    ,jc.price as price 
    ,je.color as color 
    ,je.name as typeEventName 
    ,concat(ju.fname ," ",ju.lname) as fullname 
    FROM jw_calender as jc 
    LEFT JOIN jw_event_type as je ON jc.event_type_id = je.id 
    LEFT JOIN jw_users as ju ON jc.userNameId = ju.id 
    WHERE event_type_id != ' '`,
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          
          return;
        } 
        res.json({ status: "ok", results: results });
      }
    ); 
});

// update Event โดยแก้ตามไอดีนั้น ๆ 
app.put("/calender/update/id", jsonParser, function (req, res, next){
  const userNameId = req.body.userNameId;
  const id = req.body.id;
  const title = req.body.title;
  const color = req.body.color;
  const event_type_id = req.body.event_type_id;
  const price = req.body.price;
  connection.query(
    'UPDATE jw_calender SET userNameId =?, title =?, color =?, event_type_id =?, price =? WHERE id =?',
      [userNameId, title, color, event_type_id, price, id],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } 
          res.json({ status: "ok" });
      }
    ); 
});

// อับเดตเมื่อลากอีเวนท์
app.put("/calender/update", jsonParser, function (req, res, next){
  const start = req.body.start;
  const end = req.body.end;
  const id = req.body.id;


  connection.query(
    'UPDATE jw_calender SET start = ?, end = ? WHERE id = ?',
      [start, end, id],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } 
          res.json({ status: "ok" });
      }
    ); 
});

//ดึงข้อมูล โดยใช้ ID
app.post("/calender/getEvent/id", jsonParser, function (req, res, next){
  const id = req.body.id
  connection.query(
    'SELECT * FROM jw_calender WHERE id=?',
    [id],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          
          return;
        } 
        res.json({ status: "ok", results: results });
      }
    ); 
});

//ลบข้อมูลโดยอ้างอิงจาก ID
app.post("/calender/deleteEvent/id", jsonParser, function (req, res, next){
  const id = req.body.id
  connection.query(
    'DELETE FROM jw_calender WHERE id =? ',
    [id],
      function (err) {
        if (err) {
          res.json({ status: "error", message: err });
          
          return;
        } 
        res.json({ status: "ok" });
      }
    ); 
});

// ดึงข้อมูลตารางประเภทของอีเว็นท์
app.get("/calender/gettype/Event", jsonParser, function (req, res, next){
  connection.query(
    'SELECT * FROM jw_event_type',
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          
          return;
        } 
        res.json({ status: "ok", results: results });
      }
    ); 
});

// ดึงข้อมูลตารางผู้ใช้งาน
app.get("/calender/getuser", jsonParser, function (req, res, next){
  connection.query(
    'SELECT id, CONCAT(fname," ",lname) as fullname, position FROM jw_users',
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          
          return;
        } 
        res.json({ status: "ok", results: results });
      }
    ); 
});

//ดึง Sum Price
app.post("/calender/getSumPrice", jsonParser, function (req, res, next){
  const userNameId = req.body.userNameId;
  const event_type_id = req.body.event_type_id;
  const startDate = req.body.startDate
  const endDate =  req.body.endDate
  
  connection.query(
    `
    SELECT jc.id as id
    ,jc.title as title 
    ,jc.event_type_id as event_type_id
    ,jc.start as start
    ,jc.end as end
    ,jc.editable as editable
    ,jc.allDay as allDay
    ,jc.userNameId as userNameId
    ,jc.price as price
    ,je.color as color
    ,je.name as typeEventName
    ,SUM(jc.price) as totalprice
    ,concat(ju.fname ," ",ju.lname) as fullname
    FROM jw_calender as jc 
    LEFT JOIN jw_event_type as je ON jc.event_type_id = je.id
    LEFT JOIN jw_users as ju ON jc.userNameId = ju.id
    WHERE event_type_id != ' ' 
    AND userNameId =? 
    AND event_type_id =?
    AND jc.start BETWEEN ? AND ?
     `,[userNameId,event_type_id,startDate,endDate],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } 
        res.json({ status: "ok", results: results });
      }
    ); 
});

// ดึงข้อมูลผู้ใช้งานผ่านการกรองจาก searchbar
app.post("/calender/getUserList", jsonParser, function (req, res, next){
  const userNameId = req.body.userNameId;  
  const event_type_id = req.body.event_type_id;
  const startDate = req.body.startDate
  const endDate =  req.body.endDate
  
  connection.query(
    `
    SELECT jc.id as id
    ,jc.title as title 
    ,jc.event_type_id as event_type_id
    ,jc.start as start
    ,jc.end as end
    ,jc.editable as editable
    ,jc.allDay as allDay
    ,jc.userNameId as userNameId
    ,jc.price as price
    ,je.color as color
    ,je.name as typeEventName
    ,concat(ju.fname ," ",ju.lname) as fullname
    FROM jw_calender as jc 
    LEFT JOIN jw_event_type as je ON jc.event_type_id = je.id
    LEFT JOIN jw_users as ju ON jc.userNameId = ju.id
    WHERE event_type_id != ' ' 
    AND userNameId =? 
    AND event_type_id =?
    AND jc.start BETWEEN ? AND ?
     `,[userNameId,event_type_id,startDate,endDate],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } 
        res.json({ status: "ok", results: results });
        
      }
    ); 
});

app.listen(3030, jsonParser, function () {
  console.log(" web server listening on port 3030");
});
