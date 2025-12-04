import mongoose from "mongoose";


const  connecteDB = async () => {
    try{
      await mongoose.connect("mongodb+srv://alwayssahilmishra_db_user:cfFJljN9VQlHYQXA@cluster0.o9eicgn.mongodb.net/", {
    dbName: "Trishul_beats_store"
  }
);
  console.log("Database connected successfully");
    }catch(error){
     console.log('Database connection failed:', error);
    }
}

export default connecteDB;