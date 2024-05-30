import { Link, Outlet } from 'react-router-dom';

export const OptionsPage: React.FC = () => {
  return (
    <>
      <nav className="position:relative position:absolute text-center text-2xl font-bold mt-24">
        <Link to="/options">options page</Link>
      </nav>
    </>
  );
};
