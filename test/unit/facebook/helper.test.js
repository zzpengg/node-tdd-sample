import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.only('facebook-helper', () => {
  let facebookHelper = null;
  let models = null

  before(async (done) => {
    let userId = "618444968267382";
    let token = "EAACEdEose0cBABkTTZAGFMsipFXZAJllnb7YzpIeXviw1wcOi7ZAl6od6o9fZCoflqZCuW6xpILuIiCmyeQAureWZBIWIL2Wd3Kd59c6mke665pLOrfmV3kurMCm523B8NEygk5lbpyZCc1J4j5CKFQjGtxJhGpDUBAZCCZCol7HwZAAZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    try{
    models = await task1_initModel()
  }catch(e){done(e)}

    done();
  });

  it("get friends list", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id", "email", "fbId");
      let result = {};
      for(var i=0;i<12;i++)
      result[i] = await models.User.create(friends[i]);
  //    console.log(result);

      (result[0].name != null).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it("find friends list", async (done) => {
    try {
      let result_find = await models.User.findAll();
  //    console.log(result_find);

      (result_find != null).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it("update friends list", async (done) => {
    try {
      await models.User.update(
        {
          email: 'hellojs@trunk.studio'
        },
        {
          where:{
            name:'Cheng-En Tsai'
          }
        }
      );
      let result_find = await models.User.findOne({
        where:{
          name:'Cheng-En Tsai'
        }
      });
      console.log(result_find);

      result_find.email.should.be.eq('hellojs@trunk.studio');
      done();
    } catch (e) {
      done(e);
    }
  });

  it("delete friends list", async (done) => {
    try {
      await models.User.destroy({
        where:{
          name:'Cheng-En Tsai'
        }
      });
      //console.log(result_find);
      let result_find = models.User.findOne({
        where:{
          name:'Cheng-En Tsai'
        }
      });
      console.log("find = " + result_find.name);

      (result_find.name === undefined).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
