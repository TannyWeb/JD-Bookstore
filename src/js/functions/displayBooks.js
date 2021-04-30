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
			const title = featuredBook.volumeInfo.title;
			// Optional Chaining as some books dont contain subtitle and this avoid error;

			let subtitle = '';
			// For some books a subtitle doesnt exist so this is checking to avoid error
			if (featuredBook.volumeInfo.subtitle) {
				subtitle = featuredBook.volumeInfo.subtitle;
			}
			const bookCover = featuredBook.volumeInfo.imageLinks.smallThumbnail;
			const authors = featuredBook.volumeInfo.authors.join(',');
			const pages = featuredBook.volumeInfo.pageCount;
			const description = featuredBook.volumeInfo.description;

			const htmlString = `
                <div class="book-item">
                    <img class="book-item__img" src="${bookCover}">
                    <h3 class="book-item__title">${title}<span class="book-item__subtitle">${subtitle}</span></h3>
                    <p class="book-item__authors">${authors}</p>
                    <p class="book-item__pages">Pages: ${pages}</p>
                    <p class="book-item__description">${truncateString(description, 140)}</p>
                </div>
            `;

			console.log(htmlString);

			// add looped html string to the parent wrapper

			document.querySelector('.featured__book-item-wrapper').insertAdjacentHTML('beforeend', htmlString);
		}

		// loop through books
		for (const book of books) {
			const title = book.volumeInfo.title;

			let subtitle = '';
			// For some books a subtitle doesnt exist so this is checking to avoid error
			if (book.volumeInfo.subtitle) {
				subtitle = book.volumeInfo.subtitle;
			}
			const bookCover = book.volumeInfo.imageLinks.smallThumbnail;
			const authors = book.volumeInfo.authors.join(', ');
			const pages = book.volumeInfo.pageCount;
			const description = book.volumeInfo.description;

			const htmlString = `
                <div class="book-item">
                    <img class="book-item__img" src="${bookCover}">
                        <div class="book-item-text">
                        <div class="book-item__title-wrapper">

                        <h3 class="book-item__title">${title}</h3>
                        <h4 class="book-item__subtitle">${subtitle}</h4>
                        </div>
                        <p class="book-item__authors">${authors}</p>
                        <p class="book-item__pages">Pages: ${pages}</p>
                        <p class="book-item__description">${truncateString(description, 140)}</p>
                    </div>
                </div>
            `;

			console.log(htmlString);

			// add looped html string to the parent wrapper

			document.querySelector('.books-wrapper:not(.featured)').insertAdjacentHTML('beforeend', htmlString);
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

	// Add featured-book-item-wrapper
	const featuredBookItemWrapper = document.createElement('div');
	featuredBookItemWrapper.classList.add('featured__book-item-wrapper');

	//Create all books wrapper
	const allBooksWrapper = document.createElement('div');
	allBooksWrapper.classList.add('books-wrapper');

	// target element
	const targetEl = document.querySelector('main .container');

	// Check if container exists before inserting new content
	if (!targetEl) return;

	// Insert parent containers to the DOM
	targetEl.insertAdjacentElement('beforeend', featureBooksWrapper);
	targetEl.insertAdjacentElement('beforeend', allBooksWrapper);
	document.querySelector('.featured').insertAdjacentElement('afterbegin', featuredTitle);
	document.querySelector('.featured').insertAdjacentElement('beforeend', featuredBookItemWrapper);
}

// Function to truncate the book description to 140 characters dynamically
function truncateString(str, num) {
	if (str.length <= num) {
		return str;
	}
	return str.slice(0, num) + '...';
}
