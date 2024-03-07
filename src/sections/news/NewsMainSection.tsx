'use client'
import { News, NewsCategory } from '@/src/class'
import { NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import NewsContainerRight from './NewsContainerRight'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        activeCategory: NewsCategoryDataType,
        activeCategoryTranslate: NewsCategoryTranslateDataType,
        category: NewsCategoryDataType[],
        categoryTranslate: NewsCategoryTranslateDataType[],
        allNews: NewsDataType[],
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
        latestNews: NewsDataType[],
    }
}

const NewsMainSection: React.FC<SectionProps> = ({ activeLocale, dataState, dictionary }) => {
    const baseURL = process.env.BASE_URL;
    const news = new News();
    const newsCategory = new NewsCategory();
    return (
        <section className="news_main_section">
            <div className="container">
                <div className="main_container">
                    <div className="container_col col_1">
                        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, }}>
                            <Masonry gutter='30px' columnsCount={2}>
                                {
                                    dataState.news.map((data) => (
                                        <div className="news_card" key={data.id}>
                                            {
                                                data.image && (
                                                    <div className="news_image">
                                                        <Image src={baseURL + data.image} width={1000} height={1000} alt='' priority={true} />
                                                        {
                                                            data.cat_id !== 0 && (
                                                                <Link className='news_badge' href={`/${activeLocale}/news/category/${newsCategory.getTranslate({
                                                                    id: data.cat_id,
                                                                    activeLocale,
                                                                    key: "slug",
                                                                    translateData: dataState.categoryTranslate
                                                                })}`}>
                                                                    {newsCategory.getTranslate({
                                                                        id: data.cat_id,
                                                                        activeLocale,
                                                                        key: "title",
                                                                        translateData: dataState.categoryTranslate
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
                                                        translateData: dataState.newsTranslate
                                                    })}`}>
                                                        {news.getTranslate({
                                                            id: data.id,
                                                            activeLocale,
                                                            key: "title",
                                                            translateData: dataState.newsTranslate
                                                        })}
                                                    </Link>
                                                </h2>
                                                <div className="news_date_author">
                                                    {news.getTranslate({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "date",
                                                        translateData: dataState.newsTranslate
                                                    })} • by <b>{news.getTranslate({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "author",
                                                        translateData: dataState.newsTranslate
                                                    })}</b>
                                                </div>
                                                <div className="news_text" dangerouslySetInnerHTML={{
                                                    __html: news.getTranslate({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "text",
                                                        translateData: dataState.newsTranslate
                                                    }).length > 200 ? news.getTranslate({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "text",
                                                        translateData: dataState.newsTranslate
                                                    }).slice(0, 200) + '...' : news.getTranslate({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "text",
                                                        translateData: dataState.newsTranslate
                                                    })
                                                }}></div>
                                                <Link href={`/${activeLocale}/news/${news.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "slug",
                                                    translateData: dataState.newsTranslate
                                                })}`} className="detail_button">
                                                    {dictionary['read_more']}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                    </div>
                    <NewsContainerRight
                        activeLocale={activeLocale}
                        dataState={dataState}
                        dictionary={dictionary}
                    />
                </div>
            </div>
        </section>
    )
}

export default React.memo(NewsMainSection)
