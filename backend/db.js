import mongoose from 'mongoose'

export const ConnectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,  // Retry timeout in 5 seconds
        connectTimeoutMS: 10000,  // Connection timeout after 10 seconds
      })
      .then(() => console.log('Database connected successfully'))
      .catch(err => console.error('Error connecting to the database:', err));
}
