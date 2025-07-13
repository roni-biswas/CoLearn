import { Link } from "react-router";
import { FiLock } from "react-icons/fi";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center max-w-md bg-base-200 p-8 rounded-xl shadow-md">
        <div className="text-6xl text-error mb-4 flex justify-center">
          <FiLock />
        </div>
        <h1 className="text-4xl font-bold text-error mb-2">403 Forbidden</h1>
        <p className="text-base-content mb-6">
          You don't have permission to access this page. Please contact an admin
          if you believe this is an error.
        </p>
        <Link to="/" className="btn btn-primary text-black">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
