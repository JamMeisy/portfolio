import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Heading component
const headingVariants = cva(
  "font-semibold leading-tight tracking-tight",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-3xl md:text-4xl",
        h3: "text-2xl md:text-3xl",
        h4: "text-xl md:text-2xl",
        h5: "text-lg md:text-xl",
        h6: "text-base md:text-lg",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent-foreground",
      },
    },
    defaultVariants: {
      size: "h2",
      color: "default",
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, color, as, ...props }, ref) => {
    const Component = as || (size as "h1" | "h2" | "h3" | "h4" | "h5" | "h6" || "h2");
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, color }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

// Paragraph component
const paragraphVariants = cva(
  "leading-relaxed",
  {
    variants: {
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
);

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(paragraphVariants({ size, color }), className)}
        {...props}
      />
    );
  }
);
Paragraph.displayName = "Paragraph";

// Lead paragraph component
const Lead = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => {
    return (
      <Paragraph
        ref={ref}
        size="lg"
        className={cn("text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
Lead.displayName = "Lead";

// Large text component
const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-lg font-semibold", className)}
        {...props}
      />
    );
  }
);
Large.displayName = "Large";

// Small text component
const Small = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-sm font-medium leading-none", className)}
        {...props}
      />
    );
  }
);
Small.displayName = "Small";

// Muted text component
const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
Muted.displayName = "Muted";

// Gradient text component for hero sections
const GradientHeading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <Heading
        ref={ref}
        className={cn(
          "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
GradientHeading.displayName = "GradientHeading";

export {
  Heading,
  Paragraph,
  Lead,
  Large,
  Small,
  Muted,
  GradientHeading,
  headingVariants,
  paragraphVariants,
};