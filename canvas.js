var signaturePad;
var undoStack = [];
var redoStack = [];

// On Document Load initialize everything
$(document).ready(function () {
  // Setting the image to be used as background
  var image = document.createElement('img');
  image.src = "https://sihrc.github.io/samples/9.jpg";
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    init(image.width, image.height);
    context.drawImage(image, 0, 0);
  };
  setupButtons();
});

var setupButtons = function setupButtons() {
  $('#undo').click(function (e) {
    e.preventDefault();

    var data = undoStack.pop();
    redoStack.push(data);

    signaturePad.fromDataURL(data);
  });

  $('#redo').click(function (e) {
    e.preventDefault();

    var data = redoStack.pop();
    undoStack.push(data);

    signaturePad.fromDataURL(data);
  });

  $('#save').click(function (e) {
    e.preventDefault();
    console.log(signaturePad.toDataURL());
  });
};

// Prepare for HTML5 Canvas Scripting
function init(canvasWidth, canvasHeight) {
  var canvasDiv = document.getElementById('draw-card-canvas');
  canvas = document.createElement('canvas');

  // Set Canvas Attributes
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('id', 'canvas');

  // Add canvas to existing div
  canvasDiv.appendChild(canvas);

  // Check to initialize canvas
  if (typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }


  context = canvas.getContext("2d");
  signaturePad = new SignaturePad(canvas);

  undoStack.push(signaturePad.toDataURL());

  signaturePad.onEnd = function () {
    undoStack.push(signaturePad.toDataURL());
    if (undoStack.length > 10) {
      undoStack.shift();
    }
  };
}
