import { Button, Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle, HiLogout } from "react-icons/hi";
import { FaUser, FaCog, FaGithub } from "react-icons/fa";
import {
  BsBoxArrowLeft,
  BsPatchQuestionFill,
  BsSun,
  BsMoon,
} from "react-icons/bs";

import Auth from "../utils/auth";

const RightNav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const handleClose = () => setIsOpen(false);

  const toggleTheme = () => {
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div id="right-nav">
        <div className="flex min-h-[50vh] items-center">
          <Button
            className="top-0 left-0"
            outline
            pill
            onClick={() => setIsOpen(true)}
          >
            <BsBoxArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <Drawer
          backdrop={true}
          open={isOpen}
          onClose={handleClose}
          position="right"
        >
          <Drawer.Header
            title="MENU"
            titleIcon={() => (
              <button
                className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={toggleTheme}
              >
                {darkMode ? (
                  <BsSun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <BsMoon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            )}
          />
          <Drawer.Items>
            <Sidebar
              aria-label="User sidebar for app functions"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item href="/dashboard" icon={FaUser}>
                        Dashboard
                      </Sidebar.Item>
                      {/* <Sidebar.Item
                        className="cursor-pointer"
                        href="/"
                        icon={FaCog}
                        disabled
                      >
                        Settings
                      </Sidebar.Item> */}
                      <Sidebar.Item
                        className="cursor-pointer"
                        onClick={logout}
                        icon={HiLogout}
                      >
                        Logout
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item
                        href="https://github.com/EXCervantes/exertra/blob/main/README.md"
                        icon={BsPatchQuestionFill}
                      >
                        Help
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="https://github.com/EXCervantes/exertra/"
                        icon={FaGithub}
                      >
                        Dev Github
                      </Sidebar.Item>
                      <Sidebar.Item href="/about" icon={HiInformationCircle}>
                        About
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </div>
    </>
  );
};

export default RightNav;
