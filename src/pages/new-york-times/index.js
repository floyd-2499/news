import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import "../home/styles.scss";
import { NewYorkTimesAction, NewYorkTimesReset } from "../../api/slices/newYorkTimes";
import NewsFilters from "../../components/filters";
import { ArticleCard } from "../home";
import LoaderMain from "../../components/loader";

export const NewYorkTimesApiFormatter = (articles) => {
    const newStructure = articles.map((item, index) => {
        return {
            id: index,
            author: item?.byline?.original,
            title: item?.headline?.main,
            description: item?.lead_paragraph,
            imageUrl: `https://static01.nyt.com/${item?.multimedia[0]?.url || ""}`,
            newsLink: item?.web_url,
            source: item?.source,
            publicationDate: item?.pub_date
        }
    })

    return newStructure
}

const NewYorkTimesMain = () => {
    const [articles, setArticles] = useState([])

    const dispatch = useDispatch();
    const { data: newsArticles, isLoading, error } = useSelector(state => state.newYorkTimes)

    const requestApi = ({ dates, query }) => {
        dispatch(NewYorkTimesReset())

        const currentDate = dayjs().format("YYYYMMDD");

        const payload = {
            startDate: dayjs(dates?.startDate)?.format("YYYYMMDD"),
            endDate: dayjs(dates?.endDate)?.format("YYYYMMDD") || currentDate,
            query: query || ""
        }

        dispatch(NewYorkTimesAction(payload))
    }

    useEffect(() => {
        if (newsArticles?.response) {
            const formattedResponse = NewYorkTimesApiFormatter(newsArticles?.response?.docs) || []

            setArticles(formattedResponse)
        } else {
            setArticles([])
        }
    }, [newsArticles?.response])


    return (
        <div className="page-main">
            <NewsFilters
                endDateRequired
                requestApi={requestApi}
            />
            {error?.message && (
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

export default NewYorkTimesMain