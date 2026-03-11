import { Link } from "@inertiajs/react";

export default function CancelButton({ routeName, textButton='Cancel' }) {
  if (routeName) {
    return (
      <Link href={route(routeName)} className='btn gradient--gray text-white me-2'>
        {textButton}
      </Link>
    );
  } else {
    return (
      <button 
        onClick={() => window.history.back()} 
        className='btn gradient--gray text-white me-2'
      >
        {textButton}
      </button>
    );
  }
}