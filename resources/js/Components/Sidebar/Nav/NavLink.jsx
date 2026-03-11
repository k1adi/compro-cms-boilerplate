import clsx from 'clsx';
import { Link } from '@inertiajs/react';

export default function NavLink({ 
  link = '#', 
  icon = '', 
  name, 
  text, 
  active = false, 
  children = '', 
  className = '',
  ...props 
 }) {
  const isActive = active || route().current(`${name}*`);

  const linkClasses = clsx(
    'cms-nav__link',
    isActive
      ? `text-white bg-gradient-to-br from-primary to-secondary hover:from-secondary hover:to-midnight-900`
      : `bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white transition-all`,
    className
  );
  
  return (
    <li>
      <Link href={link} className={linkClasses} {...props}>
        {icon} 
        <span className='pr-6'> {text} </span>
        {children}
      </Link>
    </li>
  );
}
