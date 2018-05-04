class Table {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');

    var cards = [
      "As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks",
      "Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc",
      "Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh",
      "Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd",
      "hidden",
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
    context.font = "bold 14px 'ＭＳ Ｐゴシック'";
    context.fillStyle = "#FFF";
    var playerCardPositions = [
      {x: 645, y: 100}, {x: 645, y: 230},
      {x: 540, y: 380}, {x: 350, y: 380}, {x: 150, y: 380},
      {x: 10, y: 100}, {x: 10, y: 230},
    ];
    var w  = 70;
    var h = 105;

    for (var i = 0; i < players.length; i++) {
      var x = playerCardPositions[i].x;
      var y = playerCardPositions[i].y;

      var card1 = "hidden";
      var card2 = "hidden";
      if (i == (players.length - 1) || show) {
        card1 = players[i].cards[0];
        card2 = players[i].cards[1];
      }
      context.drawImage(this.cards[card1], x, y, w, h);
      context.drawImage(this.cards[card2], x+5+w, y, w, h);

      if (players[i].winRate && show) {
        context.fillText(players[i].winRate, x+4, y-2);
      }
    }

    var boardCards = [];
    var boardCardPostion = {x: 525, y: 170};
    for (var i = 0; i < board.cards.length; i++) {
      var x = boardCardPostion.x;
      var y = boardCardPostion.y;
      context.drawImage(this.cards[board.cards[i]], x-(w+5)*i, y, w, h);
    }
  }
}
