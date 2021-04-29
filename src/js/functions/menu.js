// Dummy code ------- can remove

export const greeting = () => {
	console.log('hello you ');
};

export const toggleMenu = () => {
	const menuToggle = document.querySelector('.header__toggle');
	const overlay = document.querySelector('.overlay');
	menuToggle.addEventListener('click', () => {
		if (overlay.classList.contains('hide')) {
			overlay.classList.remove('hide');
			overlay.classList.add('show');
		} else {
			overlay.classList.remove('show');
			overlay.classList.add('hide');
		}
	});
};
