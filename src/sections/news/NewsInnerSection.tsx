'use client'
import { NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsGalleryDataType, NewsTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import NewsContainerRight from './NewsContainerRight'
import { PageNavigation } from '@/src/components'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        category: NewsCategoryDataType[],
        categoryTranslate: NewsCategoryTranslateDataType[],
        activeCategory: NewsCategoryDataType,
        activeCategoryTranslate: NewsCategoryTranslateDataType,
        allNews: NewsDataType[],
        activeNews: NewsDataType,
        activeNewsTranslate: NewsTranslateDataType,
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
        latestNews: NewsDataType[],
        newsGallery: NewsGalleryDataType[],
    },
    navigationState: {
        index: number,
        prevUrl: string | null,
        nextUrl: string | null,
        backUrl: string | null,
    }
}

const NewsInnerSection: React.FC<SectionProps> = ({ activeLocale, dataState, dictionary, navigationState }) => {
    const baseURL = process.env.BASE_URL;
    return (
        <section className="news_main_section">
            <div className="container">
                <div className="main_container">
                    <div className="container_col col_1">
                        <div className="news_inner_content">
                            <div className="news_params">
                                {dataState.activeNewsTranslate.date} • by <b>{dataState.activeNewsTranslate.author}</b>
                            </div>
                            <div className="news_text" dangerouslySetInnerHTML={{ __html: dataState.activeNewsTranslate.text ?? '' }}></div>
                            {
                                dataState.newsGallery.length > 0 && (
                                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 992: 2, }}>
                                        <Masonry gutter='10px' columnsCount={2}>
                                            {
                                                dataState.newsGallery.map((data) => (
                                                    data.image && (
                                                        <Link key={data.id} href={baseURL + data.image} className="gallery_image" data-fancybox='news_gallery'>
                                                            <Image src={baseURL + data.image} width={1000} height={1000} alt={`${dataState.activeNewsTranslate.title} - Gallery Image ${data.id}`} priority={true} />
                                                        </Link>
                                                    )
                                                ))
                                            }
                                        </Masonry>
                                    </ResponsiveMasonry>
                                )
                            }
                            <PageNavigation dictionary={dictionary} navigationState={navigationState} />
                        </div>
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

export default React.memo(NewsInnerSection)
