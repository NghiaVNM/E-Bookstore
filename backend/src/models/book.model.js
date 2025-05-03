import {model, Schema} from 'mongoose';

export const BookSchema = new Schema({
    title: { type: String, required: true },
    publicationYear: { type: String, required: true },
    price: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
    genres: { type: [String], required: true },
    stars: { type: Number, default: 3 },
    coverImageUrl: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
});

export const BookModel = model('book', BookSchema); 