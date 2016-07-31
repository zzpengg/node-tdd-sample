import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.only('facebook-helper', () => {
  let facebookHelper = null;
  let models = null

  before(async (done) => {
    let userId = "618444968267382";
    let token = "EAACEdEose0cBAI7Se9TQU9ZCM3gG7cph9V3eEDBGQTPClEKFgS0oiZCWzP0ZCCZCBmrEBlVKpuSbDnVttsXzKhFbH1625eRkp1xp9VM7IABD2m9upze185blIj8hbcZAd8kjsj79DXux4yKbUXZBnmuWGcWjc84VkzhYaJ3KqqRgZDZD";
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
      let friends_list = {};
      console.log("friends", friends);
      console.log("QAQ");
      let j=0;
      for(let i of friends)
      {
        friends_list[j] = await models.Friend.create({
          fbId: friends[j].id   ,
          name: friends[j].name ,
          email: 'test@mail.com',
        });
        console.log("QAQ" + j);
        j=j+1;
      }
      console.log(friends_list);

      console.log(friends_list[0].name);
      (friends_list != null).should.be.true;
      friends_list.should.be.Array;
      // for(var i=0;i<12;i++)
      //   friends_list[i].should.have.keys("name", "email", "fbId");
      for(var i=0;i<12;i++)
      {
        (friends_list[i].name != null).should.be.true;
        (friends_list[i].fbId != null).should.be.true;
        (friends_list[i].email != null).should.be.true;
      }
      done();
    } catch (e) {
      done(e);
    }
  });

  it("find friends list", async (done) => {
    try {
      let result_find = await models.Friend.findAll();
  //    console.log(result_find);

      (result_find != null).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it("update friends list", async (done) => {
    try {
      await models.Friend.update(
        {
          email: 'hellojs@trunk.studio'
        },
        {
          where:{
            name:'Cheng-En Tsai'
          }
        }
      );
      let result_find = await models.Friend.findOne({
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
      await models.Friend.destroy({
        where:{
          name:'Cheng-En Tsai'
        }
      });
      //console.log(result_find);
      let result_find = models.Friend.findOne({
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
