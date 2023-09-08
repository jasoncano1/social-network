const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought_id field
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Please enter a username!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => new Date(createdAtVal).toDateString()
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please enter a thought!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => new Date(createdAtVal).toDateString()
        },
        username: {
            type: String,
            required: 'Please enter a username!'
        },
        // use ReactionSchema to validate data for a reply
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;