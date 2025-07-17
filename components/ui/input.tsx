import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Custom portfolio input variants
const ContactInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn(
          "bg-transparent border-muted text-foreground placeholder:text-muted-foreground focus:border-primary h-12",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ContactInput.displayName = "ContactInput";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        type="search"
        className={cn(
          "pl-9 bg-muted/10 border-muted/20 focus:bg-background/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

export { Input, ContactInput, SearchInput };