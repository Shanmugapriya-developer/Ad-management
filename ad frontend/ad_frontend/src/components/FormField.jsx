import React from 'react';

function FormField({ label, as = 'input', options = [], ...props }) {
  if (as === 'textarea') {
    return (
      <label className="form-field">
        <span>{label}</span>
        <textarea {...props} />
      </label>
    );
  }

  if (as === 'select') {
    return (
      <label className="form-field">
        <span>{label}</span>
        <select {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="form-field">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}

export default FormField;
