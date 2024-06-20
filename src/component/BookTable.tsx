import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, updateBook } from '../store/reducers/booksReducer';
import { BookRecord } from '../store/reducers/booksReducer';
import { useState } from 'react';
import EditBookForm from './EditBookForm'; // Import EditBookForm

export default function BookTable() {
    const books = useSelector((state: any) => state.books);
    const filter = useSelector((state: any) => state.filter);
    const dispatch = useDispatch();
    const [editingBook, setEditingBook] = useState<BookRecord | null>(null);

    const filteredBooks = filter === 'ALL' ? books : books.filter((book: BookRecord) => book.status === filter);

    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc muốn xóa thông tin này?')) {
            dispatch(deleteBook(id));
        }
    };

    const handleStatusToggle = (book: BookRecord) => {
        const newStatus = book.status === 'Đã trả' ? 'Chưa trả' : 'Đã trả';
        dispatch(updateBook({ ...book, status: newStatus }));
    };

    const handleEdit = (book: BookRecord) => {
        setEditingBook(book);
    };

    const handleUpdate = (updatedBook: BookRecord) => {
        dispatch(updateBook(updatedBook));
        setEditingBook(null);
    };

    return (
        <div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Tên sách</th>
                        <th className="border px-4 py-2">Tên sinh viên mượn</th>
                        <th className="border px-4 py-2">Ngày mượn</th>
                        <th className="border px-4 py-2">Ngày trả</th>
                        <th className="border px-4 py-2">Trạng thái</th>
                        <th className="border px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book: BookRecord, index: number) => (
                        <tr key={book.id}>
                            <td className="text-center border px-4 py-2">{index + 1}</td>
                            <td className="text-center border px-4 py-2">{book.bookName || 'N/A'}</td>
                            <td className="text-center border px-4 py-2">{book.studentName || 'N/A'}</td>
                            <td className="text-center border px-4 py-2">{book.borrowDate}</td>
                            <td className="text-center border px-4 py-2">{book.returnDate}</td>
                            <td className="text-center border px-4 py-2">
                                <button onClick={() => handleStatusToggle(book)} className="text-blue-500">{book.status}</button>
                            </td>
                            <td className="text-center border px-4 py-2">
                                <button onClick={() => handleDelete(book.id)} className="mr-4 px-4 text-white inline-block bg-red-600 rounded">Xóa</button>
                                <button onClick={() => handleEdit(book)} className="ml-4 px-4 text-white inline-block bg-orange-600 rounded">Sửa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingBook && (
                <EditBookForm book={editingBook} onUpdate={handleUpdate} onCancel={() => setEditingBook(null)} />
            )}
        </div>
    );
}
