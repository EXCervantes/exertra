import { Tooltip } from "flowbite-react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const MapButton = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <Tooltip content="Back to Map" placement="top">
        <Link to="/">
          <Button className="flex items-center gap-2 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary py-2 px-4 rounded-lg shadow-md transition-all">
            <FaMapMarkedAlt className="text-sky-100 dark:text-dark-text h-5 w-5" />
            <p className="pl-1 text-base">Back to Map</p>
          </Button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default MapButton;
