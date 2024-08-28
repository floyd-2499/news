import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import "./styles.scss";
import { NEWSApiAction, NEWSApiReset } from "../../api/slices/newsApi";
import { TheGuardianAction, TheGuardianReset } from "../../api/slices/theGuardian";
import { NewYorkTimesAction, NewYorkTimesReset } from "../../api/slices/newYorkTimes";
import { NewYorkTimesApiFormatter } from "../new-york-times";
import { NewsApiFormatter } from "../news-api";
import { TheGuardianApiFormatter } from "../the-guardian";

export const ArticleCard = ({ article }) => {
    return (
        <div className="article-card">
            {article?.imageUrl && (
                <div className="card-image">
                    <img alt={article?.title} src={article?.imageUrl} />
                </div>
            )}
            <div className="article-contents">
                <div className="article-title">{article?.title}</div>
                <div className="details-section">
                    <div className="detail-item source">{article?.source}</div>
                    <div className="detail-item publication-date">{dayjs(article?.publicationDate).format("DD-MMM-YYYY")}</div>
                </div>
                {article?.description && (
                    <div className="article-description">{article?.description}</div>
                )}
                <div className="details-section card-footer">
                    <div className="detail-item author">{article?.author}</div>
                    <a className="detail-item view-details" href={article?.newsLink} target="_blank">Read More</a>
                </div>
            </div>
        </div>
    )
}

const HomeMain = () => {
    const [theGuardianArticles, setTheGuardianArticles] = useState([])
    const [nyTimesArticles, setNYTimesArticles] = useState([])
    const [newsApiArticles, setNewsApiArticles] = useState([])

    const dispatch = useDispatch();
    const { data: theGuardianRes, isLoading: theGuardianLoading, error: theGuardianError } = useSelector(state => state.theGuardian)
    const { data: nyTimesRes, isLoading: nyTimesLoading, error: nyTimesError } = useSelector(state => state.newYorkTimes)
    const { data: newsApiRes, isLoading: newsApiLoading, error: newsApiError } = useSelector(state => state.newsApi)

    const requestNewsApi = ({ dates, query }) => {
        dispatch(NEWSApiReset())

        const currentDate = dayjs().format("YYYY-MM-DD");

        const payload = {
            date: dayjs(dates?.startDate)?.format("YYYY-MM-DD") || currentDate,
            search: query || "",
            country: "in"
        }

        dispatch(NEWSApiAction(payload))
    }

    const requestTheGuardianApi = ({ dates, query }) => {
        dispatch(TheGuardianReset())

        const currentDate = dayjs().format("YYYY-MM-DD");

        const payload = {
            startDate: dayjs(dates?.startDate)?.format("YYYY-MM-DD"),
            endDate: dayjs(dates?.endDate)?.format("YYYY-MM-DD") || currentDate,
            query: query || ""
        }

        dispatch(TheGuardianAction(payload))
    }

    const requestNYTimesApi = ({ dates, query }) => {
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
        const currentDate = dayjs().format("YYYY-MM-DD");
        const resetDates = { startDate: currentDate, endDate: currentDate }

        requestNewsApi({ dates: resetDates, query: "" })
        requestTheGuardianApi({ dates: resetDates, query: "" })
        requestNYTimesApi({ dates: resetDates, query: "" })
    }, [])

    useEffect(() => {
        if (theGuardianRes?.response) {
            const formattedResponse = TheGuardianApiFormatter(theGuardianRes?.response?.results) || []
            setTheGuardianArticles(formattedResponse)
        }
    }, [theGuardianRes?.response])

    useEffect(() => {
        if (nyTimesRes?.response) {
            const formattedResponse = NewYorkTimesApiFormatter(nyTimesRes?.response?.docs) || []
            setNYTimesArticles(formattedResponse)
        }
    }, [nyTimesRes?.response])

    useEffect(() => {
        if (newsApiRes?.articles) {
            const formattedResponse = NewsApiFormatter(newsApiRes?.articles) || []
            setNewsApiArticles(formattedResponse)
        }
    }, [newsApiRes?.articles])

    return (
        <div className="page-main">
            <div className="section-container">
                <div className="section-title">New York Times Articles:</div>
                <div className="articles-section">
                    {nyTimesArticles?.map(article => {
                        return (
                            <ArticleCard article={article} key={article?.id} />
                        )
                    })}
                </div>
            </div>
            <div className="section-container">
                <div className="section-title">News API Org Articles:</div>
                <div className="articles-section">
                    {newsApiArticles?.map(article => {
                        return (
                            <ArticleCard article={article} key={article?.id} />
                        )
                    })}
                </div>
            </div>
            <div className="section-container">
                <div className="section-title">The Guardian Articles:</div>
                <div className="articles-section">
                    {theGuardianArticles?.map(article => {
                        return (
                            <ArticleCard article={article} key={article?.id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomeMain