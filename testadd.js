import http from 'http'
import add from './add'

export default async function add_startServer() {

  let app = await new Promise((resolve, reject) => {
    let app = http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      var content = add(1,1);
      console.log("content : " + content);
      response.write("content" + content);
      response.end();
    }).listen(8888);
    resolve(app);
  })

  return app;
}
