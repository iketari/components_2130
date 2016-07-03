(function() {
	'use strict';

	/**
	 * @class Menu
	 * Компонента "Меню"
	 */
	class Menu {

		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor(opts) {
			this.el = opts.el;
			this.list = this.el.querySelector('.menu__list');

			this._initEvents();
		}

		/**
		* Удаления элемента меню
		* @param  {HTMLElement} item
		*/
		removeItem(item) {
			let index = parseInt(item.parentNode.dataset.index, 10);

			this.trigger('remove', {
				index
			});

			this.list.removeChild(item.parentNode);
		}

		/**
		* Выбор элемента меню
		* @param  {HTMLElement} item
		*/
		pickItem(item) {
			this.trigger('pick', {
				href: item.getAttribute('href'),
				anchor: item.textContent
			});
		}

		/**
		* Развешиваем события
		*/
		_initEvents() {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		/**
		* Клик в любую область меню
		* @param  {Event} event
		*/
		_onClick(event) {
			event.preventDefault();
			let item = event.target;

			switch (item.dataset.action) {
				case 'remove':
				this.removeItem(item);
				break;

				case 'pick':
				this.pickItem(item);
				break;
			}
		}

		/**
		* Сказать миру о случившемся
		* @param {string} type тип события
		* @param {Object} data объект события
		*/
		trigger () {
			console.log(...arguments);
		}


	}

	// Export
	window.Menu = Menu;
})(window);