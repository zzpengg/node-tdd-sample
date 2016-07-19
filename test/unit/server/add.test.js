
import add from '../../../src/server/add.js';
var expect = require("chai").expect;

describe.only('node server add', function() {
  it("OK", function() {
    var testadd = add(1,1);

    expect(testadd).to.equal(2);
});

});
