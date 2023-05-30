const MemberModel = require("../schema/member.model");
const Definer = require("../lib/errors");

const assert = require("assert");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  // signup static method of Member class
  async signupData(input) {
    try {
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

      const isMatched = input.mb_password === data.mb_password;
      assert.ok(isMatched, Definer.auth_err3);

      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
      //console.log("member::", data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
