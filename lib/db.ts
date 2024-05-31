import mongoose , {Connection} from "mongoose";

let isConnected:Connection | boolean = false;

const connectDB = async () => {
    if(isConnected){
        console.log("Mongodb already connected");
        return isConnected;
    }
    try {
        const res = await mongoose.connect(process.env.MONGOOSEURI!);
        isConnected = res.connection;
        console.log("Mongodb Connected Successfully.");
        return isConnected;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default connectDB;