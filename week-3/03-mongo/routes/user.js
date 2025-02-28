const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    try{
        await User.create({
            username,
            password
        })
        res.json({
            message: "You have signed up successfully" 
        });
    }catch(err){
        console.log(`The err is: ${err}`);
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const { username } = req.headers;
    const courseId = req.params.courseId;
    try{
        await User.updateOne({
        username: username
        }, {
            "$push": {
                purchasedCourses: courseId   
            }
        });
        res.json({
            message: "Purchase complete."
        });
    }catch(e){
        console.log(`The error is ${e}`);
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    const courses = await Course.findOne({
        _id: {
            "$in": user.purchasedCourses
        }
    });
    res.json({
        courses: courses
    })
});

module.exports = router