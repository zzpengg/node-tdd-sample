import FacebookHelper from '../../../src/facebook/helper.js'

describe.only('facebook-helper', () => {
  let facebookHelper = null;

  before((done) => {
    let userId = "618444968267382";
    let token = "EAACEdEose0cBAKoO5ng9l1E05SJ26zo0siYhFE1NaZC8T2FcNknu9CcOy0k7cqkzOkF7Iyk26IhL4CIXyChmXjZA8Y6TZADyjApUImykZC0SDCFJxHq5OS3RAjRZA3AcJ6ZAvFX9Ft8ZC1T6pQlHYrJjERhZCeijbm9gGqVM6WxKqwZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    done();
  });

  it("get friends list", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
      done();
    } catch (e) {
      done(e);
    }
  });

  it.only("publish post", async (done) => {
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
