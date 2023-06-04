const mongoose = require("mongoose");
const {
  member_type_enums,
  member_status_enums,
  ordenery_enums,
} = require("../lib/config");

const memberSchema = new mongoose.Schema(
  {
    mb_nick: {
      type: String,
      required: true,
      index: { unique: true, sparse: true },
    },
    mb_phone: {
      type: String,
      required: true,
    },
    mb_password: {
      type: String,
      required: true,
      select: false,
    },
    mb_type: {
<<<<<<< HEAD
      type: String,
      // required: false,
=======
      required: false,
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f
      default: "USER",
      enum: {
        values: member_type_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_status: {
<<<<<<< HEAD
      type: String,
      // required: false,
=======
      required: false,
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f
      default: "ACTIVE",
      enum: {
        values: member_status_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
<<<<<<< HEAD
    // mb_full_name: {
    //   type: String,
    //   required: false,
    // },
    mb_address: {
      type: String,
      // required: false,
    },
    mb_description: {
      type: String,
      // required: false,
    },
    mb_image: {
      type: String,
      // required: false,
    },
    mb_point: {
      type: Number,
      // required: false,
    },
    mb_top: {
      type: String,
      // required: false,
=======
    mb_full_name: {
      type: String,
      required: false,
    },
    mb_address: {
      type: String,
      required: false,
    },
    mb_description: {
      type: String,
      required: false,
    },
    mb_image: {
      type: String,
      required: false,
    },
    mb_point: {
      type: Number,
      required: false,
    },
    mb_top: {
      type: String,
      required: false,
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f
      default: "N",
      enum: {
        values: ordenery_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_views: {
      type: Number,
<<<<<<< HEAD
      // required: false,
=======
      required: false,
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f
      default: 0,
    },
    mb_likes: {
      type: Number,
<<<<<<< HEAD
      // required: false,
=======
      required: false,
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f
      default: 0,
    },
    mb_follow_cnt: {
      type: Number,
<<<<<<< HEAD
      // required: false,
=======
      required: false,
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f
      default: 0,
    },
    mb_subscriber_cnt: {
      type: Number,
<<<<<<< HEAD
      // required: false,
=======
      required: false,
>>>>>>> abf7c4f08a5f52718dcded0aa3c1960c2fe27d1f
      default: 0,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("Member", memberSchema);
