import mongoose from 'mongoose';

const mongoConnect = () => {
  mongoose.connect('please out your mongodb connection link here', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection
    .once('open', () => console.log('Database Connected :-)'))
    .on('error', (error) => {
      console.log('Error ', error);
    });
};

export default mongoConnect;
