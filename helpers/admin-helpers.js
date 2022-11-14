var db = require("../config/connection");
var collection = require("../config/collections");
var bcrypt = require("bcrypt");
const { response } = require("../app");
var ObjectId = require("mongodb").ObjectId;

module.exports = {
    doLogin: (adminData) => {
        return new Promise((resolve, reject) => {
            let data = collection.ADMIN_COLLECTION;

            if (data.name == adminData.name) {
                bcrypt.compare(adminData.password, data.password).then((loggedIn) => {
                    console.log(loggedIn);
                    let response = {};
                    if (loggedIn) {
                        console.log("success");
                        response.admin = data;
                        response.status = true;
                        resolve(response);
                    } else {
                        console.log("failed");
                        resolve({ status: false });
                    }
                });
            } else {
                console.log("login failed");
                resolve({ status: false });
            }
        });
    },
    getAllUser: () => {
        return new Promise(async (resolve, reject) => {
            let user = await db
                .get()
                .collection(collection.USER_COLLECTION)
                .find()
                .toArray();
            resolve(user);
            console.log("user is"+user)
        });
    },
    addUsers: (user) => {
        return new Promise((resolve, reject) => {
            let response = {};
            db.get()
                .collection(collection.USER_COLLECTION)
                .find({ email: user.email })
                .toArray()
                .then(async (result) => {
                    //console.log('adduser='+result);
                    if (result.length!== 0) {
                        resolve({ status: false });
                    } else {
                        user.password = await bcrypt.hash(user.password, 10);
                        db.get()
                            .collection(collection.USER_COLLECTION)
                            .insertOne(user)
                            .then((data) => {
                               //console.log("data ss"+data);
                                response.status = true;
                                resolve(response);
                            });
                    }
                });
        });
    },
    deleteUsers: (userId) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.USER_COLLECTION)
                .deleteOne({ _id: ObjectId(userId) })
                .then((response) => {
                    resolve(response);
                });
        });
    },
    getUserdetails: (userId) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.USER_COLLECTION)
                .findOne({ _id: ObjectId(userId) })
                .then((user) => {
                    resolve(user);
                });
        });
    },
    updateUser: (userId, userDetails) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.USER_COLLECTION)
                .updateOne(
                    { _id: ObjectId(userId) },
                    {
                        $set: {
                            name: userDetails.name,
                            email: userDetails.email,
                        },
                    }
                )
                .then((response) => {
                    resolve(response);
                });
        });
    },
};
