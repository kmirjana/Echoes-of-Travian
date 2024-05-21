import { Link } from 'react-router-dom';

export const OptionsPage: React.FC = () => {
  return (
    <div>
      <Link
        to={'/options'}
        className="text-center text-2xl font-bold mt-24"
      >
        options page
      </Link>
    </div>
  );
};
