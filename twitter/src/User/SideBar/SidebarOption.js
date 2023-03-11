import React from "react";
import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";

function SidebarOption({ active, text, Icon, path }) {
  const navigate = useNavigate();
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`} onClick={() => navigate(path)}>
      <Icon />
      <h3>{text}</h3>
    </div>
  );
}

export default SidebarOption;
