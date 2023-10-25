import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./../axios";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography } from "@mui/material";

import NavbarIcon from "./NavbarIcon";
import { BOOK_URL } from "../utils";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    if (localStorage.getItem("access_token")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    try {
      const response = await axiosInstance.get(
        `${BOOK_URL}?search=${e.target.value}`
      );
      navigate("/books", { state: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Typography position="fixed" width="100%">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Library management system
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavbarIcon link="/books" name="Books" />
            <NavbarIcon link="/requested_books" name="Requested Books" />
            <NavbarIcon link="/tickets" name="Tickets" />
          </ul>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </nav>
    </Typography>
  );
};

export default Navbar;
