import { News } from '@/src/class'
import { NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType, PartnerDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        partner: PartnerDataType[],
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
        newsCategoryTranslate: NewsCategoryTranslateDataType[],
    }
}

const NewsSection: React.FC<SectionProps> = ({ activeLocale, dataState, dictionary }) => {
    const baseURL = process.env.BASE_URL;
    const news = new News();
    const [activeNews, setActiveNews] = useState<NewsDataType>(dataState.news.find(data => data.order === 1) ?? dataState.news[0]);
    return (
        <section className="news_section" style={{ backgroundImage: "url('/bg/image-3.jpg')" }}>
            <div className="container">
                <div className="partners_wrapper" style={{ backgroundImage: "url('/bg/image-1.jpg')" }}>
                    <Swiper className='partner_swiper'
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1400: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Autoplay]}
                    >
                        {dataState.partner.map((data) => (
                            data.image && (
                                <SwiperSlide key={data.id}>
                                    <Link href={`/${activeLocale}/${data.url}`} className='partner_logo'>
                                        <Image src={baseURL + data.image} width={500} height={500} alt={`Geo Energy Pro - Partner ${data.id}`} />
                                    </Link>
                                </SwiperSlide>
                            )
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="container">
                <div className="news_wrapper">
                    <div className="section_heading">
                        <div className="section_heading_title">
                            {dictionary['recent_news']}
                        </div>
                    </div>
                    <div className="news_container">
                        <div className="container_col col_1">
                            <div className="news_banners">
                                <div className="banner_item">
                                    {activeNews.image ?
                                        <Image className='news_image' src={baseURL + activeNews.image} width={1000} height={1000} priority={true} alt={`${news.getTranslate({
                                            id: activeNews.id, activeLocale, key: "title", translateData: dataState.newsTranslate
                                        })}`} /> :
                                        <Image className='news_image' src='/bg/image-2.jpg' width={1000} height={1000} priority={true} alt={`${news.getTranslate({
                                            id: activeNews.id, activeLocale, key: "title", translateData: dataState.newsTranslate
                                        })}`} />
                                    }
                                    <div className="item_content">
                                        {activeNews.cat_id !== 0 && (
                                            <Link href={`/${activeLocale}/news/category/${news.getCategoryTranslate({
                                                id: activeNews.cat_id,
                                                activeLocale,
                                                key: "slug",
                                                translateData: dataState.newsCategoryTranslate
                                            })}`} className="item_badge">
                                                {news.getCategoryTranslate({
                                                    id: activeNews.cat_id,
                                                    activeLocale,
                                                    key: "title",
                                                    translateData: dataState.newsCategoryTranslate
                                                })}
                                            </Link>
                                        )}
                                        <div className="item_bottom">
                                            <div className="item_date_author">
                                                <div className="item_date">
                                                    {news.getTranslate({
                                                        id: activeNews.id,
                                                        activeLocale,
                                                        key: "date",
                                                        translateData: dataState.newsTranslate
                                                    })}
                                                </div>
                                                <span>•</span>
                                                <div className="item_date">
                                                    by {news.getTranslate({
                                                        id: activeNews.id,
                                                        activeLocale,
                                                        key: "author",
                                                        translateData: dataState.newsTranslate
                                                    })}
                                                </div>
                                            </div>
                                            <h3 className="item_title">
                                                <Link href={`/${activeLocale}/news/${news.getTranslate({
                                                    id: activeNews.id,
                                                    activeLocale,
                                                    key: "slug",
                                                    translateData: dataState.newsTranslate
                                                })}`}>
                                                    {news.getTranslate({
                                                        id: activeNews.id,
                                                        activeLocale,
                                                        key: "title",
                                                        translateData: dataState.newsTranslate
                                                    })}
                                                </Link>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/${activeLocale}/news`} className='all_news_button'>
                                {dictionary['more_news']}
                            </Link>
                        </div>
                        <div className="container_col col_2">
                            <div className="news_list">
                                {dataState.news.map((data) => (
                                    <div className="list_item" key={data.id}>
                                        <div className="item_title">
                                            <Link href={`/${activeLocale}/news/${news.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "slug",
                                                translateData: dataState.newsTranslate,
                                            })}`}>
                                                {news.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "title",
                                                    translateData: dataState.newsTranslate,
                                                })}
                                            </Link>
                                        </div>
                                        <div className="item_text" dangerouslySetInnerHTML={{
                                            __html: news.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "text",
                                                translateData: dataState.newsTranslate,
                                            }).length > 70 ? news.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "text",
                                                translateData: dataState.newsTranslate,
                                            }).slice(0, 70) + '...' : news.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "text",
                                                translateData: dataState.newsTranslate,
                                            })
                                        }} ></div>
                                        <div className="item__bottom">
                                            <div className="item_date">
                                                {news.getTranslate({
                                                    id: activeNews.id,
                                                    activeLocale,
                                                    key: "date",
                                                    translateData: dataState.newsTranslate
                                                })}
                                            </div>
                                            <span>•</span>
                                            <div className="item_author">
                                                by <strong>
                                                    {news.getTranslate({
                                                        id: activeNews.id,
                                                        activeLocale,
                                                        key: "author",
                                                        translateData: dataState.newsTranslate
                                                    })}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(NewsSection)
