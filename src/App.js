import React,  { useState, useEffect } from 'react'; // useEffect => a function always runs when our app starts/mounts, similar to componentDidMount
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';


const alanKey = 'bd3cd6577f390b7221f5c3a2abba84522e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const classes = useStyles();

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);  // 0 indicates the current index of the article that is being read

    // useEffect => takes 2 parameters => callback function and a dependency array
    // based on the things that we have in the dependency array, useEffect may called multiple or just one time,
    // if we leave the dependency array empty then the useEffect will run one time and that time is gonna be when our component mounts/starts
    useEffect(() => {
        // calling alanBtn as a function
        alanBtn({   
            key : alanKey,      // providing API key or the key that allows us to use alan
            onCommand : ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command === 'highlight') {
                    // chnaging the current state with the help of previous state that can be done using callback function
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);  
                }
                else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber-1];
                    if(parsedNumber > 20) {
                        alanBtn().playText('Articles displayed are not more than twenty. Please try opening an article below this number');
                    }
                    else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening this article...');
                    }
                }
            }
        })
    }, []);

    return (  

        <div>
            <div className={classes.logoContainer}> 
                <img src="https://d1zx6djv3kb1v7.cloudfront.net/wp-content/media/2019/05/Top-10-voice-recognition-platforms-1-i2tutorials.jpeg" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}
 
export default App;