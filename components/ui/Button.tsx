"use client"; // needs forwardRef which runs in the browser context

import React from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export type ButtonProps = BaseButtonProps &
  (
    | ({ as?: "button" } & Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        keyof BaseButtonProps
      >)
    | ({ as: "a" } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>)
  );

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-ink hover:opacity-90",
  secondary: "bg-transparent text-accent border border-accent hover:bg-accent/10",
  tertiary: "underline text-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center font-body font-medium rounded transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function buildClassName(variant: ButtonVariant, size: ButtonSize, extra?: string): string {
  return [base, variantClasses[variant], sizeClasses[size], extra ?? ""].join(" ").trim();
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const cls = buildClassName(variant, size, className);

  if (props.as === "a") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _as, ...anchorProps } = props as {
      as: "a";
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a {...anchorProps} className={cls} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _as, ...buttonProps } = props as {
    as?: "button";
  } & React.ButtonHTMLAttributes<HTMLButtonElement>;
  const disabled = buttonProps.disabled;
  return <button {...buttonProps} className={cls} aria-disabled={disabled} />;
}
