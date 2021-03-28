const express = require('express');
const app = express();
// パス指定用モジュール
const path = require('path');

app.listen(process.env.PORT || 5000)

//mysqlパッケージを読み込み
const mysql = require('mysql');
const { resolveSoa, reverse } = require('dns');
//express session を読み込み
const session = require('express-session');
var MemoryStore = require('memorystore')(session)
// 3000番ポートで待ちうける
// app.listen(1996, () => {
//   console.log('Running at Port 3000...');
// });

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

//フォームの値を受け取るのに必要な定型文
app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: 'my_secret_key',
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  secret: 'keyboard cat',
  saveUninitialized: false,
}))

//node.jsからmysqlに接続設定
const db_config = {
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b74b742454b9ab',
    password: 'd16f1aff',
    database: 'heroku_4bd3ba2a65247f8'
};

var connection;

function handleDisconnect() {
  console.log('INFO.CONNECTION_DB: ');
  connection = mysql.createConnection(db_config);
  
  //connection取得
  connection.connect(function(err) {
      if (err) {
          console.log('ERROR.CONNECTION_DB: ', err);
          setTimeout(handleDisconnect, 1000);
      }
  });
  
  //error('PROTOCOL_CONNECTION_LOST')時に再接続
  connection.on('error', function(err) {
      console.log('ERROR.DB: ', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.log('ERROR.CONNECTION_LOST: ', err);
          handleDisconnect();
      } else {
          throw err;
      }
  });
}

handleDisconnect();



app.use((req, res, next) =>{
  if(req.session.userId === undefined){
    res.locals.username = 'ゲスト';
    res.locals.isLoggedIn = false;
  }else{
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
    res.locals.userId = req.session.userId;
  };

  next();
});


//rootURL
app.get('/', function(req,res){
    connection.query(
        'SELECT * FROM items',
        (error, results) => {
          console.log(results);
          console.log(error);
          res.render('login.ejs');
        }
    );
});

//ログイン認証
app.post('/login',(req,res)  => {
    const email = req.body.email;
    const username = req.body.username;

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (results.length > 0){

              if(req.body.password === results[0].password){
                req.session.userId = results[0].id;
                req.session.email = results[0].email;
                req.session.username = results[0].username;
                
                
                res.redirect('/index');
              }else{
                res.redirect('/login');
              }
            }else{
                res.redirect('/login');
            }
        }
    );
});

app.get('/login',(req, res) => {
    res.render('login.ejs');
});

app.get('/signup',(req, res) => {
    res.render('signup.ejs');
});

//新規登録
app.post('/signup',(req, res) => {
    const username= req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    connection.query(
      'INSERT INTO users (username, email, password)VALUES(?, ?, ?)',
      [username, email, password],
      (error, results) =>{

        connection.query(
          'SELECT *　FROM users WHERE email = ?',
          [email],
          (error, results) => {
              if (results.length > 0){
  
                if(req.body.password === results[0].password){
                  req.session.userId = results[0].id;
                  req.session.email = results[0].email;
                  req.session.username = results[0].username;
                  res.redirect('/index');
                }else{
                  res.redirect('/login');
                }
              }else{
                  res.redirect('/login');
              }
          }
      );
      }
    );
});



app.get('/new',(req,res)=>{
    res.render('new.ejs');
});


app.get('/index', (req, res) => {
      connection.query( 
        'SELECT * FROM items WHERE userid = ?',
        [res.locals.userId],
        (error, results, fields) => {
          const reversed = results.reverse();
          res.render('index.ejs', {items: reversed});
        }
      );
});

  //記事投稿
app.post('/create', (req, res) => {       
    // 現在時刻の取得     
    require('date-utils');
    const dt = new Date();
    const formatted = dt.toFormat("YYYY.MM.DD")
    
    connection.query(            
      'INSERT INTO items (title, article, userid, date) VALUES (?, ?, ?, ?)',            
      [req.body.itemname, req.body.itemName, res.locals.userId, formatted],            
      (error, results) => {  
      
      res.redirect('/index');     
      }
    );
});


//記事削除
app.post('/delete/:id', (req, res) => {
    connection.query(
      'DELETE FROM items WHERE id = ?',
      [req.params.id],
      (error,results)=>{
      res.redirect('/index');
      }
    );
  });

app.get('/edit/:id', (req, res) => {
    connection.query(
        'SELECT * FROM items WHERE id= ?',
        [req.params.id],
        (error,results)=>{
        res.render('edit.ejs', {item:results[0]});
        }
    );
  });


  //記事編集
app.post('/update/:id', (req, res) => {
    require('date-utils');
    const dt = new Date();
    const formatted = dt.toFormat("YYYY.MM.DD")

connection.query(
    'UPDATE items SET title = ?, article = ?, date = ?  WHERE id= ? ',
    [req.body.itemname, req.body.itemName, formatted, req.params.id,],
(error, results) => {   
    console.log(results);         
    console.log(error);         
    res.redirect('/index');
    }
    );
});

app.get('/logout', (req, res) =>{
  req.session.destroy((error) =>{
    res.redirect('/login');
  })
});



