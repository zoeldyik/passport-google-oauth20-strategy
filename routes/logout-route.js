const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    req.logout();
    req.flash('message', ['primary', 'kamu telah logout!'])
    res.redirect('/login');
})


module.exports = router;