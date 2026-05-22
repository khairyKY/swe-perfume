const app = require('./app');
const { connectDb } = require('./db/mongoose');
const config = require('./config');

const start = async () => {
  try {
    await connectDb();
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();
