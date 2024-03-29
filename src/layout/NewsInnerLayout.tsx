'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { News, NewsCategory, Page } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsGalleryDataType, NewsTranslateDataType } from '../types/data/type'
import { NewsInnerSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    slug: string,
}

const NewsInnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary, slug }) => {
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
            const pageTitleData: PageTitleDataType = await mainClass.getPageTitleData(parentSlug, slug, activeLocale);
            const localeSlugs: LocaleStateType[] = await mainClass.getLocaleSlugs(parentSlug, slug, activeLocale);
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

    const page = new Page();

    const [dataState, setDataState] = useState<{
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
    }>({
        category: [],
        categoryTranslate: [],
        activeCategory: {} as NewsCategoryDataType,
        activeCategoryTranslate: {} as NewsCategoryTranslateDataType,
        allNews: [],
        activeNews: {} as NewsDataType,
        activeNewsTranslate: {} as NewsTranslateDataType,
        news: [],
        newsTranslate: [],
        latestNews: [],
        newsGallery: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                category: NewsCategoryDataType[],
                categoryTranslate: NewsCategoryTranslateDataType[],
                activeNews: NewsDataType,
                activeNewsTranslate: NewsTranslateDataType,
                newsGallery: NewsGalleryDataType[],
                news: NewsDataType[],
                newsTranslate: NewsTranslateDataType[],
                latestNews: NewsDataType[],
            } | 'invalid_slug' = await page.news_inner({ lang: activeLocale, slug });
            if (response !== 'invalid_slug') {
                setDataState(prev => ({
                    ...prev,
                    category: response.category,
                    categoryTranslate: response.categoryTranslate,
                    allNews: response.news,
                    activeNews: response.activeNews,
                    activeNewsTranslate: response.activeNewsTranslate,
                    news: response.news,
                    newsTranslate: response.newsTranslate,
                    latestNews: response.latestNews,
                    newsGallery: response.newsGallery,
                }))
            }

        }
        fetchData();
    }, []);


    const [navigationState, setNavigationState] = useState<{
        index: number,
        prevUrl: string | null,
        nextUrl: string | null,
        backUrl: string | null,
    }>({
        index: 0,
        prevUrl: null,
        nextUrl: null,
        backUrl: `/${activeLocale}/news`
    });

    useEffect(() => {
        if (dataState.activeNews.id) {
            let index = dataState.news.findIndex(item => item.id === dataState.activeNews.id);
            let prevUrl = index === 0 ? null : `/${activeLocale}/news/${mainClass.getTranslate({
                id: dataState.news[index - 1].id,
                activeLocale,
                key: "slug",
                translateData: dataState.newsTranslate,
            })}`;
            let nextUrl = index === (dataState.news.length - 1) ? null : `/${activeLocale}/news/${mainClass.getTranslate({
                id: dataState.news[index + 1].id,
                activeLocale,
                key: "slug",
                translateData: dataState.newsTranslate,
            })}`;
            setNavigationState(prev => ({
                ...prev,
                index: index,
                prevUrl: prevUrl,
                nextUrl: nextUrl,
            }));
        }
    }, [dataState.activeNews, dataState.news]);

    return (
        <>
            {
                dataState.news.length > 0 && dataState.activeNews.id && (
                    <Fragment>
                        <PageHeading
                            activeLocale={activeLocale}
                            dictionary={dictionary}
                            pageTitleData={layoutParams.pageTitleData}
                        />
                        <NewsInnerSection
                            activeLocale={activeLocale}
                            dataState={dataState}
                            dictionary={dictionary}
                            navigationState={navigationState}
                        />
                    </Fragment>
                )
            }
        </>
    )
}

export default React.memo(NewsInnerLayout)
