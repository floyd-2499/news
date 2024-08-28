import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import "../home/styles.scss";
import { NEWSApiAction, NEWSApiReset } from "../../api/slices/newsApi";
import NewsFilters from "../../components/filters";
import { ArticleCard } from "../home";
import LoaderMain from "../../components/loader";

export const NewsApiFormatter = (articles) => {
    const newStructure = articles.map((item, index) => {
        return {
            id: index,
            author: item?.author,
            title: item?.title,
            description: item?.description,
            imageUrl: item?.urlToImage,
            newsLink: item?.url,
            source: item?.source?.name,
            publicationDate: item?.publishedAt
        }
    })

    return newStructure
}

const NEWSApiMain = () => {
    const [articles, setArticles] = useState([])

    const dispatch = useDispatch();
    const { data: newsArticles, isLoading, error } = useSelector(state => state.newsApi)

    // console.log(newsArticles, isLoading, error);

    const requestApi = ({ dates, query }) => {
        dispatch(NEWSApiReset())

        const currentDate = dayjs().format("YYYY-MM-DD");

        const payload = {
            date: dayjs(dates?.startDate)?.format("YYYY-MM-DD") || currentDate,
            search: query || "",
            country: "in"
        }

        dispatch(NEWSApiAction(payload))
    }

    useEffect(() => {
        if (newsArticles?.articles) {
            const formattedResponse = NewsApiFormatter(newsArticles?.articles) || []

            setArticles(formattedResponse)
        } else {
            setArticles([])
        }
    }, [newsArticles?.articles])

    return (
        <div className="page-main">
            <NewsFilters requestApi={requestApi} />
            {error?.message || articles?.length === 0 && (
                <div className="error-message">Failed to load articles. Please try again!</div>
            )}
            {isLoading && (
                <LoaderMain />
            )}
            <div className="data-section">
                {articles?.map(article => {
                    return <ArticleCard key={article?.id} article={article} />
                })}
            </div>
        </div>
    )
}

export default NEWSApiMain