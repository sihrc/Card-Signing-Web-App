var signaturePad;
var canvas;
var undoStack = [];
var redoStack = [];

function previewFile() {
  var file = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader = new FileReader();

  reader.onloadend = function () {
    var image = document.createElement('img');
    image.src = reader.result;
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
      if (canvas)
        document.getElementById('draw-card-canvas').removeChild(canvas);
      init(image.width, image.height);
      context.drawImage(image, 0, 0);
      undoStack.push(signaturePad.toDataURL());
    };
  }

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  } else {
    preview.src = "";
  }
}

function setupButtons() {
  $('#undo').click(function (e) {
    if (undoStack.length == 0)
      return;

    e.preventDefault();

    redoStack.push(undoStack.pop());

    if (undoStack.length > 0)
      signaturePad.fromDataURL(undoStack[undoStack.length - 1]);
    else
      signaturePad.clear();
  });

  $('#redo').click(function (e) {
    if (redoStack.length == 0) {
      return;
    }
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

  signaturePad.onEnd = function () {
    undoStack.push(signaturePad.toDataURL());
    if (undoStack.length > 10) {
      undoStack.shift();
    }
  };
}

// On Document Load initialize everything
$(document).ready(function () {
  setupButtons();
});
