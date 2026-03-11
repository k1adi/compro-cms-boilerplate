import { Link } from "@inertiajs/react";
import { LogOut } from "lucide-react";

export default function DropdownProfile() {
  return (
    <div className='dropdown__wrapper'>
      <Link href={route('logout')} method="post" as="button" className={`dropdown__log-out`}>
        <LogOut /> Log Out 
      </Link>
    </div>
  );
}
