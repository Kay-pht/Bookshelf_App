import { Schema } from "mongoose";
import mongoose from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
      default: 3,
      get: function (val) {
        return Math.round(val);
      },
      set: function (val) {
        return Math.round(val);
      },
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
