class Deck {
  constructor() {
    this.cards = []
  }

  shuffle() {
    this.cards = [
      "♠️A", "♠️2", "♠️3", "♠️4", "♠️5", "♠️6", "♠️7", "♠️8", "♠️9", "♠️T", "♠️J", "♠️Q", "♠️K",
      "♣️A", "♣️2", "♣️3", "♣️4", "♣️5", "♣️6", "♣️7", "♣️8", "♣️9", "♣️T", "♣️J", "♣️Q", "♣️K",
      "♥️️A", "♥️️2", "♥️️3", "♥️️4", "♥️️5", "♥️️6", "♥️️7", "♥️️8", "♥️️9", "♥️️T", "♥️️J", "♥️️Q", "♥️️K",
      "♦️A", "♦️2", "♦️3", "♦️4", "♦️5", "♦️6", "♦️7", "♦️8", "♦️9", "♦️T", "♦️J", "♦️Q", "♦️K",
    ]
    for (var i = this.cards.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = this.cards[i];
      this.cards[i] = this.cards[r];
      this.cards[r] = tmp;
    }
  }

  get_card() {
    return this.cards.pop();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.is_button = false;
    this.is_sb = false;
    this.is_bb = false;
  }

  receive_card(card) {
    this.cards.push(card);
  }

  be_button() {
    this.is_button = true;
  }

  be_sb() {
    this.is_sb = true;
  }

  be_bb() {
    this.is_bb = true;
  }

  discard_cards() {
    this.is_button = false;
    this.is_sb = false;
    this.is_bb = false;
    this.cards = [];
  }
}


class Board {
  constructor() {
    this.cards = []
  }

  receive_card(card) {
    this.cards.push(card);
  }

  discard_cards() {
    this.cards = [];
  }
}

class Dealer {
  constructor(players_count = 2) {
    this.deck = new Deck();
    this.board = new Board();
    this.players = [];
    for (var i = 1; i <= players_count; i++) {
      this.players.push(new Player("player"+i))
    }
    this.button_index = null;
    this.sb_index = null;
    this.bb_index = null;
    this.set_button();
  }

  // ボタン、SB、BBをセット
  set_button() {
    if (this.players[this.button_index] === undefined) {
      this.button_index = 0;
    } else {
      this.button_index++;
    }

    if (this.players[this.button_index + 1] === undefined) {
      this.sb_index = 0;
    } else {
      this.sb_index = this.button_index + 1;
    }

    if (this.players[this.sb_index + 1] === undefined) {
      this.bb_index = 0;
    } else {
      this.bb_index = this.sb_index + 1;
    }

    this.players[this.button_index].be_button();
    this.players[this.sb_index].be_sb();
    this.players[this.bb_index].be_bb();
  }

  deal() {
    // カードを配る
    this.deck.shuffle();
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < this.players.length; j++) {
        var card = this.deck.get_card();
        this.players[j].receive_card(card);
      }
    }
  }

  flop() {
    for (var i = 0; i < 3; i++) {
      this.board.receive_card(this.deck.get_card());
    }
  }

  turn() {
    this.board.receive_card(this.deck.get_card());
  }

  river() {
    this.board.receive_card(this.deck.get_card());
  }

  end_the_hand() {
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].discard_cards();
    }
    this.board.discard_cards();
    this.set_button();
  }
}


var dealer = new Dealer(3);