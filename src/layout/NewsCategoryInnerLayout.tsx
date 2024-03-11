'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { News, NewsCategory, Page } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType } from '../types/data/type'
import { NewsMainSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    slug: string,
}

const NewsCategoryInnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary, slug }) => {
    const dispatch = useDispatch();
    const mainClass = new News();
    const categoryClass = new NewsCategory();
    const parentSlug = 'news';
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
                slug: parentSlug
            }
        }),
    });

    useEffect(() => {
        const getParams = async () => {
            const pageTitleData: PageTitleDataType = await categoryClass.getPageTitleData(parentSlug, slug, activeLocale);
            const localeSlugs: LocaleStateType[] = await categoryClass.getLocaleSlugs(parentSlug, slug, activeLocale);
            setLayoutParams(prev => ({
                ...prev,
                pageTitleData: pageTitleData,
                localeSlugs: localeSlugs,
            }))
        }

        getParams();
    }, []);

    useEffect(() => {
        dispatch(updateLocaleSlug(layoutParams.localeSlugs))
    }, [dispatch, layoutParams.localeSlugs]);

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
                activeCategory: NewsCategoryDataType,
                activeCategoryTranslate: NewsCategoryTranslateDataType,
                category: NewsCategoryDataType[],
                categoryTranslate: NewsCategoryTranslateDataType[],
                allNews: NewsDataType[],
                news: NewsDataType[],
                latestNews: NewsDataType[],
                newsTranslate: NewsTranslateDataType[],
            } | 'invalid_slug' = await page.news_category_inner({ lang: activeLocale, slug });
            if (response !== 'invalid_slug') {
                setDataState(prev => ({
                    ...prev,
                    activeCategory: response.activeCategory,
                    activeCategoryTranslate: response.activeCategoryTranslate,
                    category: response.category,
                    categoryTranslate: response.categoryTranslate,
                    allNews: response.allNews,
                    news: response.news,
                    newsTranslate: response.newsTranslate,
                    latestNews: response.latestNews,
                }))
            }
        }
        fetchData();
    }, []);


    return (
        <>
            {
                dataState.activeCategory.id && dataState.news.length > 0 && (
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

export default React.memo(NewsCategoryInnerLayout)
