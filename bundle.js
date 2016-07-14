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

	var _form = __webpack_require__(10);

	var _form2 = _interopRequireDefault(_form);

	var _model = __webpack_require__(11);

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

	__webpack_require__(6);

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

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./menu.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, ".menu {\n\tpadding: 10px;\n}\n\n.menu__title {\n\tbackground-image: url(https://learn.javascript.ru/img/sitetoolbar__logo_small.svg);\n    background-position: 0px -9px;\n    background-repeat: no-repeat;\n\n\ttext-align: center;\n    font-size: 19px;\n    padding-left: 90px;\n}\n\n.close {\n  position: absolute;\n  right: 32px;\n  top: 0;\n  width: 32px;\n  height: 32px;\n  opacity: 0.3;\n  cursor: pointer;\n}\n.close:hover {\n  opacity: 1;\n}\n.close:before, .close:after {\n  position: absolute;\n  left: 15px;\n  content: ' ';\n  height: 33px;\n  width: 2px;\n  background-color: #333;\n}\n.close:before {\n  transform: rotate(45deg);\n}\n.close:after {\n  transform: rotate(-45deg);\n}\n\n.pure-menu-item .close {\n  display: none;\n}\n\n.pure-menu-item:hover .close {\n  display: block;\n}\n", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
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
/* 11 */
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