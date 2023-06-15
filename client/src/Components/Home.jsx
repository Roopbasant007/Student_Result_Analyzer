import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import { Center } from "@chakra-ui/react";

function Home(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          height: "8rem",
          backgroundColor: "#C0EFF2",
        }}
      >
        <Container maxWidth="xl" color={"#C0EEF2"}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
                fontFamily: "papyrus ,fantasy",
                fontWeight: 600,
                letterSpacing: "0",
                color: "#C0EEF",
                textDecoration: "none",
                fontSize: 30,
                marginLeft: "auto",
              }}
            >
              StudentResultAnayser
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="Black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" fontSize={12}></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" fontSize={12}></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" fontSize={12}></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" fontSize={12}></Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "papyrus ,fantasy",
                fontWeight: 700,
                letterSpacing: "0",
                color: "#C0EEF",
                textDecoration: "none",
                fontSize: 30,
              }}
            >
              StudentResultAnayser
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                color: "white",
              }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                ont
              ></Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              ></Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              ></Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              ></Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip sx={{ color: "black" }}>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box paddingTop={"10rem"}>
        <Center padding={50} fontSize={30}>
          Welcome! to Tezpur University.
        </Center>
      </Box>
    </Box>
  );
}

export default Home;
