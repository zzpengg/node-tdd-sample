
import add_startServer from '../../../src/server/testadd';


describe.only('node server add', () => {

  let app = null;
  beforeEach(async (done) => {
    try {
      app = await add_startServer()
      done()
    } catch (e) {
      done(e)
    }
  });

  it('check server', async (done) => {
    try {
      let result = await request(app).get("/").expect(200)
      result.text.should.be.eq('content2')

      let {text} = await request(app).get("/").expect(200)
      text.should.be.eq('content2')
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
