import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
import NavBar from './NavBar'
import altImage from './altcardimage.png'


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalArticles, setTotalArticles] = useState(0)

    function limitStr (str, cut) {
        if (str !== null)
        {
            let flag = false
            if (str.length > cut) {flag = true}
            if (flag)
            {
                return str.slice(0, cut).concat("...")
            }
            else
            {
                return str.slice(0, cut)
            }
        }
        else
        {
            return "..."
        }
    }
    
    function whenImageNull (imgUrl) {
        if (imgUrl === null)
        {
            return altImage
        }
        else
        {
            return imgUrl
        }
    }
    
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`
        setPage(page+1)
        setLoading(true);
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        // console.log(articles)
        setTotalArticles(parsedData.totalResults)
        setLoading(false)
        // console.log("yo")
    };

    const updateNews = async () => {
        props.setProgress(30);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`
        let data = await fetch(url)
        props.setProgress(50);
        let parsedData = await data.json()
        props.setProgress(80);

        setArticles(parsedData.articles)
        setTotalArticles(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = "Quick News - " + props.category.toUpperCase();
        updateNews()
        // eslint-disable-next-line
    }, [])
    
    return (
      <div className="container my-3">
        <NavBar category={props.category.charAt(0).toUpperCase() + props.category.slice(1)}></NavBar>
        <h1 className="text-center" style={{marginTop: '20vh', fontFamily: 'Times New Roman'}}>{props.category.toUpperCase()}</h1>
        <div className="text-center">{loading && <Spinner />}</div>
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalArticles}
          loader={loading && <div className="text-center"><Spinner/></div>}
        >
            <div className="container">
                <div className="row">
                    {articles.map((element)=>{
                        return <div className="col-lg-3" key={element.url}>
                            <NewsItem title={limitStr(element.title, 100)} description={limitStr(element.description, 100)} imageUrl={whenImageNull(element.urlToImage)} newsUrl = {element.url} source={element.source.name} publishedAt={element.publishedAt}></NewsItem>
                        </div>
                    })}
                </div>
            </div>
        </InfiniteScroll>


      </div>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 18,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
