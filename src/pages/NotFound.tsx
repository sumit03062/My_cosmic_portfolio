
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-portfolio-blue/5 via-white to-portfolio-purple/5">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-portfolio-blue">404</h1>
        <div className="h-2 w-16 bg-portfolio-purple mx-auto my-6"></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button asChild size="lg" className="bg-portfolio-blue hover:bg-portfolio-purple">
          <Link to="/" className="flex items-center">
            <Home className="mr-2" size={18} />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
