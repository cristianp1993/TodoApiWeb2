const router = require("express").Router();
const UserModel = require("../../src/Models/userModel");
const bcrypt = require('bcrypt')
const passport = require('passport');

// Index
router.get("/signUp", async (req, res) => {
   res.render('auth/signUp')
})


router.post("/signUp", async (req, res) => {
    try {
        let { name, email, password } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {

            // res.json(user);
            req.login(user, (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.redirect('/auth/profile');
                }
            });
        } else {
            res.json({ message: 'User not created' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/profile', (req, res) => {
    res.json(req.user);
});

router.get('/signIn', (req, res) => {
    res.render('auth/signIn');
});

router.post('/signIn', (req, res) => {
    passport.authenticate('local', {
        successReturnToOrRedirect: '/auth/profile',
        failureRedirect: '/auth/signIn',
        keepSessionInfo: true
    })(req, res);
});

module.exports = router