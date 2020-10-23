(function (){
  'use strict';

  require("./config.js");

  casper.test.begin("User logs in", 3, function suite(test) {
    casper.start("http://front-end/", function() {
      test.assertNotVisible("#login-modal", "user does not see the login dialogue");

      this.clickLabel("Login");
      casper.waitUntilVisible("#login-modal", function() {
        test.assertVisible("#login-modal", "user is presented with the login dialogue");
        this.fill("#login-modal form", {
          "username": "user",
          "password": "password"
        }, false);
      }, function() {
        test.fail("login dialogue never showed up");
      }, 3000);
    });

    casper.then(function() {
      this.click("#login-modal form button.btn.btn-primary");
      this.waitForText("Logged in as User Name", function() {
        test.pass("user is logged in");
      }, function() {
        test.fail("user login failed");
      }, 3000);
    });

    casper.run(function() {
      test.done();
    });
  });
}());
