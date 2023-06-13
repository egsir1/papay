const MemberModel = require("../schema/member.model");
const Definer = require("../lib/errors");

const assert = require("assert");
const bcrypt = require("bcryptjs");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  // signup static method of Member class
  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);

      let result;
      try {
        result = await new_member.save();
        console.log(result);
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }
      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  // login static method of Member class
  async loginData(input) {
    try {
      const data = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        .exec();

      assert.ok(data, Definer.auth_err2);

      const isMatched = await bcrypt.compare(
        input.mb_password,
        data.mb_password
      );
      assert.ok(isMatched, Definer.auth_err3);
      //console.log("member::", data);
      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
    } catch (err) {
      console.log("BcryptError:", err);
      throw err;
    }
  }
}

module.exports = Member;
