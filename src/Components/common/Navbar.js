import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography } from "@mui/material";

import NavbarIcon from "./NavbarIcon";
import { UserContext } from "../../context";
import { useDispatch } from "react-redux";
import { filterBooks } from "../../slices/bookSlice";

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
  const navigate = useNavigate();
  const { userRole, clearRole } = useContext(UserContext);
  const dispatch = useDispatch();

  const logout = () => {
    if (localStorage.getItem("access_token")) {
      localStorage.clear();
      clearRole();
      navigate("/login");
    }
  };

  return (
    <Typography position="fixed" width="100%">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href={
              userRole.includes("admin") && !userRole.includes("librarian")
                ? "/librarians"
                : "/"
            }
          >
            Library management system
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {(userRole.includes("librarian") || userRole.includes("user")) && (
              <>
                <NavbarIcon link="/books" name="Books" />
                <NavbarIcon link="/requested_books" name="Requested Books" />
                <NavbarIcon link="/tickets" name="Tickets" />
                {userRole.includes("librarian") && (
                  <NavbarIcon link="/authors" name="Authors" />
                )}
              </>
            )}
            {userRole.includes("admin") && (
              <NavbarIcon link="/librarians" name="Librarians" />
            )}
            <NavbarIcon link="/update_password" name="Update Password" />
          </ul>
          {!userRole.includes("admin") && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  dispatch(filterBooks(e.target.value));
                  navigate(`/books`);
                }}
              />
            </Search>
          )}
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
