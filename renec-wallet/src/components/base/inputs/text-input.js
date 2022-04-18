import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TextInput = ({
  id,
  label,
  placeholder,
  hasError,
  hasWarning,
  message,
  isDisabled,
  grayTheme,
  onChange,
  textarea,
  value,
}) => {
  const showMessage = hasError || hasWarning;
  return (
    <div className={
      classNames({
        "code-01": true,
        "text-input": !textarea,
        "textarea": textarea,
        "has-error": hasError,
        "has-warning": hasWarning,
        disabled: isDisabled,
        "gray-theme": grayTheme,
      })}
    >
      <label className="mb-8" htmlFor={id}>{label}</label>
      <div className="zoned">
        {textarea && (
          <textarea 
            type="text" 
            id={id}
            value={value}
            placeholder={placeholder} 
            disabled={isDisabled} 
            onChange={onChange} 
          />
        )}
        {!textarea && (
          <input 
            type="text" 
            id={id} 
            value={value}
            placeholder={placeholder} 
            disabled={isDisabled} 
            onChange={onChange} 
          />
        )}
        {hasError && <i className="icon icon-attention-alt" />}
        {hasWarning && <i className="icon icon-warning-empty" />}
        {showMessage && <div className="code-00 message">{message}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  message: PropTypes.string,
  isDisabled: PropTypes.bool,
  grayTheme: PropTypes.bool,
  textarea: PropTypes.bool,
  value: PropTypes.string,
};

export { TextInput };