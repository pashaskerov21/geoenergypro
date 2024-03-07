import { News, NewsCategory } from '@/src/class'
import { NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type NewsContainerRightProps = {
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

const NewsContainerRight: React.FC<NewsContainerRightProps> = ({ activeLocale, dictionary,dataState }) => {
    const baseURL = process.env.BASE_URL;
    const news = new News();
    const newsCategory = new NewsCategory();
    return (
        <div className="container_col col_2">
            <div className="news_categories">
                <div className="cat_heading">{dictionary['categories']}</div>
                <div className="cat_list">
                    {dataState.category.map((data) => (
                        <div className={`list_item ${dataState.activeCategory.id === data.id ? 'active' : ''}`} key={data.id}>
                            <Link className='item_title' href={`/${activeLocale}/news/category/${newsCategory.getTranslate({
                                id: data.id,
                                activeLocale,
                                key: "slug",
                                translateData: dataState.categoryTranslate,
                            })}`}>
                                {newsCategory.getTranslate({
                                    id: data.id,
                                    activeLocale,
                                    key: "title",
                                    translateData: dataState.categoryTranslate
                                })}
                            </Link>
                            <div className="item_badge">{newsCategory.getNewsCount(data.id, dataState.allNews)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="popular_news_list">
                <div className="list_heading">{dictionary['recent_news']}</div>
                <div className="news_list">
                    {
                        dataState.latestNews.map((data) => (
                            <div className="list_item" key={data.id}>
                                <Link className="item_image" href={`/${activeLocale}/news/${news.getTranslate({
                                    id: data.id,
                                    activeLocale,
                                    key: "slug",
                                    translateData: dataState.newsTranslate
                                })}`}>
                                    {data.image ?
                                        <Image src={baseURL + data.image} width={1000} height={1000} alt='' /> :
                                        <Image src='/bg/image-2.jpg' width={1000} height={1000} alt='' />}
                                </Link>
                                <div className="item_content">
                                    <h4 className="content_title">
                                        <Link href={`/${activeLocale}/news/${news.getTranslate({
                                            id: data.id,
                                            activeLocale,
                                            key: "slug",
                                            translateData: dataState.newsTranslate
                                        })}`}>
                                            {
                                                news.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "title",
                                                    translateData: dataState.newsTranslate
                                                })
                                            }
                                        </Link>
                                    </h4>
                                    <div className="content_date">
                                        {
                                            news.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "date",
                                                translateData: dataState.newsTranslate
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(NewsContainerRight)
