'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu, Page } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType } from '../types/data/type'
import { NewsMainSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const NewsLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const menu = new Menu();
    const slug = 'news';
    const [layoutParams, setLayoutParams] = useState<{
        pageTitleData: PageTitleDataType,
        localeSlugs: LocaleStateType[],
    }>({
        pageTitleData: {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    url: `/${activeLocale}`,
                    title: '',
                }
            ]
        },
        localeSlugs: i18n.locales.map((locale) => {
            return {
                locale: locale,
                slug: slug
            }
        }),
    });

    useEffect(() => {
        const getParams = async () => {
            const titleData = await menu.getPageTitleData(slug, activeLocale);
            setLayoutParams(prev => ({
                ...prev,
                pageTitleData: titleData,
            }))
        }

        getParams();
    }, []);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(layoutParams.localeSlugs))
    }, [dispatch]);

    
    const [dataState, setDataState] = useState<{
        activeCategory: NewsCategoryDataType,
        activeCategoryTranslate: NewsCategoryTranslateDataType,
        category: NewsCategoryDataType[],
        categoryTranslate: NewsCategoryTranslateDataType[],
        allNews: NewsDataType[],
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
        latestNews: NewsDataType[],
    }>({
        activeCategory: {} as NewsCategoryDataType,
        activeCategoryTranslate: {} as NewsCategoryTranslateDataType,
        category: [],
        categoryTranslate: [],
        allNews: [],
        news: [],
        newsTranslate: [],
        latestNews: [],
    });

    const page = new Page();

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                category: NewsCategoryDataType[],
                categoryTranslate: NewsCategoryTranslateDataType[],
                news: NewsDataType[],
                newsTranslate: NewsTranslateDataType[],
                latestNews: NewsDataType[],
            } = await page.news();
            setDataState(prev => ({
                ...prev,
                category: response.category,
                categoryTranslate: response.categoryTranslate,
                allNews: response.news,
                news: response.news,
                newsTranslate: response.newsTranslate,
                latestNews: response.latestNews,
            }))
        }
        fetchData();
    }, [])

    return (
        <>
            {
                dataState.news.length > 0 && (
                    <Fragment>
                        <PageHeading
                            activeLocale={activeLocale}
                            dictionary={dictionary}
                            pageTitleData={layoutParams.pageTitleData}
                        />
                        <NewsMainSection
                            activeLocale={activeLocale}
                            dataState={dataState}
                            dictionary={dictionary}
                        />
                    </Fragment>
                )
            }
        </>
    )
}

export default React.memo(NewsLayout)
