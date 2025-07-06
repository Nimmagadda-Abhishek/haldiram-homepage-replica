import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f4f6fa" }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-primary-medium mb-4">Oops! Page not found</p>
        <a href="/" className="btn-primary-midnight px-4 py-2 rounded-lg inline-block">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
