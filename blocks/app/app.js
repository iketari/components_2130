(function () {
	'use strict';

	//import
	let Menu = window.Menu;
	let Form = window.Form;
	let Model = window.Model;

	let model = new Model({
		resource: 'menu',
		id: '-KIIIl-A1w7peqCRVZ0R'
	});

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		tmpl: '#menu',
	});

	let form = new Form({
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

	window.menu = menu;

})();
