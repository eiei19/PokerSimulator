var table;
var dealer;
var step = "start";
var show = false;
window.onload = function() {
  table = new Table();
  table.draw_table();

  $("button#next").click(function() {
    switch (step) {
      case "start":
        dealer = new Dealer($("#playersCount").val());
        dealer.deal();
        step = "preflop";
        $(this).text("FLOP");
        break;

      case "preflop":
        dealer.flop();
        step = "flop";
        $(this).text("TURN");
        break;

      case "flop":
        dealer.turn();
        step = "turn";
        $(this).text("RIVER");
        break;

      case "turn":
        dealer.river();
        step = "start";
        $(this).text("START");
        break;
    }

    table.put_cards(dealer.board, dealer.players, show);
  });

  $("button#card").click(function() {
    if (show) {
      show = false;
      $(this).text("SHOW THE CARDS");
    } else {
      show = true;
      $(this).text("HIDE THE CARDS");
    }
    table.put_cards(dealer.board, dealer.players, show);
  });
}