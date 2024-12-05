import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "restaurant"
    })
    .then(() => {
        console.log("connected to db successfully!");
    })
    .catch((err) => {
        console.log(`some error occured while connecting to db! ${err}`)
    });
};