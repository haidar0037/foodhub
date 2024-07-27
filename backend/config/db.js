import mongoose from 'mongoose'

 export const connectDB =  async ()=>{
    await mongoose.connect("mongodb+srv://nasimhaidarbr:nasimhaidarbr@cluster0.qzytyix.mongodb.net/food-del").then(()=>{
        console.log("db connected");
   })
}