import { socials } from "../lib/socials";
import MapButton from "../components/MapButton";

const About = () => {
  return (
    <div className="flex flex-col items-center text-center mt-10 px-4 lg:px-8 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
        <h2>About</h2>
      </div>
      <div className="mt-10 sm:mt-16 lg:mt-20 text-lg sm:text-xl lg:text-2xl">
        <p>
          This application was developed in React.js and Vite. The map component
          is Leaflet along with a Leaflet React library.
        </p>
        <br />
        <p>
          If you wish to develop on this project, feel free to fork it from the
          GitHub repository. Check out my socials and pages below!
        </p>
      </div>
      <div className="mt-20">
        <MapButton />
      </div>
      <div className="fixed left-0 right-0 bottom-10 z-60 mb-0 mt-10 lg:mt-20">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {socials.map((site, index) => (
            <a
              key={index}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl sm:text-3xl lg:text-4xl"
            >
              {site.icon}
            </a>
          ))}
        </div>

        <p className="mt-4 text-center text-xs sm:text-sm lg:text-base tracking-wide text-gray-600">
          © 2024 Edwardo Cervantes. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
