const express = require('express')
const router = express.Router()

// @router  POST api/users/register
// @dsc     Register user location
// @access  Public 
router.post('/register', (req, res) => {
    console.log(req)
})