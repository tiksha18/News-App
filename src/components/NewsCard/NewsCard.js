import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';  // using this to create the logic whether the article should be highlighted or not

// destructuring all the properties of article as soon as we receive it in props
const NewsCard = ({ article : { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {

    const classes = useStyles();

    const [elRefs, setElRefs] = useState([]);  // empty array of references

    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    //this will run only at the start (that is when the NewsCard is mounted) , that is to set up all the references
    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef())); 
    }, []);

    // it will run each time whenever alan starts reading a new article
    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs]);  // whenever changes occur in these 3, useEffect will run


    // href={url} => on clicking news card, it will make user navigated to that particular news url in the browser 
    // target="_blank" => this means on clicking card, the page will open in a separate browser and not on the top of our page
    return (  
        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" >{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" >Learn More</Button>
                <Typography variant="h5" color="textSecondary">{ i + 1 }</Typography>
            </CardActions>
        </Card>
    );
}
 
export default NewsCard;