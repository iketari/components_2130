function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function fillRandomColor(el) {
	el.style.backgroundColor = getRandomColor();
}

function onClick (event) {
	console.log('click on: ', event.target);
	console.log('hold on: ', event.currentTarget);

	if (event.target.tagName === 'DIV') {
		fillRandomColor(event.target);
	}
}

document.querySelector('.wrapper').addEventListener('click', onClick);



document.querySelector('.block').addEventListener('click', event => {
	event.stopPropagation();
});

