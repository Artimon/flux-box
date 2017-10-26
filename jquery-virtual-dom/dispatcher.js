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
		/**
		 * @param {function} callback
		 */
		register: function (callback) {
			callbacks.push(callback);
		},

		/**
		 * @param {*} payload
		 */
		dispatch: function (payload) {
			$.each(callbacks, function (index, callback) {
				callback(payload);
			});
		}
	};

})($);
