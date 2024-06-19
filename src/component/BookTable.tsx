import React from 'react';
import { useSelector } from 'react-redux';
import BookRow from './BookRow';
import { RootState } from '../store/rootState';

interface Book {
    id: number;
    name: string;
    borrowerName: string;
    borrowDate: string;
    returnDate: string;
    status: "Đã trả" | "Chưa trả";
}

export default function BookTable() {
    const books = useSelector((state: RootState) => state.books);
    const filter = useSelector((state: RootState) => state.filter);

    const filteredBooks = filter === 'ALL' ? books : books.filter((book: Book) => book.status === filter);

    return (
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
                {filteredBooks.map((record: Book, index: number) => (
                    <BookRow 
                    key={record.id} 
                    index={index + 1} 
                    bookName={record.name} 
                    studentName={record.borrowerName} 
                    borrowDate={record.borrowDate} 
                    returnDate={record.returnDate} 
                    status={record.status as "Đã trả" | "Chưa trả"} 
                />
                ))}
            </tbody>
        </table>
    );
}