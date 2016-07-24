import FB from 'fb'

// export default (userid, token, cb) => {
//   FB.setAccessToken(token);
//   return FB.api(userid + '/friends', function(res) {
//     return cb(null, res.data);
//   });
// };

export default class FacebookHelper {

  constructor({token, userId}) {
    this.FB = FB;
    this.FB.setAccessToken(token);
    this.userId = userId;
  }

  async getFriends() {
    try {
      let result = await new Promise((resolve, reject) => {
        this.FB.api(`${this.userId}/friends?fields=id,email,name,fbId`, function(res, error) {
          if(error) reject(error);
          resolve(res.data);
        });
      });
      result[0].email = 'test@mail.com';
      result[0].fbId = result[0].id;
      console.log(result[0].email);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async publishPost({message}) {
    try {
      let result = await new Promise((resolve, reject) => {
        this.FB.api(`${this.userId}/feed`, 'post', { message }, function(res, error) {
          if(error) reject(error);
          resolve(res);
        });
      });
      return result;

    } catch (e) {
      throw e;
    }
  }

};
