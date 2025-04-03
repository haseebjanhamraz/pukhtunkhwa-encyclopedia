import mongoose from "mongoose";

const poetrySchema = new mongoose.Schema({
    verse: {
        type: Array,
        required: true
    },
    poet: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['shair', 'ghazal', 'rubai', 'tappa', 'nazam', 'other']
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the timestamp before saving
poetrySchema.pre('save', function(this: mongoose.Document & { updatedAt: Date }, next) {
    this.updatedAt = new Date();
    next(undefined);
});

const Poetry = mongoose.models.Poetry || mongoose.model('Poetry', poetrySchema);

export default Poetry;
