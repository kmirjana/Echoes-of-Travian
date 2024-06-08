import { useLocation, Link, Outlet } from 'react-router-dom';

export const ExitPage = () => {
  return (
    <>
      <div>
        <Link
          to={'/resources/'}
          className="text-center text-2xl font-bold mt-24"
        >
          Exit page
        </Link>
      </div>
      <Outlet />
    </>
  );
};
