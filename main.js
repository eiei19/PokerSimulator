window.onload = function() {
  var table = new Table();
  table.draw_table();

  var dealer = new Dealer(3);
  dealer.deal();
  dealer.flop();

  table.put_cards(dealer.board, dealer.players);
}