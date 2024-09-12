import { Button, Drawer, Sidebar } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiInformationCircle, HiLogout, HiSun, HiMoon } from "react-icons/hi";
import { FaUser, FaCog, FaGithub } from "react-icons/fa";
import { BsBoxArrowLeft, BsPatchQuestionFill } from "react-icons/bs";

import Auth from "../utils/auth";

const RightNav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
              <Button onClick={toggleDarkMode} pill className="mr-4">
                {darkMode ? (
                  <HiSun className="h-6 w-6 text-yellow-400" />
                ) : (
                  <HiMoon className="h-6 w-6 text-blue-200" />
                )}
              </Button>
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
                      <Sidebar.Item
                        className="cursor-pointer"
                        href="/"
                        icon={FaCog}
                      >
                        Settings
                      </Sidebar.Item>
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
