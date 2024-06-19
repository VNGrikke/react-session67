import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook, updateBook, BookRecord } from '../store/reducers/booksReducer';

type BookRowProps = {
    id: number;
    index: number;
    bookName: string;
    studentName: string;
    borrowDate: string;
    returnDate: string;
    status: 'Đã trả' | 'Chưa trả';
};

export default function BookRow({ id, index, bookName, studentName, borrowDate, returnDate, status }: BookRowProps) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc muốn xóa thông tin này?')) {
            dispatch(deleteBook(id));
        }
    };

    const handleStatusToggle = () => {
        const newStatus = status === 'Đã trả' ? 'Chưa trả' : 'Đã trả';
        dispatch(updateBook({ id, bookName, studentName, borrowDate, returnDate, status: newStatus }));
    };

    return (
        <tr>
            <td className="border px-4 py-2">{index}</td>
            <td className="border px-4 py-2">{bookName}</td>
            <td className="border px-4 py-2">{studentName}</td>
            <td className="border px-4 py-2">{borrowDate}</td>
            <td className="border px-4 py-2">{returnDate}</td>
            <td className="border px-4 py-2">
                <button onClick={handleStatusToggle} className="text-blue-500 underline">{status}</button>
            </td>
            <td className="border px-4 py-2">
                <button onClick={handleDelete} className="text-red-500 underline">Xóa</button>
                <button className="text-red-500 underline">Sửa</button>
            </td>
        </tr>
    );
}
