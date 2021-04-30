import waitFor from './waitFor';

export const bookEvents = () => {
	console.log('book events');

	// check if books have loaded in

	// Wait for function used to wait for API data to be loaded in and added into the DOM before executing code
	waitFor([ '.book-item' ], () => {
		// Select all books in an array using a spread operator
		const allBooks = [ ...document.querySelectorAll('.book-item') ];

		// loop through all book
		for (const books of allBooks) {
			const title = books.querySelector('h3');

			// check localstorage
			// If local storage has the title of the book then add class
			if (localStorage.getItem(title.textContent)) {
				books.classList.add('is-selected');
			} else {
				books.classList.remove('is-selected');
			}

			// add click event listener
			books.addEventListener('click', () => {
				if (!books.classList.contains('is-selected')) {
					books.classList.add('is-selected');
					localStorage.setItem(title.textContent, true);
				} else {
					books.classList.remove('is-selected');
					localStorage.removeItem(title.textContent);
				}
			});
		}
	});
};
