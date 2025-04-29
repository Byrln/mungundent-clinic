import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

// Custom implementation without Radix UI
interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return <div className="toast-provider">{children}</div>;
};

interface ToastViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ToastViewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
);
ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all animate-in fade-in-80 slide-in-from-top-full sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success:
          "success group border-green-500 bg-green-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, open = true, onOpenChange, ...props }, ref) => {
    React.useEffect(() => {
      if (open === false && onOpenChange) {
        onOpenChange(false);
      }
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Toast.displayName = "Toast";

interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className
      )}
      {...props}
    />
  )
);
ToastAction.displayName = "ToastAction";

interface ToastCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
      // Find the closest Toast component and set its open state to false
      const toast = (e.target as HTMLElement).closest('[data-toast]');
      if (toast && toast.getAttribute('data-open') === 'true') {
        toast.setAttribute('data-open', 'false');
        // Trigger a custom event that the Toast component can listen for
        toast.dispatchEvent(new CustomEvent('toastclose'));
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <X className="h-4 w-4" />
      </button>
    );
  }
);
ToastClose.displayName = "ToastClose";

interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ToastTitle = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  )
);
ToastTitle.displayName = "ToastTitle";

interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ToastDescription = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  )
);
ToastDescription.displayName = "ToastDescription";

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}