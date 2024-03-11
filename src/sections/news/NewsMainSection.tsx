'use client'
import { NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import NewsContainerRight from './NewsContainerRight'
import { NewsCard } from '@/src/components'

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
    return (
        <section className="news_main_section">
            <div className="container">
                <div className="main_container">
                    <div className="container_col col_1">
                        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, }}>
                            <Masonry gutter='30px' columnsCount={2}>
                                {
                                    dataState.news.map((data) => (
                                        <NewsCard
                                            activeLocale={activeLocale}
                                            categoryTranslateData={dataState.categoryTranslate}
                                            data={data}
                                            dictionary={dictionary}
                                            translateData={dataState.newsTranslate}
                                            key={data.id}
                                        />
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
