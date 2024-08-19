import React, { useState } from 'react';
import { ArrowRight, X, Linkedin, Mail, Twitter } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="float-right text-gray-400 hover:text-white">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

const ProjectCard = ({ title, year, category, color, onClick }) => (
  <div 
    className={`bg-${color}-600 p-8 rounded-lg hover:bg-${color}-500 transition-colors cursor-pointer mb-8`}
    onClick={onClick}
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-4xl font-light">{title}</h3>
      <span className="text-sm">{year}</span>
    </div>
    <div className="flex justify-between items-end">
      <p className="text-xl">{category}</p>
      <ArrowRight />
    </div>
  </div>
);

const ProjectDetail = ({ project }) => (
  <div>
    <h2 className="text-3xl font-light mb-4">{project.title}</h2>
    <p className="text-gray-400 mb-4">{project.category} | {project.year}</p>
    <p className="text-gray-300 mb-4">{project.description}</p>
    <h3 className="text-xl font-light mb-2">Key Features:</h3>
    <ul className="list-disc list-inside text-gray-300 mb-4">
      {project.features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <div className="flex space-x-4">
      <a href={project.github} className="text-green-400 hover:underline">View on GitHub</a>
      <a href={project.demo} className="text-green-400 hover:underline">Live Demo</a>
    </div>
  </div>
);

const AboutModal = () => (
  <div>
    <h2 className="text-3xl font-light mb-4">About Me</h2>
    <p className="text-xl mb-4">I'm a ML engineer, designer, maker, gamer, and anime lover obsessed with the world of AI and digital technology</p>
    <ul className="mb-6">
      <li><strong>Experience:</strong> 2+ years</li>
      <li><strong>Location:</strong> Mumbai, India</li>
      <li><strong>Freelance:</strong> Available</li>
    </ul>
    <h3 className="text-2xl font-light mb-2">Work Experience</h3>
    <div className="mb-4">
      <h4 className="text-xl font-light">Data Engineering Intern</h4>
      <p>Group Data and Analytics, Aditya Birla Management Corporation</p>
      <p className="text-gray-400">Oct 2022 – Oct 2023</p>
      <ul className="list-disc list-inside text-gray-300 mt-2">
        <li>Developed and deployed data pipelines using Azure Data Factory</li>
        <li>Implemented real-time monitoring tools</li>
        <li>Explored ways to extract relevant features for anomaly detection models</li>
        <li>Developed proof-of-concept solutions using Apache Spark and Great Expectations</li>
      </ul>
    </div>
    <h3 className="text-2xl font-light mb-2">Tech Stack & Skills</h3>
    <ul className="list-disc list-inside text-gray-300">
      <li>Languages: Python, SQL</li>
      <li>Libraries: NumPy, Pandas, Scikit-learn, Plotly, PyTorch, Apache Spark, HuggingFace, Nvidia NIM</li>
      <li>Machine Learning: Statistical ML, Computer Vision, Transformers, GANs, Prompt Engineering, Diffusion Models, Fine-tuning LLMs and VLMs</li>
      <li>Developer Tools: Git, Docker, Jenkins, VScode</li>
      <li>Platforms: Google Cloud Platform, Microsoft Azure, MLflow</li>
    </ul>
  </div>
);

const ContactModal = () => (
  <div>
    <h2 className="text-3xl font-light mb-4">Contact Me</h2>
    <div className="flex flex-col space-y-4">
      <a href="https://linkedin.com/in/mayurparab23" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:underline">
        <Linkedin className="mr-2" /> LinkedIn
      </a>
      <a href="mailto:mayur.parab1223@gmail.com" className="flex items-center text-red-400 hover:underline">
        <Mail className="mr-2" /> Email
      </a>
      <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-300 hover:underline">
        <Twitter className="mr-2" /> Twitter
      </a>
    </div>
  </div>
);

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const projects = [
    {
      title: "Customer Churn Prediction",
      year: "2024",
      category: "ML/Cloud",
      color: "blue",
      description: "An end-to-end ML pipeline for predicting customer churn using Google Cloud Platform and Docker containers. This project leverages VertexAI for advanced machine learning capabilities and Streamlit for an intuitive user interface.",
      features: [
        "End-to-end ML pipeline using GCP",
        "Docker containerization for consistent deployments",
        "Interactive UI with Streamlit",
        "Automated CI/CD pipeline using Cloud Build and Cloud Run",
        "Version control for ML models using Model Registry"
      ],
      github: "#",
      demo: "#"
    },
    {
      title: "Automated Football Video Analysis",
      year: "2024",
      category: "Computer Vision",
      color: "green",
      description: "A computer vision project that analyzes football game footage to track player movements, detect ball possession, and generate performance metrics.",
      features: [
        "YOLO-based object detection for players and ball",
        "Optical flow for player movement tracking",
        "Performance metric calculation (speed, distance covered)",
        "Automated highlight generation"
      ],
      github: "#",
      demo: "#"
    },
    {
      title: "Image Segmentation with SAM2",
      year: "2024",
      category: "Deep Learning",
      color: "purple",
      description: "Implementation of the Segment Anything Model (SAM2) for advanced image segmentation tasks, showcasing its potential in object detection and image editing applications.",
      features: [
        "Integration of SAM2 model for image segmentation",
        "Automatic mask generation for object segmentation",
        "Interactive point-based segmentation system",
        "Application demos in object detection and image editing"
      ],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-xl font-light">Mayur Parab</h1>
          <nav>
            <ul className="flex space-x-6 text-sm">
              <li><a href="#projects" className="text-gray-400 hover:text-white">projects</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white">about</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">contact</a></li>
              <li><a href="https://linkedin.com/in/mayurparab23" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">linkedin</a></li>
            </ul>
          </nav>
        </header>

        <main className="grid grid-cols-12 gap-8">
          <section className="col-span-12 mb-32">
            <p className="text-sm text-gray-400 mb-4">Oh, Hello there!</p>
            <h2 className="text-5xl sm:text-7xl font-light leading-tight mb-8">
              I'm <span className="text-white">Mayur</span>, an <span className="text-white">ML engineer</span> <br />
              <span className="text-gray-500">specialized in creating</span> <br />
              <span className="text-gray-500">intelligent and scalable</span> <br />
              <span className="text-gray-500">AI solutions</span>
            </h2>
            <p className="text-sm text-gray-400 flex items-center">
              Mumbai 15:30 • ☀️ 24°C
            </p>
          </section>

          <section id="projects" className="col-span-12 mb-32">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                {...project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </section>

          <section id="about" className="col-span-12 lg:col-span-8 mb-32">
            <h3 className="text-sm text-gray-400 mb-4">.about</h3>
            <p className="text-3xl font-light leading-relaxed mb-8">
              Based in Mumbai, India. 2+ years of experience in Machine Learning and Data Science. 
              A passionate engineer who loves creating intelligent systems. I strongly believe in 
              "Data-driven decisions shape the future of AI"
            </p>
            <button onClick={() => setIsAboutModalOpen(true)} className="inline-block border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
              about me <ArrowRight className="inline" />
            </button>
          </section>

          <section id="contact" className="col-span-12 lg:col-span-8 mb-32">
            <h3 className="text-sm text-gray-400 mb-4">.say hello</h3>
            <p className="text-3xl font-light leading-relaxed mb-8">
              why don't you come say hi <br />
              <a href="mailto:mayur.parab1223@gmail.com" className="text-green-400 hover:underline">@mayur.parab1223@gmail.com</a>
            </p>
            <button onClick={() => setIsContactModalOpen(true)} className="inline-block border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
              contact me <ArrowRight className="inline" />
            </button>
          </section>
        </main>
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && <ProjectDetail project={selectedProject} />}
      </Modal>

      <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)}>
        <AboutModal />
      </Modal>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <ContactModal />
      </Modal>
    </div>
  );
};

export default HomePage;
