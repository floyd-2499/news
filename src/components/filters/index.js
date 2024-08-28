import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

import "./styles.scss"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const NewsFilters = ({ endDateRequired, requestApi }) => {
    const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" })
    const [searchValue, setSearchValue] = useState("")
    const [showFilters, setShowFilters] = useState(true)
    const [isMobileView, setIsMobileView] = useState(false)

    const onChangeStartDate = (e) => {
        setDateRange({ startDate: e?.target?.value, endDate: dateRange?.endDate })
    }

    const onChangeEndDate = (e) => {
        setDateRange({ endDate: e?.target?.value, startDate: dateRange?.startDate })
    }

    const onChangeSearch = (e) => {
        setSearchValue(e?.target?.value);
    }

    const applyFilters = () => {
        requestApi({ dates: dateRange, query: searchValue })
    }

    const resetFilters = () => {
        const currentDate = dayjs().format("YYYY-MM-DD");
        const resetDates = { startDate: currentDate, endDate: currentDate }
        setSearchValue("")
        setDateRange(resetDates)
        requestApi({ dates: resetDates, query: "" })
    }

    const handleFiltersSection = () => {
        setShowFilters(!showFilters)
    }

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobileView(true)
            setShowFilters(true)
        } else {
            setIsMobileView(false)
            setShowFilters(true)
        }
    }

    useEffect(() => {
        const currentDate = dayjs().format("YYYY-MM-DD");
        const dateDetails = { startDate: currentDate, endDate: currentDate }
        setDateRange(dateDetails)
        requestApi({ dates: dateDetails, query: "" })
    }, [])

    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div className="filters-section">
            {showFilters && (
                <>
                    <div className="input-wrapper">
                        <div className="input-label">{endDateRequired ? "Start Date" : "Date"}</div>
                        <input className="date-range-select" type="date" value={dateRange?.startDate} onChange={(e) => onChangeStartDate(e)} />
                    </div>
                    {endDateRequired && (
                        <div className="input-wrapper">
                            <div className="input-label">End Date</div>
                            <input className="date-range-select" type="date" value={dateRange?.endDate} onChange={(e) => onChangeEndDate(e)} />
                        </div>
                    )}
                    <div className="input-wrapper search-wrapper">
                        <div className="input-label">Search Article/Category/Source/Author</div>
                        <input className="search-field" type="text" placeholder="Search" value={searchValue} onChange={(e) => onChangeSearch(e)} />
                    </div>
                    <div className="buttons-section">
                        <div className="filter-button apply-filter" onClick={applyFilters}>Apply</div>
                        <div className="filter-button reset-filter" onClick={resetFilters}>Reset</div>
                    </div>
                </>
            )}
            {isMobileView && (
                <div className="filters-handler-section" onClick={handleFiltersSection}>
                    <div className="text">Filters</div>
                    <div className="line" />
                    <div className="icon">{showFilters ? <FaChevronUp /> : <FaChevronDown />}</div>
                </div>
            )}
        </div>
    )
}

export default NewsFilters