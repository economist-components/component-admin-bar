import 'babel/polyfill';
import AdminBar from '../src';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import chai from 'chai';
import { mount, shallow } from 'enzyme';
import Button from '@economist/component-link-button';
chai.should();
chai.use(chaiEnzyme());
describe('A admin bar', () => {
  describe('it\'s a React component', () => {
    const menuLinks = [
      {
        label: 'First menu',
        url: 'firstURL',
        className: 'firstMenuClassName',
      },
      {
        label: 'Second menu',
        url: 'secondURL',
        className: 'secondMenuClassName',
      },
    ];
    it('is compatible with React.Component', () => {
      AdminBar.should.be.a('function');
    });
    it('can have a title', () => {
      const adminBar = mount(React.createElement(AdminBar, {
        title: 'Just a title',
        menuList: menuLinks,
      }));
      adminBar.find('.admin-bar__title').should.have.text('Just a title');
    });
    describe('have 2 different modes that affect the render', () => {
      describe('the default mode', () => {
        it('produces a list of buttons', () => {
          const adminBar = mount(React.createElement(AdminBar, {
            title: 'Just a title',
            menuList: menuLinks,
          }));
          adminBar.find(Button).should.have.length(menuLinks.length);
          adminBar
            .find(Button)
            .first()
            .should
            .have
            .text('First menu');
          adminBar
            .find(Button)
            .first()
            .props()
            .href
            .should
            .equal('firstURL');
        });
      });
      describe('the dropdown mode', () => {
        it('produces a select with options', () => {
          const adminBar = shallow(React.createElement(AdminBar, {
            title: 'Just a title',
            menuList: menuLinks,
            mode: 'dropdown',
          }));
          adminBar.find('.admin-bar__select').should.have.length(1);
          adminBar.find('.admin-bar__select').children().should.have.length(3);
          adminBar.find('.admin-bar__select').childAt(0).should.have.text('Please select an option');
          adminBar
            .find('.admin-bar__select')
            .childAt(1)
            .html()
            .should
            .equal('<option value="firstURL" class="admin-bar__option firstMenuClassName">First menu</option>');
          adminBar
            .find('.admin-bar__select')
            .childAt(2)
            .html()
            .should
            .equal('<option value="secondURL" class="admin-bar__option secondMenuClassName">Second menu</option>');
        });
      });
    });
  });
});
