const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    Admin.create({
        username,
        password
    })
    .then(function(){
        res.json({
            message: 'Admin created successfully'
        });
    })
    .catch(function(){
        res.status(403).json({
            message: 'Admin could not be created.'
        });
    })
});

router.post('/courses', adminMiddleware, async function(req, res){
    // Implement course creation logic
    const { title, description, imageLink, price } = req.body;
    const newCourse = await Course.create({
        title, 
        description,
        imageLink,
        price
    });

    res.json({
        message: "Course created successfully.",
        courseId: newCourse._id
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    });
});

module.exports = router;