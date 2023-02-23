import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from './config';

import Headlines from './pages/Headlines';
import News from './pages/News';
import SearchNews from './pages/SearchNews';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const App = () => {
  const [sources, setSources] = useState([]);
  const [sourceValue, setSourceValue] = useState('headlines');
  const [searchValue, setSearchValue] = useState('');

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
    fetchData();
  }, []);

  const handleChangeSource = event => {
    setSourceValue(event.target.value);
  };

  const handleChangeSearch = event => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="root">
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Typography className={styles.title} variant="h6" color="inherit" noWrap>
                News API | <small>Welcome.. user</small>
              </Typography>
            </Grid>
            <Grid item>
              <InputBase className={styles.input} placeholder="Search news..." value={searchValue} onChange={handleChangeSearch}/>
              <IconButton className={styles.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <FormControl className={styles.formControl}>
          <InputLabel htmlFor="age-simple">Source News</InputLabel>
          <Select
            value={sourceValue}
            onChange={handleChangeSource}
          >
            <MenuItem value="headlines">
              <em>Top Headlines</em>
              {sources.map((source, i) => {
                return (
                  <MenuItem key={i} value={source.id}>{source.name}</MenuItem>
                );
              })}
            </MenuItem>
          </Select>
        </FormControl>

      {searchValue != '' ? <SearchNews search={searchValue} /> : sourceValue == 'headlines' ? <Headlines /> : <News source={sourceValue} />}
    </div>
  );
};

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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

export default withStyles(styles)(App);
