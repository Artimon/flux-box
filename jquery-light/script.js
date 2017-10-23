/* global jQuery */

(function ($) {

	'use strict';

	$.fn.listView = function () {
		var view = new ListView(this);

		view.render();
	};

	/**
	 * @param {jQuery} $element
	 * @constructor
	 */
	function ListView($element) {
		this.$element = $element;
		this.items = []; // This represents the store.
	}

	/**
	 * This represents the dispatcher.
	 * Since the dispatcher is not application-wide in use, the action methods could do the job directly.
	 *
	 * External plugins could trigger payload-events when a listener is built calling the dispatcher.
	 *
	 * @param payload
	 */
	ListView.prototype.dispatch = function (payload) {
		switch (payload.eventName) {
			case 'new-item':
				this.items.push(payload.newItem);
				this.render();
				break;

			case 'clear-items':
				this.items = [];
				this.render();
				break;
		}
	};

	/**
	 * One of the actions methods.
	 *
	 * @param {{ name: string }} item
	 */
	ListView.prototype.actionAddItem = function (item) {
		this.dispatch({
			eventName: 'new-item',
			newItem: item
		});
	};

	/**
	 * One of the actions methods.
	 */
	ListView.prototype.actionClearItems = function () {
		this.dispatch({
			eventName: 'clear-items'
		});
	};

	/**
	 * A regular view method.
	 */
	ListView.prototype.createNewItem = function () {
		var value = this.$element.find('input').val() || 'Samantha';

		this.actionAddItem({ name: value });
	};

	/**
	 * The regular view render method.
	 */
	ListView.prototype.render = function () {
		var self = this,
			html;

		html = Mustache.render(`
				<div>
					<h3>List View</h3>
					<p>Flux is limited to the plugin itself here.</p>
					<p>Further addons would require adding events to trigger and the plugin to listen to them.</p>

					<ul class="list-group">
						{{#.}}
							<li class="list-group-item">{{name}}</li>
						{{/.}}
					</ul>

					<div class="form-group">
						<input type="text" class="form-control" placeholder="Enter something to add.">
					</div>

					<div class="form-group">
						<button type="button" class="btn btn-primary action-new">New Item</button>
						<button type="button" class="btn btn-default action-clear">Clear List</button>
					</div>
				</div>
			`, this.items);

		this.$element.html(html)
			.find('.action-new').on('click', function () {
			self.createNewItem();
		}).end()
			.find('.action-clear').on('click', function () {
			self.actionClearItems();
		});
	};

})(jQuery);
