import React from 'react';

const FormGroupInput = ({
  klass,
  className,
  label,
  value,
  onChange,
  required,
  name,
  placeholder,
  type
}) => {
  // Handle change localy and then send it to the parent via onChange
  let handleChange = e => onChange(name, e.target.value);

  return (
    <div className={`form-group ${klass}`}>
      {label && (
        <label htmlFor={name} className="text-grey font-weight-bold">
          {label} {required && ' *'}
        </label>
      )}
      <input
        type={type}
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
        className={`form-control ${className}`}
        placeholder={placeholder}
        autoComplete={type === 'password' ? 'true' : 'false'}
      />
    </div>
  );
};

FormGroupInput.defaultProps = {
  klass: '',
  className: '',
  label: null,
  placeholder: '',
  type: 'text'
};

export default FormGroupInput;
