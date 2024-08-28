import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import "../home/styles.scss";
import { TheGuardianAction, TheGuardianReset } from "../../api/slices/theGuardian";
import NewsFilters from "../../components/filters";
import { ArticleCard } from "../home";
import LoaderMain from "../../components/loader";

export const TheGuardianApiFormatter = (articles) => {
    const newStructure = articles.map((item) => {
        return {
            id: item?.id,
            category: item?.pillarName,
            author: "",
            title: item?.webTitle,
            description: "",
            imageUrl: "",
            newsLink: item?.webUrl,
            source: "",
            publicationDate: item?.webPublicationDate
        }
    })

    return newStructure
}

const TheGuardianMain = () => {
    const [articles, setArticles] = useState([])

    const dispatch = useDispatch();
    const { data: newsArticles, isLoading, error } = useSelector(state => state.theGuardian)

    const requestApi = ({ dates, query }) => {
        dispatch(TheGuardianReset())

        const currentDate = dayjs().format("YYYY-MM-DD");

        const payload = {
            startDate: dayjs(dates?.startDate)?.format("YYYY-MM-DD"),
            endDate: dayjs(dates?.endDate)?.format("YYYY-MM-DD") || currentDate,
            query: query || ""
        }

        dispatch(TheGuardianAction(payload))
    }

    useEffect(() => {
        if (newsArticles?.response) {
            const formattedResponse = TheGuardianApiFormatter(newsArticles?.response?.results) || []

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

export default TheGuardianMain