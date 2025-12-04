import { type ResolvedPositionOption } from "@/data/applicationOptions";

import { applicationFormCopy } from "../copy";
import {
  fieldGroupStyles,
  fieldTitleClasses,
  fieldTitleStyle,
  inputBaseStyles,
} from "../constants";

type PositionSelectProps = {
  id: string;
  value: string;
  options: ResolvedPositionOption[];
  onChange: (value: string) => void;
  color: string;
  hasAvailablePositions: boolean;
  error?: string | null;
};

export const PositionSelect = ({
  id,
  value,
  options,
  onChange,
  color,
  hasAvailablePositions,
  error,
}: PositionSelectProps) => (
  <label htmlFor={id} className={`${fieldGroupStyles} text-sm`}>
    <span className={fieldTitleClasses} style={fieldTitleStyle}>
      {applicationFormCopy.labels.position}
    </span>
    <div className="relative">
      <select
        id={id}
        name="preferredPosition"
        className={`${inputBaseStyles} appearance-none pr-12`}
        style={{
          color,
        }}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        required
        disabled={!hasAvailablePositions}
        aria-invalid={!!error}
        aria-errormessage={error ? "position-error" : undefined}
      >
        <option value="" disabled style={{ color: "rgba(0, 0, 0, 0.24)" }}>
          {applicationFormCopy.placeholders.position}
        </option>
        {options.map((option) => {
          const disabled = !option.available;
          return (
            <option
              key={option.label}
              value={option.label}
              disabled={disabled}
              style={{
                color: disabled ? "#b3261e" : "#004E1B",
                textDecoration: disabled ? "line-through" : "none",
              }}
            >
              {option.label}
              {disabled ? applicationFormCopy.options.positionDisabledSuffix : ""}
            </option>
          );
        })}
      </select>
      <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-lg text-[#5c5c5c]">
        v
      </span>
    </div>
    {error ? (
      <span id="position-error" className="pl-1 text-xs text-red-600">
        {error}
      </span>
    ) : null}
    {!hasAvailablePositions ? (
      <span className="pl-1 text-xs text-red-600">
        {applicationFormCopy.options.noPositions}
      </span>
    ) : null}
  </label>
);
