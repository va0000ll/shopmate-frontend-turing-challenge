import React from 'react';

const FormCustomCheckbox = ({
  klass,
  label,
  onChange,
  required,
  name,
  id,
  checked
}) => {
  let handleChange = e => onChange(name, e.target.checked);
  return (
    <div className={`form-group ${klass}`}>
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={id}
          name={name}
          onChange={handleChange}
          checked={checked}
        />
        <label htmlFor={id} className="custom-control-label font-weight-bold">
          {label} {required && ' *'}
        </label>
      </div>
    </div>
  );
};
FormCustomCheckbox.defaultProps = {
  klass: '',
  label: null,
  name: '',
  checked: false
};
export default FormCustomCheckbox;
