import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import NavMenu from './Nav/NavMenu';
import { usePage } from '@inertiajs/react';
import { ChevronsLeft } from 'lucide-react';
import IconCMS from '../../../assets/dummy-icon.png'

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { appVersion } = usePage().props
  const trigger = useRef();
  const sidebar = useRef();

  const storedSidebarExpanded = localStorage.getItem('rpl-sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside - only on mobile (width < 992px)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      // Check if screen width is less than 992px (mobile)
      if (window.innerWidth >= 992) return;
      
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('rpl-sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside ref={sidebar} className={`app__sidebar lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full w-0'}`}>
      <div className='cms-sidebar__header'>
        <Link href={route('cms.dashboard')} className={`cms-sidebar__logo text-primary`}>
          <img src={IconCMS} alt="CMS Icon" className='w-auto h-7 inline-block me-2' />
          <span className='font-semibold text-xl'>CMS</span> <span className='text-xl'>WEB</span>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className={`block lg:hidden  text-primary`}
        >
          <ChevronsLeft color='currentColor' size={29} className='mb-1' />
        </button>
      </div>

      <div className='cms-sidebar__menu'>
        <NavMenu sidebarExpand={sidebarExpanded} setSidebarExpand={setSidebarExpanded} />
      </div>

      <div className='cms-sidebar__version'>
        <span>
          © {new Date().getFullYear()} CMS Boilerplate. All rights reserved.
          <br />
          version {appVersion}
        </span>
      </div>
    </aside>
  );
}
