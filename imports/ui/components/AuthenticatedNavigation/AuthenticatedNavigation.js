import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const AuthenticatedNavigation = ({ name, history }) => (
  <div>
    <Nav>
      <LinkContainer to="/documents">
        <NavItem eventKey={1} href="/documents">GIFs</NavItem>
      </LinkContainer>
    </Nav>
    <Nav>
      <LinkContainer to="/videos">
        <NavItem eventKey={2} href="/videos">Videos</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={3.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={3.2} onClick={() => history.push('/logout')}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default withRouter(AuthenticatedNavigation);
