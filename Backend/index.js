
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const fastcsv=require('fast-csv');
const fs=require('fs');
const ws=fs.createWriteStream("download.csv")

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'Bharath@KIT',
  database: 'school'
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  con.query("INSERT INTO user (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result) => {
    if (err) {
      res.send({ message: "you are excisting user" });
    } else {
      res.send(result);
    }
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  con.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password], (err, result) => {
    if (err) {
      res.send({ message: "Error querying data" });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username or password" });
      }
    }
  });
});

app.put('/Forgot',(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;

  con.query('UPDATE user SET password = ? WHERE email = ?',[password,email],(err,result)=>{
    if(err)
      {
        res.send({message:'Error changing the data'});
      }
      else{
        res.send({message: 'Password updated sucsesfully'});
      }
  })
})

app.put('/Profile', (req, res) => {
  const { oldemail, newemail, oldusername, newusername, oldpassword, newpassword } = req.body;

  let query;
  let params;

  if (oldemail && newemail) {
    query = 'UPDATE user SET email = ? WHERE email = ?';
    params = [newemail, oldemail];
  } else if (oldusername && newusername) {
    query = 'UPDATE user SET username = ? WHERE username = ?';
    params = [newusername, oldusername];
  } else if (oldpassword && newpassword) {
    query = 'UPDATE user SET password = ? WHERE password = ?';
    params = [newpassword, oldpassword];
  } else {
    return res.status(400).send({ success: false, message: 'Invalid request' });
  }

  con.query(query, params, (err, result) => {
    if (err) {
      
       res.send({ success:false, message: 'Error changing the data' });
    } 
    else{
      res.send({ success:true, message: 'Data updated successfully' });
    }
  });
});

app.get('/Layout', (req, res) => {
  const query = 'SELECT * FROM balancesheet';
  con.query(query, (err, data) => {
    if (err) throw err;

    const jsonData = JSON.parse(JSON.stringify(data));
    const csvStream = fastcsv.format({ headers: true });
    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    res.setHeader('Content-Type', 'text/csv');

    csvStream.pipe(res);
    jsonData.forEach(row => csvStream.write(row));
    csvStream.end();
  });
});

// app.get('/Paichart1', (req, res) => {
//   const query = 'SELECT Debit_Label,Debit_Amount FROM balancesheet ';
//   db.query(query, (error, results) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.json(results);
//     }
//   });
// });

app.get('/api/debits', (req, res) => {
  const query = 'SELECT Debit_Label, Debit_Amount FROM balancesheet';
  con.query(query, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.json(results);
    }
  });
});

app.get('/Credits', (req, res) => {
  const q = 'SELECT Credit_Date,Credit_Label,Credit_Amount FROM balancesheet';
  
  con.query(q, (err, result) => {
      if (err) {
          res.status(500).send("Error fetching the data");
      } else {
          res.send(result);
      }
  });
});


app.get('/Debits',(req,res)=>{

  con.query('SELECT Debit_Date,Debit_Label,Debit_Amount FROM balancesheet',(err,result)=>{
    if(err)
      {
        res.send("Error Fetching Data");
      }
      else{
        res.send(result)
      }
  })

});

app.get('/TotalDebit',(req,res)=>{

  con.query('SELECT SUM(Debit_Amount) as TotalDebits from balancesheet',(err,result)=>{
    if(err)
      {
        res.send("Error")
      }
      else
      {
        res.send(result)
      }
  })
});

app.get('/TotalCredits',(req,res)=>{
  con.query('SELECT SUM(Credit_Amount) AS TotalCredits from balancesheet',(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
});

app.post('/CreditAdd',(req,res)=>{
  const cdate=req.body.cdate;
  const clabel=req.body.clabel;
  const camount=req.body.camount;

  const q = 'INSERT INTO balancesheet (Credit_Date, Credit_Label, Credit_Amount) VALUES (?, ?, ?)';
  con.query(q, [cdate, clabel, camount], (err, result) => {
    if (err) {
      
      res.send({ message: 'Error while inserting' });
    } 
    else
    res.send(result);
  })
});

app.post('/DebitAdd',(req,res)=>{
  const ddate=req.body.ddate;
  const dlabel =req.body.dlabel;
  const damount=req.body.damount;

  const q = 'INSERT INTO balancesheet (Debit_Date, Debit_Label, Debit_Amount) VALUES (?, ?, ?)';
  con.query(q, [ddate, dlabel, damount], (err, result) => {
    if (err) {
      res.send({ message: 'Error inserting the data' });
    } 
    else
    res.send(result);
    
  })
});

app.get('/daily-data', (req, res) => {
  const query = "SELECT COALESCE(Credit_Date, Debit_Date) AS date, SUM(Credit_Amount) AS total_credit, SUM(Debit_Amount) AS total_debit FROM balancesheet GROUP BY date ORDER BY date";

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send({ message: 'Error fetching data' });
    } else {
      res.status(200).send(results);
    }
  });
});

app.put('/Set', (req, res) => {
   const{ limit} =req.body;
  const q = 'UPDATE setlimit SET Limit_Amount = ?';

  con.query(q, [limit], (err, result) => {
    if (err) {
      res.send({ message: 'Error setting limit' });
    } 
    else
    {
      res.send({message:"Data updated Sucsessfully"})
    }
    
  });
});

app.get('/SetData',(req,res)=>{
  con.query('SELECT * FROM setlimit',(err,result)=>
  {
    if(err)throw err;
    res.send(result[0]);
  })
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
