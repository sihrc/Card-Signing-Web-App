var handwriting;
var canvas;

var previousOrientation;
var viewPortWidth;
var viewPortHeight;

var undoStack = [];
var redoStack = [];

function previewFile() {
  var file = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader = new FileReader();

  reader.onloadend = function () {
    var image = document.getElementById('canvas-background');
    image.src = reader.result;

    image.onload = function () {
      if (canvas)
        document.getElementById('draw-card-canvas').removeChild(canvas);

      var scaleX = viewPortWidth / image.width;
      var scaleY = viewPortHeight / image.height;
      var scaleFactor = scaleX > scaleY ? scaleY : scaleX;

      var newWidth = image.width * scaleFactor;
      var newHeight = image.height * scaleFactor;
      image.width = newWidth;
      image.height = newHeight;
      init(newWidth, newHeight);

      $('.button-tool').css('visibility', 'visible');
    };
  }

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  }
}

function setupButtons() {
  $('#undo').click(function (e) {
    if (undoStack.length == 0)
      return;

    e.preventDefault();
    redoStack.push(undoStack.pop());

    if (undoStack.length > 0)
      handwriting.fromDataURL(undoStack[undoStack.length - 1]);
    else
      handwriting.clear();
  });

  $('#redo').click(function (e) {
    if (redoStack.length == 0) {
      return;
    }
    e.preventDefault();

    var data = redoStack.pop();
    undoStack.push(data);
    handwriting.fromDataURL(data);
  });

  $('#save').click(function (e) {
    e.preventDefault();
    $('.output').remove();
    // PNG
    var png = handwriting.toDataURL().replace(/^data:image\/[^;]/, 'data:application/octet-stream');
     $('#buttons').append($("<a class='output' download='output.png' href='" + png + "' title='output.png'><button class='btn btn-default button-tool' style='visibility: visible;'>PNG</button></a>"));

    // SVG
    var svg = "data:application/octet-streamng;base64," + btoa(unescape(encodeURIComponent(handwriting.toSVG())));
     $('#buttons').append($("<a class='output' download='output.svg' href='" + svg + "' title='output.svg'><button class='btn btn-default button-tool' style='visibility: visible;'>SVG</button></a>"));
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

  handwriting = new Handwriting(canvas);

  handwriting.onEnd = function () {
    redoStack.length = 0;
    undoStack.push(handwriting.toDataURL());
    if (undoStack.length > 10) {
      undoStack.shift();
    }
  };
}

function getViewport() {
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth;
    viewPortHeight = document.documentElement.clientHeight;
  }

  // older versions of IE
  else {
    viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
    viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
  }

  return [viewPortWidth, viewPortHeight];
}

var checkOrientation = function () {
  if (window.orientation !== previousOrientation) {
    previousOrientation = window.orientation;
    // orientation changed, do your magic here
    getViewport();
  }
};


// (optional) Android doesn't always fire orientationChange on 180 degree turns
setInterval(checkOrientation, 2000);
// On Document Load initialize everything
$(document).ready(function () {
  setupButtons();
  getViewport();

  previousOrientation = window.orientation;

  window.addEventListener("resize", checkOrientation, false);
  window.addEventListener("orientationchange", checkOrientation, false);
});
