const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('port') || 5000;

const app = express();
app.use('/api/auth', require('./routes/auth.routes'));

async function start(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`Application has bean started on port ${PORT}...`);
    });
  } catch (e) {
    console.log('Server error:', e.message);
    process.exit(1);
  }
}

start(config.get('mongoUri'));

