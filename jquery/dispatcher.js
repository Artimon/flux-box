/* global $ */

var Dispatcher = (function ($) {

	'use strict';

	var callbacks = [];

	/**
	 * The dispatcher only exists to send messages from views to stores.
	 *
	 * @type {{}}
	 */
	return {
		register: function (callback) {
			callbacks.push(callback);
		},
		dispatch: function (payload) {
			$.each(callbacks, function (index, callback) {
				callback(payload);
			});
		}
	};

})($);
