window.onload = function() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    //角丸四角の基本変数定義
    var x = 0;  //左上の頂点x座標
    var y = 0;  //左上の頂点y座標
    var w = 800;  //横の長さ
    var h = 500;  //縦の長さ
    var r = 150;  //角丸の半径
    var color = "#378E1D";  //塗りつぶし色

    reset();

    function reset() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawsq(x, y, w, h, r, color);
    }

    function drawsq(x,y,w,h,r,color) {
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


      var cw = 60;
      var ch = 90;

      var img = new Image();
      img.src = "./cards/c01.gif";
      img.onload = function() {
        context.drawImage(img, 10, 100, cw, ch);
        context.drawImage(img, 75, 100, cw, ch);

        context.drawImage(img, 10, 230, cw, ch);
        context.drawImage(img, 75, 230, cw, ch);

        context.drawImage(img, 95, 380, cw, ch);
        context.drawImage(img, 160, 380, cw, ch);

        context.drawImage(img, 255, 380, cw, ch);
        context.drawImage(img, 320, 380, cw, ch);

        context.drawImage(img, 415, 380, cw, ch);
        context.drawImage(img, 480, 380, cw, ch);

        context.drawImage(img, 575, 380, cw, ch);
        context.drawImage(img, 640, 380, cw, ch);

        context.drawImage(img, 665, 100, cw, ch);
        context.drawImage(img, 730, 100, cw, ch);

        context.drawImage(img, 665, 230, cw, ch);
        context.drawImage(img, 730, 230, cw, ch);


        context.drawImage(img, 490, 170, cw, ch);
        context.drawImage(img, 490-(cw+5), 170, cw, ch);
        context.drawImage(img, 490-(cw+5)*2, 170, cw, ch);
        context.drawImage(img, 490-(cw+5)*3, 170, cw, ch);
        context.drawImage(img, 490-(cw+5)*4, 170, cw, ch);
      }

    }
  }
};


