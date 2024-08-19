import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

const ProjectPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-16">
          <Link to="/" className="text-gray-400 hover:text-white flex items-center">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </header>

        {/* ... (keep the rest of the component unchanged) */}

      </div>
    </div>
  );
};

export default ProjectPage;
