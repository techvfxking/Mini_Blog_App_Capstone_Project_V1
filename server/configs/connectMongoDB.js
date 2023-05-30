import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        const mongoURL = process.env.ENV === "DEV" ? process.env.MONGO_LOCAL_URL : process.env.MONGO_CLOUD_URL;
        let mongooseConnect = await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let connectionState = mongooseConnect.connection.readyState;
        if (connectionState === mongooseConnect.ConnectionStates.connected) {
            console.log(`Database Connected`.bgGreen);
            console.log(`Database Server Running On ${mongoose.connection.host}`.bgCyan.white);
        }
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

export default connectMongoDB;