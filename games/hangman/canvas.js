const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* Function that draws the gallows. */
function gallows() {
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(225, 100);
  ctx.lineTo(225, 30);
  ctx.lineTo(375, 30);
  ctx.lineTo(375, 375);
  ctx.lineTo(475, 375);
  ctx.lineTo(275, 375);
  ctx.stroke();
}

/* This function counts down for every incorrect guess
and draws the corresponding piece. */
function draw() {
  switch (guessCount) {
    case 8:
      // Drawing the head
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(225, 150, 25, 0, 2 * Math.PI);
      ctx.stroke();
      break;
    case 7:
      // Drawing the face
      ctx.beginPath();
      ctx.arc(225, 155, 15, 0, 1 * Math.PI);
      ctx.moveTo(214, 143);
      ctx.lineTo(215, 143);
      ctx.moveTo(233, 143);
      ctx.lineTo(234, 143);
      ctx.moveTo(225, 153);
      ctx.lineTo(225, 155);
      ctx.stroke();
      break;
    case 6:
      // Drawing the body
      ctx.beginPath();
      ctx.moveTo(225, 175);
      ctx.lineTo(225, 260);
      ctx.stroke();
      break;
    case 5:
      // Drawing the left arm
      ctx.beginPath();
      ctx.moveTo(225, 225);
      ctx.lineTo(190, 190);
      ctx.stroke();
      break;
    case 4:
      // Drawing the right arm
      ctx.beginPath();
      ctx.moveTo(225, 225);
      ctx.lineTo(260, 190);
      ctx.stroke();
      break;
    case 3:
      // Drawing the left leg
      ctx.beginPath();
      ctx.moveTo(225, 260);
      ctx.lineTo(200, 285);
      ctx.stroke();
      break;
    case 2:
      // Drawing the right leg
      ctx.beginPath();
      ctx.moveTo(225, 260);
      ctx.lineTo(250, 285);
      ctx.stroke();
      break;
    case 1:
      // Drawing the death
      ctx.clearRect(190, 120, 71, 105);
      ctx.beginPath();
      ctx.arc(198, 180, 25, 0, 2 * Math.PI);
      ctx.moveTo(185, 165);
      ctx.lineTo(190, 170);
      ctx.moveTo(185, 170);
      ctx.lineTo(190, 165);
      ctx.moveTo(185, 195);
      ctx.lineTo(190, 190);
      ctx.moveTo(185, 190);
      ctx.lineTo(190, 195);
      ctx.moveTo(198, 180);
      ctx.lineTo(200, 180);
      ctx.moveTo(210, 170);
      ctx.lineTo(210, 190);
      ctx.moveTo(225, 179);
      ctx.lineTo(225, 225);
      ctx.lineTo(235, 265);
      ctx.moveTo(225, 225);
      ctx.lineTo(215, 265);
      ctx.stroke();

      // Drawing the noose
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'tan';
      ctx.moveTo(222, 179);
      ctx.lineTo(228, 179);
      ctx.moveTo(225, 179);
      ctx.lineTo(225, 100);
      ctx.stroke();
      break;
    default:
      break;
  }
}