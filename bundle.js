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

	var _form = __webpack_require__(6);

	var _form2 = _interopRequireDefault(_form);

	var _model = __webpack_require__(7);

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

	var _menu = __webpack_require__(3);

	var _menu2 = _interopRequireDefault(_menu);

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

			console.time('_template');
			this._template = document.querySelector(opts.tmpl).innerHTML;
			console.timeEnd('_template');

			console.time('_templateJade');
			this._templateJade = _menu2.default;
			console.timeEnd('_templateJade');

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

				console.time('templateEngine()');
				this.el.innerHTML = (0, _templateEngine2.default)(this._template, this.data);
				console.timeEnd('templateEngine()');

				console.time('this._templateJade(this.data)');
				this.el.innerHTML = this._templateJade(this.data);
				console.timeEnd('this._templateJade(this.data)');
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

	var jade = __webpack_require__(4);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (items, title, undefined) {
	buf.push("<div class=\"pure-menu custom-restricted-width\"><span class=\"menu__title pure-menu-heading\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</span><ul class=\"pure-menu-list\">");
	// iterate items
	;(function(){
	  var $$obj = items;
	  if ('number' == typeof $$obj.length) {

	    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
	      var item = $$obj[index];

	buf.push("<li" + (jade.attr("data-index", index, true, true)) + " class=\"pure-menu-item\"><a data-action=\"pick\"" + (jade.attr("href", item.href, true, true)) + " class=\"pure-menu-link\">" + (jade.escape(null == (jade_interp = item.anchor) ? "" : jade_interp)) + "</a><i data-action=\"remove\" class=\"close\"></i></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var index in $$obj) {
	      $$l++;      var item = $$obj[index];

	buf.push("<li" + (jade.attr("data-index", index, true, true)) + " class=\"pure-menu-item\"><a data-action=\"pick\"" + (jade.attr("href", item.href, true, true)) + " class=\"pure-menu-link\">" + (jade.escape(null == (jade_interp = item.anchor) ? "" : jade_interp)) + "</a><i data-action=\"remove\" class=\"close\"></i></li>");
	    }

	  }
	}).call(this);

	buf.push("</ul></div>");}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) : val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? Object.keys(val).filter(function (key) {
	    return val[key];
	  }) : [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};

	exports.style = function (val) {
	  if (val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' + 'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' + 'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse) {
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i],
	          val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html) {
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str) {
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(5).readFileSync(filename, 'utf8');
	  } catch (ex) {
	    rethrow(err, null, lineno);
	  }
	  var context = 3,
	      lines = str.split('\n'),
	      start = Math.max(lineno - context, 0),
	      end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function (line, i) {
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
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
/* 7 */
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