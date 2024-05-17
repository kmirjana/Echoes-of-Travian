import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Exit() {
  return (
    <div>
      <Link to="/exit">Exit</Link>
      <Outlet />
    </div>
  );
}

export default Exit;
