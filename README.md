# Blow Birthday Cards - card signing application
Currently hosted via gh-pages on [my website](https://chrisklee.me/Card-Signing-Web-App).

## Introduction ##
Uses bezier curvature algorithms to accurately approximate the style and appearance of authentic handwriting. The application allows the user to draw and write on a canvas overlaid above an existing image of a Blow Birthday Card, or any image uploaded from the user's local computer. Some additoinal capabilities are variable width based on stroke speed, variable pen width and color preset in code, and the ability to export the resulting strokes as a PNG or SVG.

## Architecture ##
The application has a bare minimum infrastructure.

`index.html` contains the markup for the user-facing application. The application was meant to be a proof of concept of the algorithms behind handwriting imitation. The interface is not intended to reflect real user needs and values. The current layout is purely for testing and internal use.

`canvas.js` contains the main javascript file associated with the application. It prepares all the elements of the application, which are the button bar, the carousel, and the canvas. Functionality of the button bar is specified in `canvas.js`. `canvas.js` also serves as an interface between the button bar and carousel / canvas functionality.

`handwriting.js` contains the canvas / SVG - PNG exporting functionality. It also houses the logic to approximate handwriting strokes as bezier curves. Most options involving appearance and behavior of the resulting image is determined in this file.

`libs/owl.carousel.min.js` is the javascript library used for the carousel of existing images to choose from and upload to. Files in libs should not be touched as they contained modularized functionality irrelevant to the core of this application.

`minified/*.js` are simply minified versions of the javascript produces for this application. These minified versions are served publicly and are meant to conceal the logic through obscurity.

`canvas.css` is the CSS style sheet for the application. It contains very minimal styling and mostly relies on the `owl.carousel.min.css` and `bootstrap` for visual styling.

## Deploying the application ##
To test the application, simply open `index.html` in a web browser. For best performance, locally host the website by exposing through `localhost` on an open port (i.e. 3000). [OSX](https://discussions.apple.com/docs/DOC-3083),  [Linux/Ubuntu](http://askubuntu.com/a/332079/309174), and [Windows](https://techawarey.wordpress.com/2012/09/23/host-a-local-web-site-on-your-windows-xp-windows-7-system/) or host [publicly](http://www.instructables.com/id/Set-up-your-very-own-Web-server/?ALLSTEPS)
