const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {User} =require('./models/User')
const bodyParser =require('body-parser')
const config = require('./config/key')
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI)
.then(()=>console.log('MongoDB Connect...'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('잘돼요!')
})

app.post('/register',async(req,res)=>{
  //회원가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.  
  const user = new User(req.body)//객체생성

  await user.save().then(()=>{
    res.status(200).json({
      success:true,
    })
  })
  .catch((err)=>{
    console.error(err);
    res.json({
      success:false,
      err:err,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})