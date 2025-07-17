import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Custom portfolio textarea variants
const ContactTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        className={cn(
          "bg-transparent border-muted text-foreground placeholder:text-muted-foreground focus:border-primary min-h-[150px] resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ContactTextarea.displayName = "ContactTextarea";

const AdminTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        className={cn(
          "min-h-[200px] font-mono text-xs",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
AdminTextarea.displayName = "AdminTextarea";

export { Textarea, ContactTextarea, AdminTextarea };