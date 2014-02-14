( function ( $ ) {
	'use strict';

	var CLOSE           = 'close';
	var OPEN            = 'open';
	var sContainerClass = 'slide-div';

	/**
	 * ToggleSlide component UI
	 * @constructor
	 * @class  ToggleSlide
	 * @param {Object} eController Element controller of this component
	 * @param {Object} options     JSON object for setting this component's options
	 */
	function ToggleSlide( eController, options ) {
		this.$element       = $( eController );
		this.$eContainerDiv = null;

		this.options       = $.extend( {}, $.fn.slideToggle.defaults, options );
		this.init();
		this.setState();
		this.setContainerCss();
	}

	/**
	 * Init component UI and Div container
	 * @method  init
	 */
	ToggleSlide.prototype.init = function () {
		this.$element.after( '<div class=' + sContainerClass + '> </div>' );

		//get div, apply simple css
		this.$eContainerDiv = this.$element.next( '.' + sContainerClass );
		this.$eContainerDiv.css( {
			'moz-border-radius'     : '10px',
			'-webkit-border-radius' : '10px',
			'border-radius'         : '10px',
			'border'                : '1px',
			'width'                 : '100%',
			'height'                : '100px',
			'background-color'      : '#DDFAD7'
		} );
	};

	/**
	 * Set close and open state
	 * @method  setState
	 */
	ToggleSlide.prototype.setState = function () {

		var eDiv = this.$eContainerDiv;
		//initial state
		if ( !this.options.initstate ||
			( this.options.initstate === CLOSE ) ) {
			//eDiv.slideUp(1);
			eDiv.hide();
			eDiv.addClass( CLOSE );
		} else {
			eDiv.show();
			eDiv.addClass( OPEN );
		}

		var _op = this.options;
		var _this = this;

		this.$element.on( 'click', function ( evt ) {

			evt.preventDefault();
			if ( eDiv.hasClass( CLOSE ) ) {

				eDiv.slideDown( {
					duration : _op.duration,
					complete : _this.complete( _op.callback ),
					start    : _op.start,
					done     : _op.done,
					fail     : _op.fail
				} );

				//toggle class
				eDiv.removeClass( CLOSE );
				eDiv.addClass( OPEN );

			} else {

				eDiv.slideUp( {
					duration : _op.duration,
					complete : _this.complete( _op.callback ),
					start    : _op.start,
					done     : _op.done,
					fail     : _op.fail
				} );

				//toggle class
				eDiv.removeClass( OPEN );
				eDiv.addClass( CLOSE );
			}
		} );
	};

	/**
	 * Set div container css
	 * @method  setContainerCss
	 */
	ToggleSlide.prototype.setContainerCss = function () {
		//override css
		this.$eContainerDiv.css( this.options.containercss );
	};

	/**
	 * Function invoke render complete
	 * @param  {Function} callback Callback function will return the reference of Div Container
	 */
	ToggleSlide.prototype.complete = function ( callback ) {
		callback( this.$eContainerDiv );
	};

	//refer to option's description in this link https://api.jquery.com/slideDown/
	/**
	 * slideToggle Jquery component
	 * @constructor
	 * @class slideToggle
	 * @param  {Object} options JSON objects containing the options
	 */
	$.fn.customSlideToggle = function ( options ) {
		return this.each( function () {
			$( this ).data( 'customSlideToggle', new ToggleSlide( this, options ) );
		} );
	};

	//defaults
	$.fn.customSlideToggle.defaults = {
		initstate    : CLOSE,
		containercss : {},
		duration     : 400,
		callback     : function () {},
		start        : function () {},
		done         : function () {},
		fail         : function () {}
	};

}( jQuery ) );