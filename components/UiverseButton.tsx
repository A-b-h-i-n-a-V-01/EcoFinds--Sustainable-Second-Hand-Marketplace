import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type BaseProps = {
    variant?: 'primary' | 'secondary' | 'dark' | 'danger';
    className?: string;
    children: React.ReactNode;
};

type ButtonAsButton = BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { as?: 'button' };
type ButtonAsLink = BaseProps & Omit<LinkProps, 'className'> & { as: 'link' };

type UiverseButtonProps = ButtonAsButton | ButtonAsLink;

const UiverseButton: React.FC<UiverseButtonProps> = (props) => {
    const variantClasses = {
        primary: 'uiverse-btn-primary',
        secondary: 'uiverse-btn-secondary',
        dark: 'uiverse-btn-dark',
        danger: 'uiverse-btn-danger',
    };

    if (props.as === 'link') {
        const { as, variant = 'primary', className = '', children, ...rest } = props;
        
        const buttonClasses = [
            'uiverse-btn',
            variantClasses[variant],
            className
        ].join(' ');

        return <Link className={buttonClasses} {...rest}><span>{children}</span></Link>;
    } else {
        const { as, variant = 'primary', className = '', children, ...rest } = props;
        
        const buttonClasses = [
            'uiverse-btn',
            variantClasses[variant],
            className
        ].join(' ');

        return (
            <button className={buttonClasses} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
                <span>{children}</span>
            </button>
        );
    }
};

export default UiverseButton;