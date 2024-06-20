import React, { useState } from 'react';
import { BookRecord } from '../store/reducers/booksReducer';

interface EditBookFormProps {
    book: BookRecord;
    onUpdate: (book: BookRecord) => void;
    onCancel: () => void;
}

export default function EditBookForm({ book, onUpdate, onCancel }: EditBookFormProps) {
    const [bookName, setBookName] = useState(book.bookName);
    const [studentName, setStudentName] = useState(book.studentName);
    const [borrowDate, setBorrowDate] = useState(book.borrowDate);
    const [returnDate, setReturnDate] = useState(book.returnDate);
    const [status, setStatus] = useState<'Đã trả' | 'Chưa trả'>(book.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            ...book,
            bookName,
            studentName,
            borrowDate,
            returnDate,
            status,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
            <h2 className="text-xl mb-4">Chỉnh sửa sách</h2>
            <input
                type="text"
                placeholder="Tên sách"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
            />
            <input
                type="text"
                placeholder="Tên sinh viên"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
            />
            <input
                type="date"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
            />
            <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Đã trả' | 'Chưa trả')}
                className="block w-full mb-2 p-2 border rounded"
            >
                <option value="Đã trả">Đã trả</option>
                <option value="Chưa trả">Chưa trả</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Lưu</button>
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Hủy</button>
        </form>
    );
}
