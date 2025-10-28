import mongoose from "mongoose"

const connectDB = async() => {
    try {
         await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
            // console.log(res);
            console.log("database connected successfully in CLOUD!");
      
    } catch (error) {
        console.log(error);

    }
}

export default connectDB