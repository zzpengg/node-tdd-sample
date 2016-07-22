import task1_initModel from '../../../src/database/task1';

describe('database level 1', () => {
  let models = null;
  beforeEach(async (done) => {
    try {
      models = await task1_initModel()
      done()
    } catch (e) {
      done(e)
    }
  });

  it('create user data', async (done) => {
    try {
      let addUser = {username: 'test', password: 'test', email: 'test@mail.com'}
      let result = {};
      result = await models.User.create(addUser)
      result.toJSON().should.has.keys(
        'id',
        'username',
        'email',
        'password',
        'createdAt',
        'updatedAt'
      );
      done();
    } catch (e) {
      done(e);
    }
  });

  it('user list should be only one', async (done) => {
    try {
      let list = await models.User.findAll();
      console.log('=== list.length ===', list.length);
      (list.length == 0).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('database task1 find', () => {
    let models = null;
    let user = null;
    beforeEach(async (done) => {
      try {
        models = await task1_initModel();
        const addUser = {
          username: 'test',
          password: 'test',
          email: 'test@mail.com'
        }
        user = await models.User.create(addUser);
        done()
      } catch (e) {
        done(e)
      }
    });

    it('find by user id', async (done) => {
      try {
        let result = {};
        result = await models.User.findById(user.id);
        result.id.should.be.eq(user.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('find by user name', async (done) => {
      try {
        let result = {};
        result = await models.User.findOne({
          where: {
            email: user.email,
          },
        });
        result.id.should.be.eq(user.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('find by user name', async (done) => {
      try {
        let result = {};
        result = await models.User.findOne({
          where: {
            email: user.email,
          },
        });
        result.id.should.be.eq(user.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('update user password', async (done) => {
      try {
        const newPassword = '123123';
        let result = {};
        result = await models.User.findOne({
          where: {
            email: user.email,
          },
        });
        result.password = newPassword;
        await result.save();
        result.password.should.be.eq(newPassword);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('destroy user', async (done) => {
      try {;
        let result = {};
        result = await models.User.findOne({
          where: {
            email: user.email,
          },
        });
        await result.destroy();

        const check = await models.User.findOne({
          where: {
            email: user.email,
          },
        });
        (check === null).should.be.true;
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});


describe('database task1 find', () => {

  let models = null;
  beforeEach(async (done) => {
    try {
      models = await task1_initModel()
      let addUser = {
        username: 'test',
        password: 'test',
        email: 'test@mail.com'
      }
      let result = await models.User.create(addUser);

      done()
    } catch (e) {
      done(e)
    }
  });

  it('find user without async', (done) => {
    try {
      console.log("=== start ===");
      let results = models.User.findAll();
      console.log("=== end ===");
      done()
    } catch (e) {
      done(e)
    }
  });

  it('find user without async use promise', (done) => {
    try {
      console.log("=== start ===");
      let results = models.User.findAll().then(() => {
        console.log("=== end ===");
      });
      done()
    } catch (e) {
      done(e)
    }
  });

  it('find user data with async', async (done) => {
    try {
      console.log("=== start ===");
      let results = await models.User.findAll();
      (results.length == 1).should.be.true
      console.log("=== end ===");
      done()
    } catch (e) {
      done(e)
    }
  });

});
