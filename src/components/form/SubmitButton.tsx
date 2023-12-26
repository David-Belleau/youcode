"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";

export const SubmitButton = (props: ButtonProps) => {
  // disable button if form loads
  const { pending } = useFormStatus();
  return <Button {...props} disabled={pending} />;
};
