import {
  fieldGroupStyles,
  fieldTitleClasses,
  fieldTitleStyle,
  inputBaseStyles,
} from "../constants";

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  color?: string;
  error?: string | null;
};

export const SelectField = ({
  id,
  name,
  label,
  placeholder,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
  color,
  error = null,
}: SelectFieldProps) => {
  const selectColor =
    color ?? (value ? "#004E1B" : "rgba(0, 0, 0, 0.24)");
  const errorId = `${id}-error`;

  return (
    <label htmlFor={id} className={`${fieldGroupStyles} text-sm`}>
      <span className={fieldTitleClasses} style={fieldTitleStyle}>
        {label}
      </span>
      <div className="relative">
        <select
          id={id}
          name={name}
          className={`${inputBaseStyles} appearance-none pr-12`}
          style={{ color: selectColor }}
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
        >
          <option value="" disabled style={{ color: "rgba(0, 0, 0, 0.24)" }}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} style={{ color: "#004E1B" }}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-lg text-[#5c5c5c]">
          v
        </span>
      </div>
      {error ? (
        <span id={errorId} className="pl-1 text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
};
