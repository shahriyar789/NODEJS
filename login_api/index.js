const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database');
var jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertQuery = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`;

    db.query(insertQuery)
        .then(() => {
            res.status(200).send('Registration successful');
        })
        .catch(err => {
            console.error('Error during registration:', err);
            res.status(500).send('Registration failed');
        });
});


  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Received Request - Email:', email, 'Password:', password);

    if (!email || !password) {
        return res.status(400).send('Email and password are required')
    
    }

    const selectQuery = `SELECT * FROM users WHERE email = '${email}'`;
   // console.log('Query:', selectQuery);


    db.query(selectQuery)
        .then(users => {
            if (users.length === 0) {
                return res.status(401).send('Authentication failed');
            }
  console.log('hello');
            const user = users[0][0];
            console.log('Hashed Password from DB:',users[0][0]);

            bcrypt.compare(password, user.password, (err, isValidPassword) => {
                if (err) {
                    console.error('Error during password comparison:', err);
                    return res.status(500).send('Authentication failed');
                }

                if (isValidPassword) {
                    res.status(200).send('Authentication successful');
                } else {
                    res.status(401).send('Authentication failed');
                }
            });
        })
        .catch(err => {
            console.error('Error during authentication:', err);
            res.status(500).send('Authentication failed');
        }); 
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
