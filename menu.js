'use strict';

class Menu {
	constructor(options) {
		this.el = options.el;
		this.list = this.el.querySelector('.menu__list');

		this._initEvents();
	}

	_initEvents () {
		this.el.addEventListener('click', this._onClick.bind(this));
	}

	_onClick (event) {
		// let isItemClick = false;

		if (event.target.classList.contains('menu__item')) {
			// isItemClick = true;
			this._onItemClick(event);
		}

		if (event.target.classList.contains('item__close-button')) {
			this._closeButtonClick(event);
		}

		if (event.target.classList.contains('menu__title')) {
			this._hideMenu(event);
		}

		// if (!isItemClick) {
		// 	this.list.hidden = !this.list.hidden;
		// }
	}

	_onItemClick (event) {
		console.log('Click on item', event.target);
	}

	_closeButtonClick(event) {
		console.log('Remove item', event.target.parentNode);

		event.target.parentNode.remove();
	}

	_hideMenu (event) {
		this.list.hidden = !this.list.hidden;
	}

}