(function() {
	'use strict';

	var TemplateEngine = function(html, options) {
		var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
		var add = function(line, js) {
			js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
				(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
			return add;
		}
		while(match = re.exec(html)) {
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code += 'return r.join("");';
		return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
	}

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
			this.data = opts.data;

			this.render();

			this.list = this.el.querySelector('.menu__list');
			this.title = this.el.querySelector('.menu__title');

			this._initEvents();
		}

		/**
		 * Теперь умнее!
		 */
		render () {
			let _template = document.querySelector('#menu').innerHTML;
			this.el.innerHTML = TemplateEngine(_template, this.data);
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
		* @param {Event} event
		* @private
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
		* @param {string} name тип события
		* @param {Object} data объект события
		*/
		trigger (name, data) {
			let widgetEvent = new CustomEvent(name, {
		        bubbles: true,
		        detail: data
		      });

		    this.el.dispatchEvent(widgetEvent);
		}


	}

	// Export
	window.Menu = Menu;

})(window);