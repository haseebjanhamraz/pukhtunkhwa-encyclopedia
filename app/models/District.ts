import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    coordinates: {
        type: Array,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    history: {
        type: String,
        required: false
    },
    attractions: {
        type: Array,
        required: false
    },
    funfacts: {
        type: Array,
        required: false
    },
    mustvisit: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the timestamp before saving
districtSchema.pre('save', function(this: mongoose.Document & { updatedAt: Date }, next) {
    this.updatedAt = new Date();
    next(undefined);
});

const District = mongoose.models.District || mongoose.model('District', districtSchema);

export default District;
