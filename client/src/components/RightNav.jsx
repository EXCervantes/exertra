import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiChartPie, HiInformationCircle, HiLogout } from "react-icons/hi";
import { FaUser, FaCog } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";

// TODO Fix Flowbite to work with React components
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
        <Drawer open={isOpen} onClose={handleClose} position="right">
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
                      <Sidebar.Item href="/" icon={HiChartPie}>
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item href="/users/list" icon={FaUser}>
                        Users list
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="/authentication/sign-in"
                        icon={HiLogout}
                      >
                        Sign in
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
                        href="https://github.com/themesberg/flowbite-react/issues"
                        icon={HiInformationCircle}
                      >
                        Help
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
