import ButtonToggleSidebar from './ButtonToggleSidebar';
import HeaderProfile from './HeaderProfile';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className='app__header'>
      <div className='cms-header__wrapper'>
        {/* Header Toggle Sidebar */}
        <div className='cms-header__toggle'>
          <ButtonToggleSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Profile Dropdown */}
        <HeaderProfile />
      </div>
    </header>
  )
}
