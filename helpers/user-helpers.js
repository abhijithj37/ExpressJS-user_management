var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt');

 

module.exports={
    doSignup:(userData)=>{
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).find({email:userData.email}).toArray()
            .then(async(result)=>{
                console.log("resul..",userData)
                let response={}
                if (result.length!=0){
                    resolve({status:false})

                }else{
                    userData.password=await bcrypt.hash(userData.password,10)
                    db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                        console.log("user data is "+data);
                        response.user=userData
                        response.status=true
                       // response.data=data.insertedId
                        resolve(response)
                    })
                }
            })
        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve, reject) => {
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((loggedIn)=>{
                    if(loggedIn){
                        response.user=user;
                        response.status=true;
                        resolve(response);

                    }else{
                        resolve({status:false});
                    }
                })
            }else{
                resolve({status:false});

            }
        })
    }
}
    