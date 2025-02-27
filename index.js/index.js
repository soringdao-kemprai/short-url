const express=require('express');
const {connectToMongoDB}=require('./connect')
const urlRoute=require('./routes/url');
const URL=require('./models/url');
const shortid = require('shortid');

const staticRoute=require('./routes/staticRouter')
const path=require('path');
const app=express();
const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongodb connected'));

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));





app.use('/',staticRoute);
app.use('/url',urlRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId,
    },{$push:{
        visitHistory:{
            timeStamp:Date.now(),
        },
    }});
    res.redirect(entry.redirectURL);
});



app.listen(PORT,()=>console.log(`server started at port ${PORT}`));