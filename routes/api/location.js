const express = require('express')
const router = express.Router()

// @router  GET api/register
// @dsc     Register user location
// @access  Public 
router.get('/register', (req, res) => {
    res.send('oi')
})

module.exports = router