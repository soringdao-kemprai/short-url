const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        require:true,
    },
    visitHistory:[{timeStamp:{type:Number}}],
},
{timeStamp:true}
);


const URL=mongoose.model("url",urlSchema);//WE USE THIS LINEL BECAUSE TO INTERECT WITH url COLLECTION IN MONGOOSE.
module.exports=URL;