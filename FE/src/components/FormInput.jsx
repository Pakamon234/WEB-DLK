import React from 'react';

const FormInput = ({ label, type, id, value, onChange }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}:</label>
        <input type={type} id={id} value={value} onChange={onChange} required />
    </div>
);

export default FormInput;
