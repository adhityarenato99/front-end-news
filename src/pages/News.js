import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../config';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const News = ({source}) => {
  const [articles, setArticles] = useState([]);

  const reloadSource = () => {
    axios.get(URL.topHeadlinesURL + URL.apiKey + URL.sources + source).then(response => {
      // console.log(response.data.articles);
      setArticles(response.data.articles);
    });
  };

  useEffect(() => {
    reloadSource();
  }, []);

  if (source != source) reloadSource()

  return (
    <div className={styles.root}>
      News
      <GridList cellHeight={180} className={styles.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">News from {source}</ListSubheader>
        </GridListTile>
        {articles.map(article => (
          <GridListTile key={article.urlToImage}>
            <img src={article.urlToImage} alt={article.title} />
            <GridListTileBar
              title={article.title}
              subtitle={<span>by: {article.source.name}</span>}
              actionIcon={
                <IconButton className={styles.icon} href={article.url}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

  //
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1100,
    height: 900,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

export default withStyles(styles)(News);
