const con = require('../database');
const jwt = require('jsonwebtoken');
let randomize = require('randomatic');
let md5 = require('md5');

const homePage = (req, res) => {
    res.render('allInOne');
}

const timeConverter = (req, res) => {
    res.render('timeConverter');
}

const registrationForm = (req, res) => {
    res.render('registrationForm');
}

const registrationFormSubmit = (req, res) => {
    return new Promise((resolve, reject) => {

        let mail = `select count(email) as email from registration_table where email = '${req.body.email}'`;
        con.query(mail, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            if (result[0].email == 1) {
                res.send('You are already Registered!');
            }
            else {
                let sql = `insert into registration_table (firstname, lastname, email, phone, gender, dob, status) values('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${req.body.phone}', '${req.body.gender}', '${req.body.dob}', 'Inactive')`;

                con.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    return resolve(result);
                });

            }
            return resolve(result);

        });
    });
}

const activated = (req, res) => {
    return new Promise((resolve, reject) => {
        let dateDifference;

        let select = `select createdtime from registration_table where email = '${req.query.email}'`;
        con.query(select, (err, result) => {
            if (err) {
                throw err
            }
            generatedTime = result[0].createdtime;
            dateDifference = new Date - new Date(generatedTime);
            if (dateDifference < 10000) {
                res.render('password');
            } else {
                res.render('expire');
            }
            return resolve(result);
        });

        let upd = `update registration_table set createdtime = current_timestamp(6) where email = '${req.query.email}'`;
        con.query(upd, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });

    });
}

const passwordSubmit = (req, res) => {
    return new Promise((resolve, reject) => {
        let password = req.body.createpass;
        let salt = randomize('Aa0!', 4);
        let combo = password + salt;
        let token = md5(combo);

        let sql = `update registration_table 
        set status = 'active', createpass = '${req.body.createpass}', confirmpass = '${req.body.confirmpass}',  token = '${token}'
        where email='${req.query.email}'`;
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);

        });
    });
}

const login = (req, res) => {
    res.render('login');
}

const homePagePost = (req, res) => {
    return new Promise((resolve, reject) => {
        let mail = `select count(email) as email from registration_table where email = '${req.body.email}'`;
        con.query(mail, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            if (result[0].email == 1) {
                let pass = `select id, createpass from registration_table where email = '${req.body.email}';`;
                con.query(pass, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    if ((result[0].createpass == req.body.pass) == true) {
                        jwt.sign({ id: result[0].id }, 'secretKey', { expiresIn: '30000s' }, (err, token) => {

                            res.cookie('token', token).send('Cookie-Parser');
                        });
                    }
                    else {
                        res.send({ flag: false, msg: 'Your Email and Password do not match!' });
                    }
                });
            }
            else {
                res.send({ flag: false, msg: 'Your Email and Password do not match! last' });
            }
            return resolve(result);
        });
    });
}

const homePageGet = (req, res) => {
    jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            res.send({ result: "Invalid token" });
        } else {
            if (authData.id !== 0) {
                res.render('allInOne');
            }
            else {
                res.send("Invalid token");
            }
        }
    });
}

const forgot = (req, res) => {
    res.render('forgot');
}

const email = (req, res) => {
    return new Promise((resolve, reject) => {

        let upd = `update registration_table set createdtime = current_timestamp(6) where email = '${req.query.email}'`;
        con.query(upd, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            res.render('password');
            return resolve(result);
        });
    });
}

const expire = (req, res) => {
    res.render('expire');
}

const regenerated = (req, res) => {
    return new Promise((resolve, reject) => {
        let dateDifference;

        let upd = `update registration_table set createdtime = current_timestamp(6) where email = '${req.query.email}'`;
        con.query(upd, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });

        let select = `select createdtime from registration_table where email = '${req.query.email}'`;
        con.query(select, (err, result) => {
            if (err) {
                throw err
            }
            generatedTime = result[0].createdtime;
            dateDifference = new Date - new Date(generatedTime);
            if (dateDifference < 10000) {
                res.render('password');
            } else {
                res.render('expire');
            }
            return resolve(result);
        });
    });
}

const authentication = (req, res, next) => {
    let token = req.cookies.token;

    if (typeof token === 'undefined') {
        res.redirect('/login');
    } else {
        jwt.verify(req.cookies.token, 'secretKey', (err, authData) => {
            if (err) {
                res.redirect('/login');
            } else {
                if (authData.id !== 0) {
                    next();
                }
                else {
                    res.redirect('/login');
                }
            }
        });
    }
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
}

module.exports = { homePage, timeConverter, registrationForm, registrationFormSubmit, activated, passwordSubmit, login, homePagePost, homePageGet, forgot, email, expire, regenerated, authentication, logout }