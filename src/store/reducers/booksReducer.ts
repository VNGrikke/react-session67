export type BookRecord = {
    id: number;
    bookName: string;
    studentName: string;
    borrowDate: string;
    returnDate: string;
    status: 'Đã trả' | 'Chưa trả';
};

const ADD_BOOK = 'ADD_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';

export const addBook = (book: BookRecord) => ({
    type: ADD_BOOK as typeof ADD_BOOK,
    payload: book,
});

export const deleteBook = (id: number) => ({
    type: DELETE_BOOK as typeof DELETE_BOOK,
    payload: id,
});

export const updateBook = (book: BookRecord) => ({
    type: UPDATE_BOOK as typeof UPDATE_BOOK,
    payload: book,
});

type BookAction =
    | ReturnType<typeof addBook>
    | ReturnType<typeof deleteBook>
    | ReturnType<typeof updateBook>;

const initialBooksState: BookRecord[] = JSON.parse(localStorage.getItem('books') || '[]');

const booksReducer = (state: BookRecord[] = initialBooksState, action: BookAction): BookRecord[] => {
    switch (action.type) {
        case ADD_BOOK:
            const newBooks = [...state, action.payload];
            localStorage.setItem('books', JSON.stringify(newBooks));
            return newBooks;
        case DELETE_BOOK:
            const remainingBooks = state.filter(book => book.id !== action.payload);
            localStorage.setItem('books', JSON.stringify(remainingBooks));
            return remainingBooks;
        case UPDATE_BOOK:
            const updatedBooks = state.map(book => book.id === action.payload.id ? action.payload : book);
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            return updatedBooks;
        default:
            return state;
    }
};

export default booksReducer;
