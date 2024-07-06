const express = require('express');
const router = express.Router();

router.post("/foodData", (req, res) => {
    try {
        if (global.food_items && global.foodCategory) {
            res.status(200).json({
                food_items: global.food_items,
                foodCategory: global.foodCategory
            });
        } else {
            res.status(500).send("Data not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
