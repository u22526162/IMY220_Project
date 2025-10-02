const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//route declarations
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/checkins', require('./routes/checkins'));

async function main() {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

main();