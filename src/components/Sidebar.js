import React from "react";
import '../styles/Sidebar.css'

function Sidebar() {
return (
<div class="sidebar">
  <div class="menu-item">
    <span>New Users</span>
  </div>
  <div class="menu-item active">
    <span>Existing Users</span>
  </div>
  <div class="menu-item settings">
    <img src="" alt="" className="sideIcon" />
    <span>Settings</span>
  </div>
</div>

  );
}

export default Sidebar;