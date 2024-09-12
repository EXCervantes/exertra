import { socials } from "../lib/socials";

const About = () => {
  return (
    <div className="flex flex-col items-center text-center mt-10">
      <div className="text-6xl font-semibold">
        <h2>About</h2>
      </div>
      <div className="mt-20 text-center text-2xl">
        <p>
          This application was developed in React.js and Vite. The map component
          is Leaflet along with a Leaflet React library.
        </p>
        <br></br>
        <p>
          If you wish to develop on this project feel free to fork the from the
          GitHub repository. Checkout my socials and pages below!
        </p>
      </div>
      <div className="fixed left-0 right-0 bottom-20 z-60 mb-0 mt-20">
        <div className="flex items-center justify-center gap-6">
          {socials.map((site, index) => (
            <a
              key={index}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.icon}
            </a>
          ))}
        </div>
        <p className="mt-4 text-center text-sm tracking-wide text-gray-600">
          © 2024 Edwardo Cervantes. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
