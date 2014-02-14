toggle-functionality
====================

###About Slide Toggle###
**A custom jquery component which wraps _slideDown_ and _slideUp_ jquery functionality. This custom component exposes the following _slideDown_ and _slideUp_ jquery options:**

```
duration : options.duration
complete : options.callback
start 	 : options.start
done		 : options.done
fail 		 : options.fail

```

###How to call the plugin###

```
 $({selector}).customSlideToggle(
 		{options}
 );

```

###Option Defaults###

```
		initstate    : 'close,
		containercss : {},
		duration     : 400,
		callback     : function () {},
		start        : function () {},
		done         : function () {},
		fail         : function () {}

```

###Example call for callback###

```
	function writeToDiv ( eDiv ) {
		eDiv.html( "Writing to div" );
	};

	$("a").customSlideToggle({
		callback 	: writeToDiv,
		duration 	: 500
		initstate : 'open'
	});
```