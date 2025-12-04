import { applicationFormCopy } from "../copy";

type PrivacyConsentProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const PrivacyConsent = ({ checked, onChange }: PrivacyConsentProps) => (
  <label className="flex items-center gap-3 text-xs">
    <input
      type="checkbox"
      className="h-5 w-5 shrink-0 rounded border border-[#9b9b9b] bg-white accent-[#1DA94A] focus-visible:outline-2 focus-visible:outline-[#1DA94A]"
      checked={checked}
      onChange={(event) => onChange(event.currentTarget.checked)}
      required
    />
    <span className="text-xs font-normal leading-snug text-black">
      {applicationFormCopy.labels.privacy}
    </span>
  </label>
);
