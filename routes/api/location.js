const express = require('express')
const router = express.Router()

// @router  POST api/register
// @dsc     Register user location
// @access  Public 
router.post('/register', (req, res) => {
    console.log(req)
})

module.exports = router