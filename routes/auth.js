const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "lambofGod#1(randomstring)";

//API authentication using JWT
const createJWT = async(payload)=>{
    var token = jwt.sign(payload,secret,{expiresIn:'1m'});
    return token;
}

const authVerify = async(token)=>{
    try {
        let payload = jwt.verify(token,secret);
        console.log(payload)
        return true;
    } catch (error) {
        return false;
    }
}


//hashing and comparing password with bcrypt

const hashing = async (value) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hash = await bcrypt.hash(value,salt);
        return hash
    } catch (error) {
        return error
    }
}

const hashCompare = async(value,hash)=>{
    try {
        return await bcrypt.compare(value,hash)
    } catch (error) {
        return error
    }
}

module.exports = {hashing,hashCompare,createJWT,authVerify}