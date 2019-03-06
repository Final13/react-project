const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/app', {useNewUrlParser: true})
        .then(() => { console.log('Database is connected...') })
        .catch((error) => { console.log(`Can not connect to the database: ${error}`) });
};