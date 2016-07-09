
import startServer from '../../../src/server/test';


describe('node server test', () => {

  let app = null;
  beforeEach(async (done) => {
    try {
      app = await startServer()
      done()
    } catch (e) {
      done(e)
    }
  });

  it('check server start', async (done) => {
    try {

      let {text} = await request(app).get("/start").expect(200)
      text.should.be.eq('Hello Start')
      done()
    } catch (e) {
      done(e)
    }
  });

  it('check server upload', async (done) => {
    try {

      let {text} = await request(app).get("/upload").expect(200)
      text.should.be.eq('Hello World')
      done()
    } catch (e) {
      done(e)
    }
  });

  afterEach(async (done) => {
    app.close(() => {
      done();
    });
  })

});
