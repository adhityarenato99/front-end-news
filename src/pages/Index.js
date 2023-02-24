import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../config';

// import hook useHistory from react router dom
import { useHistory } from 'react-router';

import Headlines from './Headlines';
import News from './News';
import SearchNews from './SearchNews';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreIcon from '@material-ui/icons/MoreVert';

// react bootstrap
import { FaBars, FaUserAlt, FaSearch } from 'react-icons/fa';
import { Navbar, Container, Nav, Button, Form, NavDropdown, Dropdown } from 'react-bootstrap';

const Index = () => {
  // state parameter for UI/UX
  const [anchorEl, setAnchor] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // state parameters
  const [user, setUser] = useState({});
  const [categories, setCategory] = useState([]);
  const [allData, setAllData] = useState([]);
  const [sources, setSources] = useState([]);
  const [sourceValue, setSourceValue] = useState('headlines');
  const [searchValue, setSearchValue] = useState('');

  // define history
  const history = useHistory();

  // token
  const token = localStorage.getItem('token');

  //function "fetchData"
  const fetchUser = async () => {
    //set axios header dengan type Authorization + Bearer token
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get('http://localhost:8000/api/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(response => {
        console.log(response.data);

        //set response user to state
        setUser(response.data);
      });
  };

  const fetchData = () => {
    axios
      .get(URL.sourcesURL + URL.apiKey)
      .then(response => {
        // console.log(response.data.sources);
        setSources(response.data.sources);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // check token empty
    if (!token) {
      // redirect login page
      history.push('/');
    }

    // call functions
    fetchUser();
    fetchData();
  }, []);

  // function logout
  const Logout = async () => {
    // alert('logout')

    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //fetch Rest API
    await axios.post('http://localhost:8000/api/logout').then(response => {
      console.log(response.data);

      //remove token from localStorage
      localStorage.removeItem('token');

      //redirect halaman login
      history.push('/');
    });
  };

  const handleChangeSource = event => {
    setSourceValue(event.target.value);
  };

  const handleChangeSearch = event => {
    setSearchValue(event.target.value);
  };

  const handleProfileMenuOpen = event => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={Logout}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorite</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={styles.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Typography className={styles.title} variant="h6" color="inherit" noWrap>
                News API | <span style={{fontSize:'14px'}}>Welcome <b>{user.name}</b></span>
              </Typography>
            </Grid>
            <Grid item>
              <InputBase className={styles.input} placeholder="Search news..." value={searchValue} onChange={handleChangeSearch} />
              <IconButton className={styles.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <div className={styles.grow} />
              <div className={styles.sectionDesktop}>
                <IconButton color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
      
      {/* <div className="mt-2"> */}
      {/* <FormControl className={styles.formControl}>
        <InputLabel htmlFor="age-simple">Source News</InputLabel>
        <Select value={sourceValue} onChange={handleChangeSource}>
        <em>Top Headlines</em>
          <MenuItem value="headlines">
            
            {sources.map((source, i) => {
              return (
                <MenuItem key={i} value={source.id}>
                  {source.name}
                </MenuItem>
              );
            })}
          </MenuItem>
        </Select>
      </FormControl> */}
      {/* </div> */}

      <select value={sourceValue} onChange={handleChangeSource}>
          <option value="headlines">Top Headlines</option>
          {sources.map((source, i) => {
            return (
              <option key={i} value={source.id}>
                {source.name}
              </option>
            );
          })}
        </select>

      {searchValue != '' ? <SearchNews search={searchValue} /> : sourceValue == 'headlines' ? <Headlines /> : <News source={sourceValue} />}
    </div>
  );
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

export default withStyles(styles)(Index);
