(function () {
	'use strict';

	let Menu = window.Menu;

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		data: {
			title: 'SINGLE PAGE APPLICATION',
			items: [
				{
					href: 'https://vk.com',
					anchor: 'vk.com'
				},
				{
					href: 'https://ok.ru',
					anchor: 'ok.ru'
				},
				{
					href: 'https://yahoo.com',
					anchor: 'yahoo.com'
				},
				{
					href: 'https://yandex.ru',
					anchor: 'yandex.ru'
				}
			]
		}
	});

	menu.el.addEventListener('remove', function (event) {
		debugger;
	});


	menu.el.addEventListener('pick', function (event) {
		debugger;
	});

	window.menu = menu;

})();