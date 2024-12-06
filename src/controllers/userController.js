
// const bcrypt = require('bcrypt');
const db = require('../config/db')
const User= db.userModel
// const Sequelize = require('sequelize');

const saltRounds = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

module.exports = function (app) {
    const apiRoutes = require('express').Router();

    apiRoutes.post('/register', async (req, res) => {
        try {
            const hashedPassword = await hashPassword(req.body.password);
            const existingUser = await User.findOne({ where: { email: req.body.email } });

            if (existingUser) {
                return res.status(400).send({ msg: 'User already registered.' });
            }

            const newUser = await User.create({
                ...req.body,
                password: hashedPassword,
            });
            res.status(201).send(newUser);
        } catch (err) {
            res.status(500).send({ msg: err.message });
        }
    });

    apiRoutes.post('/login', async (req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });

            if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
                return res.status(400).send({ msg: 'Invalid credentials.' });
            }

            res.status(200).send(user);
        } catch (err) {
            res.status(500).send({ msg: err.message });
        }
    });

    apiRoutes.post('/storeName', async (req, res) => {
        const { name } = req.body;
    
        if (!name) {
            return res.status(400).send({ msg: 'Name is required.' });
        }
        
        try {
            const newUser = await User.create({ name });
            
            res.status(201).send({ msg: 'User created successfully.', user: newUser });
        } catch (err) {
            console.error('Error while storing data:', err);
            res.status(500).send({ msg: 'Error while storing data.', error: err.message });
        }
    });
    

    app.use('/', apiRoutes);
};
