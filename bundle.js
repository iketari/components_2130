/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _menu = __webpack_require__(1);

	var _menu2 = _interopRequireDefault(_menu);

	var _form = __webpack_require__(3);

	var _form2 = _interopRequireDefault(_form);

	var _model = __webpack_require__(4);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var model = new _model2.default({
		resource: 'menu',
		id: '-KIIIl-A1w7peqCRVZ0R'
	}); //import


	var menu = new _menu2.default({
		el: document.querySelector('.js-menu'),
		tmpl: '#menu'
	});

	var form = new _form2.default({
		el: document.querySelector('.js-form'),
		tmpl: '#form'
	});

	menu.el.addEventListener('remove', function (event) {
		menu.removeItem(event.detail);
	});

	form.el.addEventListener('add', function (event) {
		menu.addItem(event.detail);
		model.setData(menu.data);
		model.save();
	});

	model.fetch(menu.render.bind(menu));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import


	var _templateEngine = __webpack_require__(2);

	var _templateEngine2 = _interopRequireDefault(_templateEngine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class Menu
	 * Компонента "Меню"
	 */

	var Menu = function () {

		/**
	  * @constructor
	  * @param  {Object} opts
	  */

		function Menu(opts) {
			_classCallCheck(this, Menu);

			this.el = opts.el;
			this.data = opts.data;
			this._template = document.querySelector(opts.tmpl).innerHTML;

			// this.render();
			this._initEvents();
		}

		/**
	  * Добавляем элемент меню
	  * @param {Object} item
	  */


		_createClass(Menu, [{
			key: 'addItem',
			value: function addItem(item) {
				this.data.items.push(item);
				this.render();
			}

			/**
	   * Удаляем пункт меню из данных
	   * @param  {Object} removedItem
	   */

		}, {
			key: 'removeItem',
			value: function removeItem(removedItem) {
				this.data.items = this.data.items.filter(function (item, index) {
					return index !== removedItem.index;
				});
				this.render();
			}

			/**
	   * Создаем HTML
	   * @param {Object} data
	   */

		}, {
			key: 'render',
			value: function render(data) {
				if (data) {
					this.data = data;
				}

				this.el.innerHTML = (0, _templateEngine2.default)(this._template, this.data);
			}

			/**
	  * Удаления элемента меню
	  * @param  {HTMLElement} item
	  * @private
	  */

		}, {
			key: '_onRemoveClick',
			value: function _onRemoveClick(item) {
				var index = parseInt(item.parentNode.dataset.index, 10);

				this.trigger('remove', {
					index: index
				});
			}

			/**
	  * Выбор элемента меню
	  * @param  {HTMLElement} item
	  */

		}, {
			key: 'pickItem',
			value: function pickItem(item) {
				this.trigger('pick', {
					href: item.getAttribute('href'),
					anchor: item.textContent
				});
			}

			/**
	  * Развешиваем события
	  */

		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('click', this._onClick.bind(this));
			}

			/**
	  * Клик в любую область меню
	  * @param {Event} event
	  * @private
	  */

		}, {
			key: '_onClick',
			value: function _onClick(event) {
				event.preventDefault();
				var item = event.target;

				switch (item.dataset.action) {
					case 'remove':
						this._onRemoveClick(item);
						break;

					case 'pick':
						this.pickItem(item);
						break;
				}
			}

			/**
	  * Сообщение миру о случившемся
	  * @param {string} name тип события
	  * @param {Object} data объект события
	  */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				var widgetEvent = new CustomEvent(name, {
					bubbles: true,
					detail: data
				});

				this.el.dispatchEvent(widgetEvent);
			}
		}]);

		return Menu;
	}();

	// Export


	exports.default = Menu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var templateEngine = function templateEngine(html, options) {
		var re = /<%([^%>]+)?%>/g,
		    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
		    code = 'var r=[];\n',
		    cursor = 0,
		    match;
		var add = function add(line, js) {
			js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' : code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
			return add;
		};
		while (match = re.exec(html)) {
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code += 'return r.join("");';
		return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
	};

	//export
	exports.default = templateEngine;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import


	var _templateEngine = __webpack_require__(2);

	var _templateEngine2 = _interopRequireDefault(_templateEngine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class Form
	 * Компонента "Форма"
	 */

	var Form = function () {

		/**
	  * @constructor
	  * @param  {Object} opts
	  */

		function Form(opts) {
			_classCallCheck(this, Form);

			this.el = opts.el;
			this.data = opts.data;
			this._template = document.querySelector(opts.tmpl).innerHTML;

			this.render();
			this._initEvents();
		}

		/**
	  * Создаем HTML
	  */


		_createClass(Form, [{
			key: 'render',
			value: function render() {
				this.el.innerHTML = (0, _templateEngine2.default)(this._template, this.data);
			}

			/**
	   * Получение элемента формы по имени
	   * @param  {string} name
	   * @return {HTMLElement}
	   */

		}, {
			key: 'getField',
			value: function getField(name) {
				return this.el.querySelector('[name="' + name + '"]');
			}

			/**
	  * Сообщение миру о случившемся
	  * @param {string} name тип события
	  * @param {Object} data объект события
	  */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				var widgetEvent = new CustomEvent(name, {
					bubbles: true,
					detail: data
				});

				this.el.dispatchEvent(widgetEvent);
			}

			/**
	  * Развешиваем события
	  */

		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('submit', this._onSubmit.bind(this));
			}

			/**
	  * Отправка данных формы
	  * @param {Event} event
	  * @private
	  */

		}, {
			key: '_onSubmit',
			value: function _onSubmit(event) {
				event.preventDefault();

				this.trigger('add', {
					href: this.getField('href').value,
					anchor: this.getField('anchor').value
				});

				event.target.reset();
			}
		}]);

		return Form;
	}();

	//export


	exports.default = Form;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BASE_URL = 'https://javascriptru.firebaseio.com';

	/**
	 * Модель данных меню
	 * @class Model
	 */

	var Model = function () {

		/**
	  * Конструктор модели
	  * @param  {Objcet} options
	  * @param  {string} options.url
	  */

		function Model(_ref) {
			var resource = _ref.resource;
			var id = _ref.id;
			var _ref$data = _ref.data;
			var data = _ref$data === undefined ? {} : _ref$data;

			_classCallCheck(this, Model);

			this.data = data;
			this.resource = resource;
			this.id = id;
		}

		/**
	  * Геттер для данных модели
	  * @return {Object}
	  */


		_createClass(Model, [{
			key: 'getData',
			value: function getData() {
				return this.data;
			}

			/**
	   * Сеттер для данных модели
	   * @param {Object} data
	   */

		}, {
			key: 'setData',
			value: function setData(data) {
				this.data = data;
			}

			/**
	   * Загрузка данных с сервера
	   * @param  {Function} resolve
	   * @return {XMLHttpRequest}
	   */

		}, {
			key: 'fetch',
			value: function fetch(resolve) {
				var _this = this;

				var req = this._makeRequest('GET', function (req) {
					var data = _this.parse(req.responseText);
					_this.data = data;

					resolve(_this.getData());
				});

				req.send();

				return req;
			}

			/**
	   * Сохранение данных на сервере
	   * @param  {Function} resolve
	   * @return {XMLHttpRequest}
	   */

		}, {
			key: 'save',
			value: function save(resolve) {
				var _this2 = this;

				var req = this._makeRequest('PUT', function (req) {
					var data = _this2.parse(req.responseText);
					_this2.data = data;

					resolve(_this2);
				});

				var reqString = JSON.stringify(this.getData());
				req.send(reqString);

				return req;
			}

			/**
	   * Создание объекта запроса
	   * @param {string} method - HTTP method
	   * @param {Function} success - callback
	   * @return {XMLHttpRequest}
	   */

		}, {
			key: '_makeRequest',
			value: function _makeRequest(method, success) {
				var xhr = new XMLHttpRequest();
				var url = this._getUrl(method);

				xhr.open(method, url, false);

				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) return;

					if (xhr.status !== 200) {
						//TODO: обаботать ошибки запроса
					} else {
						success(xhr);
					}
				};

				return xhr;
			}

			/**
	   * Выбор URL в зависимости от метода
	   * @param  {string} [method]
	   * @return {string}
	   */

		}, {
			key: '_getUrl',
			value: function _getUrl() {
				var url = BASE_URL + '/' + this.resource;

				if (this.id) {
					url += '/' + this.id;
				}

				return url + '.json';
			}

			/**
	   * Преобразлвание тескта отвева в данные
	   * @param {string} responseText
	   * @return {Object}
	   */

		}, {
			key: 'parse',
			value: function parse(responseText) {
				return JSON.parse(responseText);
			}
		}]);

		return Model;
	}();

	//export


	exports.default = Model;

/***/ }
/******/ ]);
