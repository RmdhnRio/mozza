import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'brand-pink'
    | 'brand-purple'
    | 'brand-green'
    | 'brand-peach'
    | 'brand-turquoise';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className = '',
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {

        const baseStyles = "inline-flex items-center justify-center rounded-full font-switzer font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

        const variants = {
            primary: "bg-brand-pink text-white hover:bg-brand-pink/90 shadow-lg shadow-brand-pink/30",
            secondary: "bg-brand-purple text-white hover:bg-brand-purple/90 shadow-lg shadow-brand-purple/30",
            outline: "border-2 border-brand-pink text-brand-pink hover:bg-brand-pink/10",
            ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
            link: "text-brand-pink underline-offset-4 hover:underline p-0 h-auto",
            'brand-pink': "bg-brand-pink text-white hover:brightness-110 shadow-lg shadow-brand-pink/30",
            'brand-purple': "bg-brand-purple text-white hover:brightness-110 shadow-lg shadow-brand-purple/30",
            'brand-green': "bg-brand-green text-gray-900 hover:brightness-110 shadow-lg shadow-brand-green/30",
            'brand-peach': "bg-brand-peach text-gray-900 hover:brightness-110 shadow-lg shadow-brand-peach/30",
            'brand-turquoise': "bg-brand-turquoise text-gray-900 hover:brightness-110 shadow-lg shadow-brand-turquoise/30",
        };

        const sizes = {
            sm: "text-sm px-4 py-1.5 h-8",
            md: "text-base px-6 py-2.5 h-11",
            lg: "text-lg px-8 py-3.5 h-14",
            icon: "h-10 w-10 p-2",
        };

        const widthStyles = fullWidth ? "w-full" : "";

        // Helper to join classes safely
        const combinedClassName = [
            baseStyles,
            variants[variant],
            sizes[size],
            widthStyles,
            className
        ].filter(Boolean).join(" ");

        return (
            <button
                ref={ref}
                className={combinedClassName}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";
