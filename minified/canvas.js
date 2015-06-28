function previewFile(){var t=document.querySelector("input[type=file]").files[0],e=new FileReader;e.onloadend=function(){var t=document.getElementById("canvas-background");t.src=e.result,t.setAttribute("crossOrigin","anonymous"),t.onload=function(){canvas&&document.getElementById("draw-card-canvas").removeChild(canvas);var e=viewPortWidth/t.width,n=viewPortHeight/t.height,i=e>n?n:e,a=t.width*i,o=t.height*i;t.width=a,t.height=o,init(a,o),$(".button-tool").css("visibility","visible")}},t&&e.readAsDataURL(t)}function setupButtons(){$("#undo").click(function(t){0!=undoStack.length&&(t.preventDefault(),redoStack.push(undoStack.pop()),undoStack.length>0?handwriting.fromDataURL(undoStack[undoStack.length-1]):handwriting.clear())}),$("#redo").click(function(t){if(0!=redoStack.length){t.preventDefault();var e=redoStack.pop();undoStack.push(e),handwriting.fromDataURL(e)}}),$("#save").click(function(t){t.preventDefault();var e=handwriting.toDataURL().replace(/^data:image\/[^;]/,"data:application/octet-stream");window.open(e)})}function init(t,e){var n=document.getElementById("draw-card-canvas");canvas=document.createElement("canvas"),canvas.setAttribute("width",t),canvas.setAttribute("height",e),canvas.setAttribute("id","canvas"),n.appendChild(canvas),"undefined"!=typeof G_vmlCanvasManager&&(canvas=G_vmlCanvasManager.initElement(canvas)),context=canvas.getContext("2d"),handwriting=new Handwriting(canvas),handwriting.onEnd=function(){redoStack.length=0,undoStack.push(handwriting.toDataURL()),undoStack.length>10&&undoStack.shift()}}function getViewport(){return"undefined"!=typeof window.innerWidth?(viewPortWidth=window.innerWidth,viewPortHeight=window.innerHeight):"undefined"!=typeof document.documentElement&&"undefined"!=typeof document.documentElement.clientWidth&&0!=document.documentElement.clientWidth?(viewPortWidth=document.documentElement.clientWidth,viewPortHeight=document.documentElement.clientHeight):(viewPortWidth=document.getElementsByTagName("body")[0].clientWidth,viewPortHeight=document.getElementsByTagName("body")[0].clientHeight),[viewPortWidth,viewPortHeight]}var handwriting,canvas,previousOrientation,viewPortWidth,viewPortHeight,undoStack=[],redoStack=[],checkOrientation=function(){window.orientation!==previousOrientation&&(previousOrientation=window.orientation,getViewport())};setInterval(checkOrientation,2e3),$(document).ready(function(){setupButtons(),getViewport(),previousOrientation=window.orientation,window.addEventListener("resize",checkOrientation,!1),window.addEventListener("orientationchange",checkOrientation,!1)});