require('dotenv').config();
const app = require('./index');
const port = process.env.PORT || 3001;

console.log(process.env.PGUSER, "Hello")

// ----------------------- LISTENER
app.listen(port, () => console.log(`Example app listening on port ${port}`));
