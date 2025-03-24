import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    province: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    area: {
        type: Number, // in square kilometers
        required: true
    },
    headquarters: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
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
