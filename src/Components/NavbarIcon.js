import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const NavbarIcon = ({ link, name }) => (
  <li class="nav-item">
    <Link class="nav-link active" to={link}>
      {name}
    </Link>
  </li>
);

NavbarIcon.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
};

export default NavbarIcon;
