const mongoose = require('mongoose');


/**
 * Group schema representing social clubs.
 *
 * @typedef Group
 * @property {ObjectId} owner - Reference to the User who created the group.
 * @property {string} name - The name of the group.
 * @property {string} description - A brief description of the group.
 * @property {string} rules - The rules and guidelines for the group.
 * @property {string} bannerURL - The URL of the group's banner image.
 * @property {Object} location - An object containing location information.
 * @property {string} location.address - The address of the group's location.
 * @property {string} location.street - The street where the group is located.
 * @property {string} location.city - The city where the group is located.
 * @property {string} location.zip - The zip code of the group's location.
 * @property {string} category - The category of the group.
 * @property {Array<ObjectId>} members - An array of references to User documents representing group members.
 * @property {Array<ObjectId>} moderators - An array of references to User documents representing group moderators.
 * @property {Array<ObjectId>} requests - An array of references to User documents representing join requests.
 * @property {boolean} permissionRequired - Indicates if permission is required to join the group.
 * @property {boolean} deactivated - Indicates if the group is deactivated.
 */
const groupSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        maxlength: 500,
        trim: true,
    },
    rules: {
        type: String,
        required: false,
        maxlength: 500,
        trim: true,
    },
    bannerURL: {
        type: String,
        required: false,
    },
    location: {
        geo: {
            type: {
                type: String,
                enum: ['Point'],
                required: false,
            },
            coordinates: {
                type: [Number],
                required: false,
            },
        },
        address: {
            type: String,
            required: false,
        },
        zip: {
            type: String,
            required: false,
        },
    },    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    moderators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
        },
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
        },
    ],
    bannedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    permissionRequired: {
        type: Boolean,
        required: false,
        default: false,
    },
    deactivated: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true,
});


// Add a 2dsphere index for the location.geo field
groupSchema.index({ 'location.geo': '2dsphere' });

// Create the Group model using the group schema
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
