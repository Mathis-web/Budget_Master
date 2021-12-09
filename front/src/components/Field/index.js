import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const Field = ({name, type, value, onChangeFunc, placeholder}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className="form-input"
    value={value}
    onChange={onChangeFunc}
  />
);

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
}

Field.defaultProps = {
  type: 'text'
}

export default Field;