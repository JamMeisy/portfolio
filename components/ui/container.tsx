import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva(
  "mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      size: {
        default: "max-w-7xl",
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-full",
      },
      padding: {
        default: "py-8 md:py-12",
        none: "py-0",
        sm: "py-4 md:py-6",
        md: "py-8 md:py-12",
        lg: "py-12 md:py-16",
        xl: "py-16 md:py-24",
      },
    },
    defaultVariants: {
      size: "default",
      padding: "default",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

// Custom portfolio container variants
const SectionContainer = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, padding = "lg", ...props }, ref) => {
    return (
      <Container
        ref={ref}
        padding={padding}
        className={cn("scroll-m-20", className)}
        {...props}
      />
    );
  }
);
SectionContainer.displayName = "SectionContainer";

const HeroContainer = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, padding = "xl", ...props }, ref) => {
    return (
      <Container
        ref={ref}
        padding={padding}
        className={cn("min-h-[80vh] flex flex-col justify-center", className)}
        {...props}
      />
    );
  }
);
HeroContainer.displayName = "HeroContainer";

export { Container, SectionContainer, HeroContainer, containerVariants };