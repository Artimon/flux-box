/* global MicroEvent, Dispatcher */

var ListStore = (function (MicroEvent, Dispatcher) {

	'use strict';

	/**
	 * A store is not a model. A store contains models.
	 *
	 * Only the store knows how to update data. This is the most important part of Flux.
	 * Hence only stores are allowed to register dispatcher callbacks.
	 *
	 * Stores are singletons.
	 */
	var ListStore = {
		items: []
	};

	MicroEvent.mixin(ListStore);

	/**
	 * The store emits an event, but not using the dispatcher.
	 * Our view only cares that something changed.
	 *
	 * @param {{ eventName: string, newItem: {}}} payload
	 */
	Dispatcher.register(function (payload) {
		switch (payload.eventName) {
			case 'new-item':
				ListStore.items.push(payload.newItem);
				ListStore.trigger('change');
				break;

			case 'clear-items':
				ListStore.items = [];
				ListStore.trigger('change');
				break;
		}
	});

	return ListStore;

})(MicroEvent, Dispatcher);
