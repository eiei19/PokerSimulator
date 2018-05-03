class Table {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');

    var cards = [
      "s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "s11", "s12", "s13",
      "c01", "c02", "c03", "c04", "c05", "c06", "c07", "c08", "c09", "c10", "c11", "c12", "c13",
      "h01", "h02", "h03", "h04", "h05", "h06", "h07", "h08", "h09", "h10", "h11", "h12", "h13",
      "d01", "d02", "d03", "d04", "d05", "d06", "d07", "d08", "d09", "d10", "d11", "d12", "d13",
      "z02",
    ];
    this.cards = {};
    for (var i = 0; i < cards.length; i++) {
      var key = cards[i]
      this.cards[key] = new Image();
      this.cards[key].src = "./cards/" + key + ".gif";
    };
  }

  clear_table() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw_table() {
    var x = 0;
    var y = 0;
    var w = 800;
    var h = 500;
    var r = 150;
    var color = "#378E1D";

    var context = this.context;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.moveTo(x,y + r);
    context.arc(x+r,y+h-r,r,Math.PI,Math.PI*0.5,true);
    context.arc(x+w-r,y+h-r,r,Math.PI*0.5,0,1);
    context.arc(x+w-r,y+r,r,0,Math.PI*1.5,1);
    context.arc(x+r,y+r,r,Math.PI*1.5,Math.PI,1);
    context.closePath();
    context.stroke();
    context.fill();
  }

  put_cards(board, players, show=false) {
    this.clear_table();
    this.draw_table();

    var context = this.context;
    var playerCardPositions = [
      {x: 645, y: 100}, {x: 645, y: 230},
      {x: 540, y: 380}, {x: 350, y: 380}, {x: 150, y: 380},
      {x: 10, y: 100}, {x: 10, y: 230},
    ];
    var w  = 70;
    var h = 105;

    var playerCards = [];
    for (var i = 0; i < players.length; i++) {
      var x = playerCardPositions[i].x;
      var y = playerCardPositions[i].y;
      playerCards[i] = [new Image(), new Image()];

      var card1 = "z02";
      var card2 = "z02";
      if (i == (players.length - 1) || show) {
        card1 = players[i].cards[0];
        card2 = players[i].cards[1];
      }
      context.drawImage(this.cards[card1], x, y, w, h);
      context.drawImage(this.cards[card2], x+5+w, y, w, h);
    }

    var boardCards = [];
    var boardCardPostion = {x: 525, y: 170};
    for (var i = 0; i < board.cards.length; i++) {
      var x = boardCardPostion.x;
      var y = boardCardPostion.y;
      boardCards[i] = new Image();
      boardCards[i].src = "./cards/" + board.cards[i] + ".gif";
      boardCards[i].onload = this.imageLoadCallback(context, boardCards[i], x-(w+5)*i, y, w, h);
    }
  }

  imageLoadCallback(context, img, x, y, w, h) {
    return function () {
      context.drawImage(img, x, y, w, h);
    }
  }
}
