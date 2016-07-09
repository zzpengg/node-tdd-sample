import http from 'http'

async function test_startServer() {

  let app = await new Promise((resolve, reject) => {
    let app = http.createServer(function(request, response) {
      //Including dependency
      var Sequelize = require("sequelize");

      //Setting up the config
      var sequelize = new Sequelize('your-database-name', 'db-username', 'db-password', {
          host: "localhost",
          port: 3306,
          dialect: 'mysql'
      });

      sequelize.authenticate().then(function (err) {

         console.log('There is connection in ERROR');
      })
      .catch (function(err) {
         console.log('Connection has been established successfully');
      })
      .done();

      var Item = sequelize.define('Item', {
          id : {type:Sequelize.STRING,primaryKey:true},
          name:Sequelize.STRING,
          description: Sequelize.STRING,
          qty: Sequelize.INTEGER
      });

//Applying Item Table to database
sequelize.sync({force:true}).then(function (err) {

    console.log('An error occur while creating table');
 }).catch(function(err){
    console.log('Item table created successfully');
 }).done();

//There is two way of inserting data into database
//One way: Forming object from modal
var item1 = Item.build({
    id: 1,
    name:'Laptop',
    description: 'Acer 2340TL',
    qty: 23
});
//Inserting Data into database
item1.save().then(function (err) {

    console.log('Error in Inserting Record');
 }) .catch(function() {
    console.log('Data successfully inserted');
    console.log(item1.name);
 }).done();

//Other way: Immediate insertion of data into database
/*sequelize.sync().then(function () {
  Item.create({
     id: 2,
     name:'Cell Phone',
     description: 'Sony',
     qty: 20
  }).then(function (data) {
  console.log(data.values)
 })
});*/


      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello World");
      response.end();
    }).listen(8888);
    resolve(app);
  })

  return app;
}
test_startServer();
