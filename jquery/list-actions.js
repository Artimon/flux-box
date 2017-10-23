/* global Dispatcher */

var ListActions = (function (Dispatcher) {

	'use strict';

	return {
		add: function (item) {
			Dispatcher.dispatch({
				eventName: 'new-item',
				newItem: item
			});
		},
		clear: function () {
			Dispatcher.dispatch({
				eventName: 'clear-items'
			});
		}
	};

})(Dispatcher);
