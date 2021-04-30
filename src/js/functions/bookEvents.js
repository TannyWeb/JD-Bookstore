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
			console.log(books);
		}
	});
};
