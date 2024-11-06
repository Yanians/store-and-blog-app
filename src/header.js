import logo from './logo.svg';
import './App.css';
  import * as React from 'react';
  import MuiAppBar from '@mui/material/AppBar';
  import Box from '@mui/material/Box';
  import Toolbar from '@mui/material/Toolbar';
  import { styled, alpha, useTheme } from '@mui/material/styles';
  import DarkModeIcon from '@mui/icons-material/DarkMode';
  import LightModeIcon from '@mui/icons-material/LightMode';
  import InputBase from '@mui/material/InputBase';
  import Menu from '@mui/material/Menu';
  import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
  import ChevronRightIcon from '@mui/icons-material/ChevronRight';
  import Drawer from '@mui/material/Drawer';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import Divider from '@mui/material/Divider';
  import Typography from '@mui/material/Typography';
  import Button from '@mui/material/Button';
  import Avatar from '@mui/material/Avatar';
  import IconButton from '@mui/material/IconButton';
  import CssBaseline from '@mui/material/CssBaseline';
  import MenuItem from '@mui/material/MenuItem';
  import Tooltip from '@mui/material/Tooltip';
  import MenuIcon from '@mui/icons-material/Menu';
  import SearchIcon from '@mui/icons-material/Search';
  import { Route, useNavigate }from 'react-router-dom';
import { EventBusy } from '@mui/icons-material';

  const drawerWidth = 200;
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
  const pages = [
    {
      "id":1,
      "Title":"Products",
      "link":"/products",
    },
    {
      "id":2,
      "Title":"Pricing",
      "link":"/Pricing",
    },
    {
      "id":3,
      "Title":"Blog",
      "Link":"/Blog"
    },
  ];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header(props) {
  const theme = useTheme();
  let navigate = useNavigate();
  const mode = JSON.parse(localStorage['mode'] === undefined ? false : localStorage['mode']);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, setState ] = React.useState({
    toggle:mode,
    open:false,
  });

  React.useEffect(()=>{
   
 props.open(state.open);
},[state]);

  const handleDrawerOpen = () => {
    setState({...state,open:!state.open});
  };

  const handleDrawerClose = () => {
    setState({...state,open:!state.open});
    props.close(state.open)
  };
  
  const LinkToTshirtPage=(e)=>{
    e.preventDefault();
    // history.push("/caps")
    navigate("caps");
  }

  const LinkToTableStore=()=>{
      navigate("/table-store");
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
      const name = document.querySelectorAll('.nameTitle');
      const click = document.querySelectorAll('.on-click-trigger');
            click.forEach((el,i)=>{
              el.addEventListener('click',(x)=>{
                x.stopPropagation();
                const text = name[i];
                console.log(text.textContent)
                  if(text.textContent === "Products"){
                      navigate("/products");
                  }else if(text.textContent === "Pricing"){
                    navigate("/pricing");
                  }else if(text.textContent ==="Blog"){
                    navigate("/blog");
                  }else{
                    return "";
                  }

              })
            })
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggle = () => {
     setState({...state,toggle:!toggle})
     props.toggle(state.toggle);
  }

  
  const { toggle, open } = state;
    return (
      <Box sx={{ diplay: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" color="success" open={open} enableColorOnDark>
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleDrawerOpen}
              aria-label="open drawer"
              sx={[{ mr: 2 },open && { display:'none'}]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
           
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (
              <Button className="on-click-trigger" 
                key={index}
                onClick={event=>handleLinkClick(event)}
                sx={{ my:1, display: 'block' }}
              >
                <Typography className="nameTitle" color={!toggle ? "error" : "white"}  variant="overline">{page.Title}</Typography> 
              </Button>  
             
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>&nbsp;
          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            
          <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/profile.jpg" />
              </IconButton>
            </Tooltip>
            <Button color="inherit">Login</Button>
            <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleToggle} size="small" color={toggle ? "info" : "secondary"}>
            {!toggle ? <LightModeIcon size="small" color={toggle ? "success" : "error"} /> : <DarkModeIcon size="small" color={toggle ? "info" : "secondary"} />}
            </IconButton>
          </Box>
          </Toolbar>
        </AppBar>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        elevation={40}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

            <ListItem  disablePadding>
              <ListItemButton dense onClick={e=>LinkToTshirtPage(e)}>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary="your purchase Cart" />
              </ListItemButton>
            </ListItem>
          
        </List>
        <Divider />
        <List>
          
            <ListItem disablePadding onClick={e=>LinkToTableStore(e)}>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary="Go to store" />
              </ListItemButton>
            </ListItem>
      
        </List>
      </Drawer>
      </Box>
    );
  }
