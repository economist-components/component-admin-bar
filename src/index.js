import React from 'react';
import PropTypes from 'prop-types';
import Button from '@economist/component-link-button';
import BarWrapper from '@economist/component-bar-wrapper';

function createButtonList({ label, url, className, key, target = '_blank', classNamePrefix }) {
  const additionalClassname = (className) ? ` ${ className }` : '';
  const props = {
    href: url,
    children: label,
    className: `${ classNamePrefix }__edit-link${ additionalClassname }`,
    key,
    target,
  };
  return (<Button {...props} />);
}

function createOptionList({ label, url, className, key, classNamePrefix }) {
  const additionalClassname = (className) ? ` ${ className }` : '';
  const props = {
    value: url,
    children: label,
    className: `${ classNamePrefix }__option${ additionalClassname }`,
    key,
  };
  return (<option {...props} />);
}

export default function AdminBar({ classNamePrefix = 'admin-bar', className, title, menuList, mode }) {
  const classNamesList = [ classNamePrefix ];
  const children = [];
  if (className) {
    classNamesList.push(className);
  }
  const barWrapperClassName = classNamesList.join(' ');
  const adminTitle = title ? (<span key="title" className={`${ classNamePrefix }__title`}>{title}</span>) : null;

  let renderChild = null;
  switch (mode) {
    case 'dropdown':
      renderChild = createOptionList;
      break;
    default:
      renderChild = createButtonList;
  }

  menuList.forEach((menuItem, index) => {
    menuItem.key = index;
    menuItem.classNamePrefix = classNamePrefix;
    children.push(renderChild(menuItem));
  });

  function handleChange(event) {
    // Ignore empty values.
    if (event.target.value) {
      window.open(event.target.value, '_blank');
    }
  }

  let adminElements = children;
  if (mode === 'dropdown') {
    adminElements = (
      <select className={`${ classNamePrefix }__select`} onChange={handleChange}>
        <option value="">Please select an option</option>
        {children}
      </select>
    );
  }


  return (
    <BarWrapper className={barWrapperClassName} close={false}>
      {adminTitle}
      {adminElements}
    </BarWrapper>
  );
}

if (process.env.NODE_ENV !== 'production') {
  AdminBar.propTypes = {
    classNamePrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
    menuList: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
      className: PropTypes.string,
    })).isRequired,
    mode: PropTypes.oneOf([ 'dropdown' ]),
  };
  createButtonList.propTypes = {
    label: PropTypes.string,
    url: PropTypes.string,
    classNamePrefix: PropTypes.string,
    className: PropTypes.string,
    key: PropTypes.string,
    target: PropTypes.string,
  };
  createOptionList.propTypes = {
    label: PropTypes.string,
    url: PropTypes.string,
    classNamePrefix: PropTypes.string,
    className: PropTypes.string,
    key: PropTypes.string,
  };
}
