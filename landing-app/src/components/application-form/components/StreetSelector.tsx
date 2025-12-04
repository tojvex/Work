import { applicationFormCopy } from "../copy";
import {
  fieldGroupStyles,
  fieldTitleClasses,
  fieldTitleStyle,
} from "../constants";

type StreetSelectorProps = {
  options: string[];
  selected: string[];
  onToggle: (street: string) => void;
  error?: string | null;
};

export const StreetSelector = ({
  options,
  selected,
  onToggle,
  error,
}: StreetSelectorProps) => (
  <div className={`${fieldGroupStyles} text-sm`}>
    <span className={fieldTitleClasses} style={fieldTitleStyle}>
      {applicationFormCopy.labels.streets}
    </span>
    <span className="pl-1 text-xs text-[#5c5c5c]">
      {applicationFormCopy.helpers.streets}
    </span>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <label
            key={option}
            className={`flex items-center gap-2 rounded-[9px] border px-3 py-2 text-sm transition ${
              isSelected
                ? "border-[#1DA94A] bg-[#e4f4e9] shadow-sm"
                : "border-[#d7d7d7] bg-[#f1f1f1]"
            }`}
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#9b9b9b] text-[#1DA94A] accent-[#1DA94A]"
              checked={isSelected}
              onChange={() => onToggle(option)}
            />
            <span className="text-[#202020]">{option}</span>
          </label>
        );
      })}
    </div>
    {error ? (
      <span className="pl-1 text-xs text-red-600">{error}</span>
    ) : null}
  </div>
);
