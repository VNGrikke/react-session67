import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../store/reducers/booksReducer';
import { BookRecord } from '../store/reducers/booksReducer';

export default function AddBookForm() {
    const [bookName, setBookName] = useState('');
    const [studentName, setStudentName] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [status, setStatus] = useState<'Đã trả' | 'Chưa trả'>('Chưa trả');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookName || !studentName || !borrowDate || !returnDate) {
            alert('Tất cả các trường không được phép để trống');
            return;
        }
        const currentDate = new Date().toISOString().split('T')[0];
        if (borrowDate < currentDate || returnDate < currentDate) {
            alert('Ngày mượn và ngày trả không được bé hơn ngày hiện tại');
            return;
        }
        const newBook: BookRecord = {
            id: Date.now(),
            bookName,
            studentName,
            borrowDate,
            returnDate,
            status,
        };
        dispatch(addBook(newBook));
        setBookName('');
        setStudentName('');
        setBorrowDate('');
        setReturnDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
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
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Thêm</button>
        </form>
    );
}
