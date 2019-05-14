const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = () => {
    User.find({}).exec((err, collection) => {
        if (collection.length === 0) {

            const avatar = gravatar.url('faxtalk666@gmail.com', {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: 'Admin',
                email: 'faxtalk666@gmail.com',
                password: '123123',
                role: 'admin',
                avatar
            });
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            (async () => {
                                const user = await newUser.save();
                                if (!user) console.log('Can not create Admin user')
                            })();
                        }
                    });
                }
            });
        }
    });
};
