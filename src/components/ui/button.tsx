

'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-secondary hover:text-secondary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  outline?: boolean
}


const ButtonWithToast = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, ...props }, ref) => {
    const { toast } = useToast();
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        onClick(event);
      } else if (!props.asChild && props.type !== 'submit') {
        const isLink = props.asChild && 'href' in props;
        if (!isLink) {
          toast({
            title: "Placeholder Control",
            description: "This control is a placeholder in the prototype.",
          });
        }
      }
    };

    return <button ref={ref} onClick={handleClick} {...props} />;
  }
);
ButtonWithToast.displayName = "ButtonWithToast";


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, outline, ...props }, ref) => {
    const Comp = asChild ? Slot : ButtonWithToast;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), outline && 'bg-background border-destructive text-destructive hover:bg-destructive/10', '[&_svg]:size-4')}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
