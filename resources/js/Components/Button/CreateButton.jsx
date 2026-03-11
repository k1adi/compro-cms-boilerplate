import React from 'react';

export default function CreateButton({ routeName, textButton='Create' }) {
  return (
    <a className={`btn gradient--primary text-white`} href={route(routeName)}> 
      {textButton}
    </a>
  );
}