import React from "react";
import '../styles/SiteAdminView.css'
import Sidebar from "./Sidebar";

function SiteAdminView() {
  const listItems = [{name:"New Users",status:"notActive"}, {name:"Existing Users",status:"active"}];
return (
  <div className="SiteAdminView">
  <Sidebar listItems = {listItems} />
  <div className="main">
    <div className="usersContainer">
    <table class="user-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th colspan="2"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
    <tr>
      <td>Gaser Sami</td>
      <td>gaser.sami@gasersami.com</td>
      <td className="button"><button class="btn approve">Approve</button></td>
      <td className="button"><button class="btn decline">Decline</button></td>
    </tr>
  </tbody>
</table>

    </div>
  </div>
</div>
);
}

export default SiteAdminView;