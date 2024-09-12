import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle, HiLogout } from "react-icons/hi";
import { FaUser, FaCog, FaGithub } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";

// TODO Make Dashboard show past workouts,
const RightNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

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
          <Drawer.Header title="MENU" titleIcon={() => <></>} />
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
                        href="/authentication/sign-in"
                        icon={HiLogout}
                      >
                        Logout
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item
                        href="https://flowbite-react.com/"
                        icon={FaCog}
                      >
                        Settings
                      </Sidebar.Item>

                      <Sidebar.Item
                        href="https://github.com/EXCervantes/exertra/blob/main/README.md"
                        icon={HiInformationCircle}
                      >
                        Help
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="https://github.com/EXCervantes/exertra/"
                        icon={FaGithub}
                      >
                        Dev Github
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
