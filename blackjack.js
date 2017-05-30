" use strict ";


var display = document.getElementById("display");

function println(string){
  display.innerHTML += string +"<br/>";
}

// Class Definitions //

class Card{
  constructor(rank, suit, value){
    this.rank = rank;
    this.suit = suit;
    this.name = rank + " of " + suit;
    this.value = value;

  }
  getName(){
    return this.name;
  }
  getRank(){
    return this.rank;
  }
  getValue(){
    return this.value;
  }
  output(){
    println(this.getName);
  }
};//end of Card class

class Deck{
  constructor(){
    var i;
    this.cards = new Array();
    for(i=2;i<=10;i++){
      this.cards.push(new Card(i,"hearts",i));
      this.cards.push(new Card(i,"diamonds",i));
      this.cards.push(new Card(i,"clubs",i));
      this.cards.push(new Card(i,"spades",i));
    }//end of for loop
    // jacks
    this.cards.push(new Card("Jack","hearts",10));
    this.cards.push(new Card("Jack","diamonds",10));
    this.cards.push(new Card("Jack","clubs",10));
    this.cards.push(new Card("Jack","spades",10));
    // queens
    this.cards.push(new Card("Queen","hearts",10));
    this.cards.push(new Card("Queen","diamonds",10));
    this.cards.push(new Card("Queen","clubs",10));
    this.cards.push(new Card("Queen","spades",10));
    // kings
    this.cards.push(new Card("King","hearts",10));
    this.cards.push(new Card("King","diamonds",10));
    this.cards.push(new Card("King","clubs",10));
    this.cards.push(new Card("King","spades",10));
    // aces
    this.cards.push(new Card("Ace","hearts",11));
    this.cards.push(new Card("Ace","diamonds",11));
    this.cards.push(new Card("Ace","clubs",11));
    this.cards.push(new Card("Ace","spades",11));
  }

  shuffle(){
    var i;
    var j;
    var k;
      i = this.cards.length;
      while(--i > 0){
        k = this.cards[i];
        j = (Math.floor(Math.random() * this.cards.length));
        this.cards[i] = this.cards[j];
        this.cards[j] = k;
      }//end of while loop
  }//end of shuffle

  output() {
    var i;
    for(i=0;i<this.cards.length;i++){
      println(this.cards[i].getName());
    }//end of for loop
  }//end of output

  deal() {
    return this.cards.pop()
  }

  getNumCards(){
    return this.cards.length;
  }

};//end of Deck class

class Hand{
  constructor(){
  this.cards = new Array(0);
  }

  clear(){
    this.cards = new Array(0);
  }//end of clear

  add(card){
    this.cards.push(card);
  }//end of add

  show(){
    var i;
    var count = this.cards.length;
    //println(count);
    for(i=0;i<count;i++){
      println(this.cards[i].getName());
    }
  }//end of show

  getTotal(){
    var sum = 0;
    var i;
    var count = this.cards.length;
    //println(count);
    for(i=0;i<count;i++){
      sum += this.cards[i].getValue();
    }
    //println(sum);
    if(sum > 21){
      for(i=0;i<count;i++){
        if(this.cards[i].getRank() === "Ace" && sum > 21){
          sum -= 10;
        }
      }
    }
    return  sum;
  }//end of getTotal

};//end of Hand class

class Player{
  constructor(name){
    this.name = name;
    this.hand = new Hand();
  }

  getName(){
    return this.name;
  }

  getHand(){
    return this.hand;
  }
};//end of class Player


// test functions //

var testDeck = function(){
  var deck = new Deck();
  deck.shuffle();
  var i;
  var count = deck.getNumCards();
  println(count);
  for(i=0;i<count;i++){
    println("dealing : " + deck.deal().getName());
  }
}



// main game function //

var start = function(){
  display.innerHTML = "";
  var input;
  var i;
  var j;
  var k;
  var deck = new Deck();
  var dealer = new Player("Dealer");
  var player1 = new Player(prompt("Please choose a player name.", "Player1"));
  // shuffle the deck
  deck.shuffle();
  // deal 2 cards to dealer
  dealer.getHand().add(deck.deal());
  dealer.getHand().add(deck.deal());
  // deal 2 cards to player1
  player1.getHand().add(deck.deal());
  player1.getHand().add(deck.deal());
  // show dealer hand
  println("Dealer has:");
  dealer.getHand().show();
  println("for a total of :" + dealer.getHand().getTotal() + "<br/>");
  // show player1 hand
  println(player1.getName() + " has:");
  player1.getHand().show();
  println("for a total of :" + player1.getHand().getTotal() + "<br/>");
  // ask player1 to hit or stay
  input = prompt( "Dealer has " + dealer.getHand().getTotal() +
                  ", Your Total is " + player1.getHand().getTotal()+
                  ", Would you like to (hit) or (stay)?", "stay");
  while(input === "hit"){
    player1.getHand().add(deck.deal());
    println(player1.getName() + " has:");
    player1.getHand().show();
    println("for a total of :" + player1.getHand().getTotal() + "<br/>");
    if(player1.getHand().getTotal() <= 21){
      input = prompt( "Dealer has " + dealer.getHand().getTotal() +
                      ", Your Total is " + player1.getHand().getTotal() +
                      ", Would you like to (hit) or (stay)?", "stay");
    }else{
      println(player1.getName() + " BUSTED!!!");
      input = "bust";
    }
  }
  if(input !== "bust"){
    // when player1 stays
    while(dealer.getHand().getTotal() < 17){
      println("Dealer hits...");
      dealer.getHand().add(deck.deal());
      println("Dealer has:");
      dealer.getHand().show();
      println("for a total of :" + dealer.getHand().getTotal() + "<br/>");
    }
    if(dealer.getHand().getTotal() > 21){
      println("Dealer BUSTED!!!");
      input = "bust";
    }
  }
  if(input !== "bust"){
    if(player1.getHand().getTotal() > dealer.getHand().getTotal()){
      println(player1.getName() + " WINS!!!!");
      //alert("You Win!");
    }else if(player1.getHand().getTotal() < dealer.getHand().getTotal()){
      println("Dealer WINS!!!!");
      //alert("You Lose.");
    }else{
      println("Game is tied. Push.");
    }

  }
  println("<br/>Thank you for playing!");
}//end of start



start();
