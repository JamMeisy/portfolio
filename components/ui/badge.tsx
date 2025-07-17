import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom portfolio variants
        skill: "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
        technology: "border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20",
        achievement: "border-accent/20 bg-accent/10 text-accent-foreground hover:bg-accent/20",
        date: "border-muted/20 bg-muted/10 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Custom portfolio badge components
function SkillBadge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Badge variant="skill" className={cn("text-sm px-3 py-1", className)} {...props} />;
}

function TechnologyBadge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Badge variant="technology" className={cn("text-sm px-3 py-1", className)} {...props} />;
}

function DateBadge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Badge variant="date" className={cn("text-xs", className)} {...props} />;
}

export { Badge, badgeVariants, SkillBadge, TechnologyBadge, DateBadge };