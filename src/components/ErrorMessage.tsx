import { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <div className="error-message">{children}</div>;
};

export default ErrorMessage;
