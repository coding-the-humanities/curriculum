class Card {

  constructor({title, type, description}){
    this._title = title;
    this._type = type || "Exercise";
    this._description = description;
  }

  get title(){
    return this._title;
  }

  set title(title){
    if(this.checkAttribute(title)){
      this._title = title;
    }
  }

  get description(){
    return this._description;
  }

  set description(description){
    if(this.checkAttribute(description)){
      this._description = description;
    }
  }

  get type(){
    return this._type;
  }

  get isValid(){
    var valid = true;
    ["title", "description"].forEach((prop) => {
      if(!this[prop]){
        valid = false
      };
    });
    return valid;
  }

  checkAttribute(attr){
    if(attr != ""){
      return true;
    }
  }
}


var c = new Card({
  title: "new"
});

var cards = [c];

if (Meteor.isClient) {

  Session.setDefault("cards", cards);

  Template.exerciseCard.helpers({
    cards: function () {
      cards = Session.get("cards").map((card) => new Card({
        title: card._title,
        type: card._type,
        description: card._description
      }));
      return cards;
    }
  });

  Template.addCard.events({
    'click button': function () {
      var newCard = new Card({});

      newCard.title = $('.title').val();
      newCard.description = $('.description').val();

      if(newCard.isValid){
        cards.push(newCard);
      }

      Session.set("cards", cards);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
