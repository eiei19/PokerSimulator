var table;
var dealer;
window.onload = function() {
  table = new Table();
  table.draw_table();

  $("button#start").click(function() {
    dealer = new Dealer($("#playersCount").val());
    dealer.deal();
    table.put_cards(dealer.board, dealer.players);
  });

  $("button#next").click(function() {
    dealer.flop();
    table.put_cards(dealer.board, dealer.players);
  });
}