export const displayBooks = async () => {
	console.log('display books');

	// Dynamically insert parent containers

	insertParentDivs();

	// API URL
	const url = `https://www.googleapis.com/books/v1/volumes?q=HTML5`;
	// Error handling
	try {
		// store book api
		const booksObj = await (await fetch(url)).json();

		// All books
		const books = booksObj.items;

		// Last two books for the featued section
		const featuredBooks = books.splice(-2);

		// loop through featured books
		for (const featuredBook of featuredBooks) {
			console.log(featuredBook);
		}

		// loop through books
		for (const book of books) {
			// console.log(book);
		}
	} catch (error) {
		console.log(error);
	}
};

function insertParentDivs() {
	// create featuredBooksWrapper
	const featureBooksWrapper = document.createElement('div');
	featureBooksWrapper.classList.add('books-wrapper', 'featured');

	// Add featured title
	const featuredTitle = document.createElement('h2');
	featuredTitle.classList.add('featured__title');
	featuredTitle.innerText = 'Featured';

	//Create all books wrapper
	const allBooksWrapper = document.createElement('div');
	allBooksWrapper.classList.add('books-wrapper');

	// target element
	const targetEl = document.querySelector('main .container');

	// Check if container exists before inserting new content
	if (!targetEl) return;

	targetEl.insertAdjacentElement('beforeend', featureBooksWrapper);
	targetEl.insertAdjacentElement('beforeend', allBooksWrapper);
	document.querySelector('.featured').insertAdjacentElement('afterbegin', featuredTitle);
}
