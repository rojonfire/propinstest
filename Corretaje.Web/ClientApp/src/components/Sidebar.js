import React from "react";
import { slide as Menu } from "react-burger-menu";

export const Sidebar = ({ links, showSidebar, onClose, onOpen, ...props }) => {
  return (
    <div>
      <Menu
        menuClassName="shadow"
        isOpen={showSidebar}
        right
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        customBurgerIcon={false}
        width={"20%"}
        onClose={onClose}
        onOpen={onOpen}
      >
        <main id="page-wrap">{links}</main>
      </Menu>
    </div>
  );
};
