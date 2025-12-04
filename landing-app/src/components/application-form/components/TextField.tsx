import {
  fieldGroupStyles,
  fieldTitleClasses,
  fieldTitleStyle,
  inputBaseStyles,
} from "../constants";

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  type?: string;
  autoComplete?: string;
  inputMode?: string;
  pattern?: string;
  maxLength?: number;
  required?: boolean;
};

export const TextField = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  pattern,
  maxLength,
  required = false,
}: TextFieldProps) => {
  const errorId = `${id}-error`;

  return (
    <label htmlFor={id} className={`${fieldGroupStyles} text-sm`}>
      <span className={fieldTitleClasses} style={fieldTitleStyle}>
        {label}
      </span>
      <input
        id={id}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${inputBaseStyles} text-[#202020] ${
          error ? "outline outline-red-500" : ""
        }`}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        required={required}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-errormessage={error ? errorId : undefined}
      />
      {error ? (
        <span id={errorId} className="pl-1 text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
};
