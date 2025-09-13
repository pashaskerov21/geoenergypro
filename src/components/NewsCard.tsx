'use client'
import React, { Fragment } from 'react'
import { News, NewsCategory } from '../class';
import { LocaleType } from '../types/general/type';
import { NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType } from '../types/data/type';
import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
    dictionary: { [key: string]: string },
    activeLocale: LocaleType,
    data: NewsDataType,
    translateData: NewsTranslateDataType[],
    categoryTranslateData: NewsCategoryTranslateDataType[],
    searchKeyword?: string,
}

const Title: React.FC<{ title: string, searchKeyword?: string }> = ({ searchKeyword, title }) => {
    if (searchKeyword) {
        const regex = new RegExp(`(${searchKeyword})`, 'gi');
        const parts = title.split(regex);
        return (
            <Fragment>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <span key={index} className='search_query'>
                            {part}
                        </span>
                    ) : (
                        <Fragment key={index}>{part}</Fragment>
                    )
                )}
            </Fragment>
        )
    } else {
        return (
            <Fragment>{title}</Fragment>
        )
    }
}

const NewsCard: React.FC<CardProps> = ({ activeLocale, categoryTranslateData, data, dictionary, translateData, searchKeyword, }) => {
    const baseURL = process.env.BASE_URL;
    const news = new News();
    const newsCategory = new NewsCategory();
    return (
        <div className="news_card" key={data.id}>
            {
                data.image && (
                    <div className="news_image">
                        <Image src={baseURL + data.image} width={1000} height={1000} priority={true} alt={news.getTranslate({
                                id: data.id,
                                activeLocale,
                                key: "title",
                                translateData: translateData
                            })} />
                        {
                            data.cat_id !== 0 && (
                                <Link className='news_badge' href={`/${activeLocale}/news/category/${newsCategory.getTranslate({
                                    id: data.cat_id,
                                    activeLocale,
                                    key: "slug",
                                    translateData: categoryTranslateData
                                })}`}>
                                    {newsCategory.getTranslate({
                                        id: data.cat_id,
                                        activeLocale,
                                        key: "title",
                                        translateData: categoryTranslateData
                                    })}
                                </Link>
                            )
                        }
                    </div>
                )
            }
            <div className="card_content">
                <h2 className="news_title">
                    <Link href={`/${activeLocale}/news/${news.getTranslate({
                        id: data.id,
                        activeLocale,
                        key: "slug",
                        translateData: translateData
                    })}`}>
                        <Title
                            title={news.getTranslate({
                                id: data.id,
                                activeLocale,
                                key: "title",
                                translateData: translateData
                            })}
                            searchKeyword={searchKeyword}
                        />
                    </Link>
                </h2>
                <div className="news_date_author">
                    {news.getTranslate({
                        id: data.id,
                        activeLocale,
                        key: "date",
                        translateData: translateData
                    })} • by <b>{news.getTranslate({
                        id: data.id,
                        activeLocale,
                        key: "author",
                        translateData: translateData
                    })}</b>
                </div>
                <div className="news_text" dangerouslySetInnerHTML={{
                    __html: news.getTranslate({
                        id: data.id,
                        activeLocale,
                        key: "text",
                        translateData: translateData
                    }).length > 200 ? news.getTranslate({
                        id: data.id,
                        activeLocale,
                        key: "text",
                        translateData: translateData
                    }).slice(0, 200) + '...' : news.getTranslate({
                        id: data.id,
                        activeLocale,
                        key: "text",
                        translateData: translateData
                    })
                }}></div>
                <Link href={`/${activeLocale}/news/${news.getTranslate({
                    id: data.id,
                    activeLocale,
                    key: "slug",
                    translateData: translateData
                })}`} className="detail_button">
                    {dictionary['read_more']}
                </Link>
            </div>
        </div>
    )
}

export default NewsCard
