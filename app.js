const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./models'); 
const cors = require('cors');

const app = express();
const port = process.env.PORT||3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, ()=>{
      console.log(console.log(`Server is running on port ${port}`));
    })
  })
  .catch((err) => {
    console.error('Unable to synchronize the database:', err);
  });

module.exports = app;
