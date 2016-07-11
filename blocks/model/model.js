(function () {
	'use strict';

	class Model {
		constructor (opts) {
			this.data = opts.data || {};
			this.url = opts.url;
		}
	
		getData () {
			return this.data;
		}

		setData (data) {
			this.data = data;
		}

		/**
		 * Забрать данные с сервера
		 * @param  {Function} resolve
		 * @return {XMLHttpRequest}
		 */
		fetch (resolve) {
			let req = this._makeRequest('GET');

			req.onreadystatechange = () => {
				if (req.readyState !== 4) return;

				if (req.status === 200) {
					let dataString = req.responseText;
					this.setData(JSON.parse(dataString));
					resolve(this.getData());
				}
			}

			req.send();
		}

		/**
		 * Создане объекта запроса
		 * @param  {string} method
		 * @return {XHLHttpRequesr}
		 */
		_makeRequest (method) {
			let xhr = new XMLHttpRequest();

			xhr.open(method, this.url, true);

			return xhr;
		}
	}

	//export
	window.Model = Model;

})();