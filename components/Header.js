import { useState } from "react";
import useLocale from "../utils/useLocale";
import { AppBar, Box, Toolbar, Typography, Button, Menu, IconButton, Container, MenuItem, Avatar, Divider, Tooltip } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from "@mui/icons-material/Menu";
import TranslateIcon from '@mui/icons-material/Translate';
import { ExpandMore } from "@mui/icons-material";
import Link from "./Link";

const Header = ({ headerData, slug, existTranslation }) => {
  const { locale, t } = useLocale();
  const pages = [
    { name: t.HOME, url: '/' },
    { name: t.CV, url: '/cv' },
    { name: t.RESEARCH, url: '/research' },
    { name: t.NOTE, url: '/note' },
    { name: t.TIPS, url: '/tips' },
    { name: t.GIT, url: '/git' },
  ];
  const newTips = locale === 'en' ? headerData.tips_en.slice(0, 6) : headerData.tips_ja.slice(0, 6);

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
      <Container maxWidth='lg'>
        <Toolbar disableGutters>

          {/* Logo for medium size window */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SchoolIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              So Chigusa
            </Typography>
          </Box>

          {/* Dropdown menu for small size window */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                  <Link href={page.url} color='inherit'>
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </Box>

          {/* Logo for small size window */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mx: 'auto' }}>
            <SchoolIcon sx={{ mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
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
          </Box>

          {/* Menu for medium size window */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (page.name == t.TIPS) {
                return (
                  <>
                    <Button
                      key='tips'
                      onClick={handleOpenDropdown}
                      endIcon={<ExpandMore />}
                      sx={{ my: 2, color: 'white' }}
                    >
                      {t.TIPS}
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
                          <Link href={`/tips/${post.slug}`} color='inherit'>
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
                      <Link href='/tips' color='inherit'>
                        <MenuItem
                          key='more'
                          onClick={handleCloseDropdown}
                          component='a'
                        >
                          <Typography textAlign="center">{t.SEE_MORE_TIPS}</Typography>
                        </MenuItem>
                      </Link>
                    </Menu>
                  </>
                );
              } else {
                return (
                  <Link href={page.url} color='inherit'>
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

          {/* translate button */}
          <Box sx={{ mr: 1 }}>
            {existTranslation === false ? (
              <IconButton
                size="large"
                aria-label="change language"
                color="inherit"
                disabled
              >
                <TranslateIcon />
              </IconButton>
            ) : (
              <Link href='' query={slug === undefined ? {} : { slug: slug }} localeChange color="inherit">
                <Tooltip title={t.TRANSLATE} placement="bottom" arrow>
                  <IconButton
                    size="large"
                    aria-label="change language"
                    color="inherit"
                  >
                    <TranslateIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Box>

          {/* Avatar */}
          <Link href='https://twitter.com/SoChigusa' target='_blank'>
            <Avatar alt="So Chigusa" src="/avatars/1.jpg" />
          </Link>

        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default Header;
