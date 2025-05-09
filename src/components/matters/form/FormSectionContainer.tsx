
import React from "react";

interface FormSectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FormSectionContainer: React.FC<FormSectionContainerProps> = ({
  children,
  className = "",
}) => {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
};

export default FormSectionContainer;
