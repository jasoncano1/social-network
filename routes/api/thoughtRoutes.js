const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addFriend,
    deleteFriend
} = require('../../controllers/thoughtController');

router
    .route('/')
    .post(createThought)
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought); 

// router
//     .route('/:ThoughtId/friends/:friendId')
//     .post(addFriend)
//     .delete(deleteFriend);
    
module.exports = router;      