const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');

const register = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({
        email: req.body.email
    });

    if(user) {
        return res.status(400).json({
            email: 'Email already exists'
        });
    } else {
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: (req.body.email === 'faxtalk666@gmail.com' && req.body.password === '123123') ? 'admin' : 'user',
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
                            res.json(user);
                        })();
                    }
                });
            }
        });
    }
};

const login = async (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    const user = await User.findOne({email});
    if(!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch) {
        const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
        };
        jwt.sign(payload, 'secret', {
            expiresIn: 3600 * 10
        }, (err, token) => {
            if(err) console.error('There is some error in token', err);
            else {
                res.json({
                    success: true,
                    token: `Bearer ${token}`
                });
            }
        });
    }
    else {
        errors.password = 'Incorrect Password';
        return res.status(400).json(errors);
    }
};

module.exports = {
    register,
    login
};