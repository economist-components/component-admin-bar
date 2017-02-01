import AdminBar from './index';
import React from 'react';

const menuLinks = [
  {
    label: 'First menu',
    url: 'http://www.google.com',
    className: 'firstMenuClassName',
  },
  {
    label: 'Second menu',
    url: 'http://www.facebook.com',
    className: 'secondMenuClassName',
  },
];
export default (
  <div>
    <h2>Drop down version</h2>
    <AdminBar
      title="Admin bar"
      classNamePrefix="admin-bar"
      className="admin-bar-wrapper"
      menuList={menuLinks}
      mode="dropdown"
    />
    <h2>Buttons version</h2>
    <AdminBar
      title="Admin bar"
      classNamePrefix="admin-bar"
      className="admin-bar-wrapper"
      menuList={menuLinks}
    />
  </div>
);
