import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
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
            <BsBoxArrowLeft className="h-6 w-6" />
          </Button>
        </div>
        <Drawer open={isOpen} onClose={handleClose} position="right">
          <Drawer.Header title="MENU" titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <form className="pb-3 md:hidden">
                    <TextInput
                      icon={HiSearch}
                      type="search"
                      placeholder="Search"
                      required
                      size={32}
                    />
                  </form>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item href="/" icon={HiChartPie}>
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item href="/users/list" icon={HiUsers}>
                        Users list
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="/authentication/sign-in"
                        icon={HiLogin}
                      >
                        Sign in
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="/authentication/sign-up"
                        icon={HiPencil}
                      >
                        Sign up
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item
                        href="https://github.com/themesberg/flowbite-react/"
                        icon={HiClipboard}
                      >
                        Docs
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="https://flowbite-react.com/"
                        icon={HiCollection}
                      >
                        Components
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
