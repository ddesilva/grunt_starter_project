/*!
 *    ## Sample Require.js Application
 *	
 */

require({
	paths : {
		'ajax-content-loader' : 'modules/ajax-content-loader',
		'helper-functions'    : 'modules/helper-functions',
		'youtube-helper'      : 'modules/youtube-helper',
		'order'               : 'libs/order',
		'config-pages'        : 'pages',
	},
	urlArgs : 'v=testing-dev'
}, [
	'order!ajax-content-loader',
	'order!helper-functions',
	'order!youtube-helper',
	'order!config-pages'
], function() {

	
	var Core = {
		/*!
		 *
		 * @function init
		 */
		init : function() {
			// Create a jQuery object for the window and document objects
			this.win            = $(window);
			this.doc            = $(document);

		}


	}


});