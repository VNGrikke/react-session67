import React, { useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import BookTable from './component/BookTable';
import AddBookForm from './component/AddBookForm';
import { setFilter, FilterType } from './store/reducers/filterReducer';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(e.target.value as FilterType));
  };

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quản lý mượn trả sách</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Thêm thông tin
        </button>
        {showForm && <AddBookForm />}
        <div className="flex items-center mb-4">
          <label htmlFor="filter" className="mr-2">Lọc theo trạng thái:</label>
          <select 
            id="filter"
            onChange={handleFilterChange} 
            className="p-2 border rounded"
          >
            <option value="ALL">Tất cả</option>
            <option value="Đã trả">Đã trả</option>
            <option value="Chưa trả">Chưa trả</option>
          </select>
        </div>
        <BookTable />
      </div>
    </Provider>
  );
}
