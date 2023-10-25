import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { WEBSITE_URL } from "../utils";

const Footer = () => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    marginTop="2%"
    marginBottom="2%"
  >
    {"Copyright © "}
    <Link color="inherit" href={WEBSITE_URL}>
      Library management system
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default Footer;
