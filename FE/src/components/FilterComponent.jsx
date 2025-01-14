import React, { useEffect, useState } from 'react';
import { getBookingTypes } from '../services/bookingTypeService';

const FilterComponent = ({ selectedType, onTypeChange }) => {
    const [bookingTypes, setBookingTypes] = useState([]);
  
    useEffect(() => {
      const fetchBookingTypes = async () => {
        try {
          const types = await getBookingTypes();
          setBookingTypes(types);
        } catch (error) {
          console.error('Lỗi khi tải danh sách kiểu đặt:', error.message);
        }
      };
  
      fetchBookingTypes();
    }, []);
  
    return (
      <select
        className="form-control"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="">Lọc theo kiểu đặt</option>
        {bookingTypes.map((type) => (
          <option key={type.id} value={type.ten_loai_dat}>
            {type.ten_loai_dat}
          </option>
        ))}
      </select>
    );
  };
  
  export default FilterComponent;
  