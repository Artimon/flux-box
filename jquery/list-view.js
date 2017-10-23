/* global $, Mustache, ListStore, ListActions */

(function ($, Mustache, ListStore, ListActions) {

	'use strict';

	$.fn.listView = function () {
		var view = new ListView(this);

		view.mount();
		view.render();

		this.on('remove', function () {
			view.unmount();
		});
	};

	/**
	 * @param {jQuery} $element
	 * @constructor
	 */
	function ListView($element) {
		this.$element = $element;
	}

	ListView.prototype.mount = function() {
		ListStore.bind('change', this.render.bind(this));
	};

	ListView.prototype.unmount = function () {
		ListStore.unbind('change');
	};

	ListView.prototype.render = function () {
		var self = this,
			html;

		html = Mustache.render(`
				<div>
					<h3>List View</h3>
					<p>Uses a store, actions and a jQuery-based view to apply Flux.</p>
					<p>Further views may listen to the same events or trigger them.</p>

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
			`, ListStore.items);

		this.$element.html(html)
			.find('.action-new').on('click', function () {
				self.createNewItem();
			}).end()
			.find('.action-clear').on('click', function () {
				ListActions.clear();
			});
	};

	ListView.prototype.createNewItem = function () {
		var value = this.$element.find('input').val() || 'Samantha';

		ListActions.add({ name: value });
	};

})($, Mustache, ListStore, ListActions);
