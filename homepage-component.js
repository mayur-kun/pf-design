import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProjectCard = ({ title, year, category, color, link }) => (
  <Link to={link} className={`block bg-${color}-600 p-8 rounded-lg hover:bg-${color}-500 transition-colors cursor-pointer mb-8`}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-4xl font-light">{title}</h3>
      <span className="text-sm">{year}</span>
    </div>
    <div className="flex justify-between items-end">
      <p className="text-xl">{category}</p>
      <ArrowRight />
    </div>
  </Link>
);

const HomePage = () => {
  // ... (keep the existing state and useEffect code)

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* ... (keep the existing header) */}

        <main className="grid grid-cols-12 gap-8">
          {/* ... (keep the existing intro section) */}

          <section id="projects" className="col-span-12 mb-32">
            <ProjectCard 
              title="Customer Churn Prediction" 
              year="2024" 
              category="ML/Cloud" 
              color="blue"
              link="/projects/customer-churn"
            />
            {/* ... (other ProjectCards) */}
          </section>

          {/* ... (keep the existing about and contact sections) */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
