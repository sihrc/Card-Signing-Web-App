init(300, 300);

// Canvas Global Variables
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

// Colors
var COLOR_DEFAULT = "#000F55";

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    // Clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Setting the stroke attributes
    context.strokeStyle = COLOR_DEFAULT;
    context.lineJoin = "round";
    context.lineWidth = 3;

    // Drawing the saved paths
    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            var xc = (clickX[i - 1] + clickX[i]) / 2;
            var yc = (clickY[i - 1]  + clickY[i] ) / 2;
            context.quadraticCurveTo(clickX[i - 1], clickY[i - 1], xc, yc);
        } else {
            var xc = (clickX[i] + clickX[i + 1]) / 2;
            var yc = (clickY[i]  + clickY[i + 1] ) / 2;
            context.quadraticCurveTo(clickX[i] - 1, clickY[i], xc, yc);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

function setupClickListeners() {
    var $canvas = $("#canvas");
    if (!$canvas)
        console.log("error", "canvas was not initialized properly");

    $canvas.mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $canvas.mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function(e) {
        paint = false;
    });

    $('#canvas').mouseleave(function(e) {
        paint = false;
    });
}

// Prepare for HTML5 Canvas Scripting
function init(canvasWidth, canvasHeight) {
    var canvasDiv = document.getElementById('draw-card-canvas');
    var canvas = document.createElement('canvas');

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
    setupClickListeners();
}