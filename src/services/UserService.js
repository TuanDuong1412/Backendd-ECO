const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser)=>{
    const {name, email,password, confirmPassword, phone} = newUser

    return new Promise( async(resolve, reject)=>{
        try {
            const checkUser = await User.findOne({
                email:email
            })
            if(checkUser !== null){
                resolve({
                    status:'OK',
                    message:'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10);//mã hóa password
            const createUser = await User.create({
                name,
                email,
                password: hash, 
                phone
            })
            if(createUser){
                resolve({
                    status:'OK',
                    message :'SUCCESS',
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin)=>{
    const {name, email,password, confirmPassword, phone} = userLogin

    return new Promise( async(resolve, reject)=>{
        try {
            const checkUser = await User.findOne({
                email:email
            })
            if(checkUser === null){
                resolve({
                    status:'ERR',
                    message:'The user is not defined'
                })
            }
            const comparePassword =  bcrypt.compareSync(password, checkUser.password); // true
            // console.log('comparePassword',comparePassword);
            if(!comparePassword){
                resolve({
                    status:'ERR',
                    message:'The password or user is incorrect'
                })
            }
            
            
            const access_token = await generalAccessToken({
                id:checkUser.id,
                isAdmin : checkUser.isAdmin
            })

            const refresh_token = await generalRefreshToken({
                id:checkUser.id,
                isAdmin : checkUser.isAdmin
            })
            // console.log('access_token', access_token);
           
            resolve({
                    status:'OK',
                    message :'SUCCESS',
                   access_token,
                   refresh_token
                })
            // }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id,data)=>{
    
    return new Promise( async(resolve, reject)=>{
        try {
            const checkUser = await User.findOne({
                _id : id
            })
           console.log('checkUser',checkUser);
           if(checkUser === null){
             resolve({
                    status:'OK',
                    message :'The user is not defined',
                })
            }
            
            const updateUser = await User.findByIdAndUpdate(id,data, {new: true});
            console.log('updateUser',updateUser);
            resolve({
                status:'OK',
                message :'SUCCESS',
                data: updateUser
            })

            
            // }
           
         
        
           
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (id)=>{
    
    return new Promise( async(resolve, reject)=>{
        try {
            const checkUser = await User.findOne({
                _id : id
            })
           if(checkUser === null){
             resolve({
                    status:'OK',
                    message :'The user is not defined',
                })
            }
            await User.findByIdAndDelete(id);
            resolve({
                status:'OK',
                message :'Delete user success',
                
            })
           
        } catch (e) {
            reject(e)
        }
    })
}
const deleteManyUser = (ids)=>{
    console.log('iddUser',ids);
    
    return new Promise( async(resolve, reject)=>{
        try {
      
            
            await User.deleteMany({_id: ids});
            resolve({
                status:'OK',
                message :'Delete User success',
                
            })
           
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = (id)=>{
    
    return new Promise( async(resolve, reject)=>{
        try {
          
            const allUser = await User.find();
            resolve({
                status:'OK',
                message :'Success',
                data: allUser
            })
           
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsUser = (id)=>{
    
    return new Promise( async(resolve, reject)=>{
        try {
            const user = await User.findOne({
                _id : id
            })
          
           if(user === null){
             resolve({
                    status:'OK',
                    message :'The user is not defined',
                })
            }
           
            resolve({
                status:'OK',
                message :'SUCCESS',
                data: user
                
            })
           
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
   
}