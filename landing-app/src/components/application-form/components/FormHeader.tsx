import { applicationFormCopy } from "../copy";

export const FormHeader = () => (
  <div className="mb-2 text-center">
    <p className="text-sm font-medium" style={{ color: "rgba(0, 0, 0, 0.38)" }}>
      {applicationFormCopy.header}
    </p>
  </div>
);
