const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/index");

const login = async (req, res) => {
    // res.send("Fake Login/Register/Signup Route.");
    const { username, password } = req.body;


    if (!username || !password) {
        throw new BadRequestError('Please provide username and password');
    }

    const id = new Date().getDate();

    const token = jwt.sign({ id, username }, process.env.JWT_Secret, { expiresIn: '30d' });
    // res.cookie('token', token);
    res.status(200).json({ msg: "user created", token: token });
}


const dashboard = async (req, res) => {
    const { username } = req.user;
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}.` });
}


module.exports = { login, dashboard };