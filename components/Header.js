import { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Menu, IconButton, Container, MenuItem, Avatar, Divider } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandMore } from "@mui/icons-material";
import Link from "next/link";

const Header = ({ headerData }) => {
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'CV', url: '/cv' },
    { name: 'Research', url: '/research' },
    { name: 'Note', url: '/note' },
    { name: 'Tips', url: '/tips' },
    { name: 'Git', url: '/git' },
  ];
  const newTips = headerData.tips.slice(0, 6);

  // for menu icon button
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // for tips dropdown
  const [anchorElDropdown, setAnchorElDropdown] = useState(null);
  const handleOpenDropdown = (event) => {
    setAnchorElDropdown(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorElDropdown(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 2, }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo for medium size window */}
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            So Chigusa
          </Typography>

          {/* Dropdown menu for small size window */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
                return (
                  <Link href={page.url} passHref>
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </Box>

          {/* Logo for small size window */}
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            So Chigusa
          </Typography>

          {/* Menu for medium size window */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (page.name == 'Tips') {
                return (
                  <>
                    <Button
                      key='tips'
                      onClick={handleOpenDropdown}
                      endIcon={<ExpandMore />}
                      sx={{ my: 2, color: 'white' }}
                    >
                      Tips
                    </Button>
                    <Menu
                      id='dropdown-appbar'
                      anchorEl={anchorElDropdown}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElDropdown)}
                      onClose={handleCloseDropdown}
                      // MenuListProps={{ onMouseLeave: handleCloseDropdown }}
                      sx={{
                        display: { xs: 'none', md: 'block' },
                      }}
                    >
                      {
                        newTips.map((post) => (
                          <Link href={`/tips/${post.slug}`} passHref>
                            <MenuItem
                              key={post.slug}
                              onClick={handleCloseDropdown}
                              component='a'
                            >
                              <Typography textAlign="center">{post.frontMatter.title}</Typography>
                            </MenuItem>
                          </Link>
                        ))
                      }
                      <Divider />
                      <Link href='/tips' passHref>
                        <MenuItem
                          key='more'
                          onClick={handleCloseDropdown}
                          component='a'
                        >
                          <Typography textAlign="center">もっと見る</Typography>
                        </MenuItem>
                      </Link>
                    </Menu>
                  </>
                );
              } else {
                return (
                  <Link href={page.url} passHref>
                    <Button
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white' }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                );
              }
            })}
          </Box>

          {/* Avatar */}
          <Avatar alt="So Chigusa" src="/images/avatar/1.jpg" />

        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default Header;
