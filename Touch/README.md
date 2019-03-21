# Touch.js
Touch.js is a simple javascript module to handle touch gestures by attaching and firing a custom event trigger based on position with an optional buffer.
Default buffer is 100. For position based events like swipe right and swipe left, the buffer is measured in pixels but the optionalBuffer is unit-less.
For time based gestures like tap and hold the time is measured in milliseconds but optionalBuffer is unit-less.


Usage:
```javascript
Touch.bind('swiperight', $container, optionalBuffer);
$container.on('swiperight', function(event){
    //do stuff
});
```

or if not using JQuery:
```javascript
Touch.bind('swiperight', HTMLElement, optionalBuffer);
HTMLElement.addEventListener('swiperight', function(event){
    //do stuff
});
```
