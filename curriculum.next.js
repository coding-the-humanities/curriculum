class Dog {
  constructor(){
    this._name = "Sammy";
  }

  get name(){
    return this._name;
  }
}

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  var d = new Dog;
  console.log(d.name);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
