const User=require('../models/user');

async function handleusersingup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.json("home");
}

module.exports={
    handleusersingup,
}