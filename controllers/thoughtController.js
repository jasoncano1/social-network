const { User, Thought } = require('../models');

module.exports = {
    
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },

    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this ID!' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this ID!' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
        },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(400).json({ message: 'No Thought found with this ID!' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbFriendData => {
                if (!dbFriendData) {
                    res.status(404).json({ message: 'No User found with this ID!' })
                    return;
                }
                res.json(dbFriendData)
            })
            .catch(err => res.json(err))
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbFriendData => {
                if (!dbFriendData) {
                    res.status(404).json({ message: 'No User found with this ID!' })
                    return;
                }
                res.json(dbFriendData)
            })
            .catch(err => res.json(err))
    }

}