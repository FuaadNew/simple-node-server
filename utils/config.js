require('dotenv').config();
const PORT = process.env.PORT ||  3000
const url = process.env.MONGODB_URI;

module.exports = {
    MONGODB_URI,
    PORT
}