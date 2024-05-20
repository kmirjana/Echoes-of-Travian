import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

export const Backlink = () => {
  const { pathname } = useLocation();

  const backlink = pathname.slice(0, pathname.lastIndexOf('/'));

  return (
    <Link
      to={backlink}
      className="flex items-center gap-1"
    >
      <IoIosArrowBack className="mt-[2px]" />
      <span className="">Back</span>
    </Link>
  );
};
