const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../index");
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    const user = await User.findOne({
        username,
        password
    });

    if(user){
        jwt.sign({
            username
        }, JWT_SECRET);
        res.json({
            token
        })
        
    }else{
        res.json({
            msg: "User doesnt exist."
        })
    } 
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;