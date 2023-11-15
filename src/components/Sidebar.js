import React from "react";
import '../styles/Sidebar.css'

function Sidebar(props) {
  const listItems = props.listItems.map((item) => (<div className={`menu-item ${item.status}`}>
  <span>{item.name}</span>
</div>));
return (
<div class="sidebar">
  {listItems}
  <div className="menu-item settings">
    <img src="" alt="" className="sideIcon" />
    <span>Settings</span>
  </div>
</div>

  );
}

export default Sidebar;