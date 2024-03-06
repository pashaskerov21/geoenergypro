'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { News, NewsCategory } from '../class'
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

    useEffect(() => {
        const fetchData = async () => {
            const [responseActiveCategory, responseCategory, responseMain]: [
                {
                    main: NewsCategoryDataType,
                    translate: NewsCategoryTranslateDataType,
                },
                {
                    main: NewsCategoryDataType[],
                    translate: NewsCategoryTranslateDataType[],
                },
                {
                    main: NewsDataType[],
                    translate: NewsTranslateDataType[],
                    latest: NewsDataType[],
                },
            ] = await Promise.all([categoryClass.activeSlug({ lang: activeLocale, slug }), categoryClass.all(), mainClass.all()]);
            if (responseActiveCategory.main && responseActiveCategory.translate) {
                setDataState(prev => ({
                    ...prev,
                    activeCategory: responseActiveCategory.main,
                    activeCategoryTranslate: responseActiveCategory.translate,
                }))
            }
            if (responseCategory.main && responseCategory.translate) {
                setDataState(prev => ({
                    ...prev,
                    category: responseCategory.main,
                    categoryTranslate: responseCategory.translate,
                }))
            }
            if (responseMain.main && responseMain.translate) {
                setDataState(prev => ({
                    ...prev,
                    allNews: responseMain.main,
                    news: responseMain.main,
                    newsTranslate: responseMain.translate,
                    latestNews: responseMain.latest
                }))
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(dataState.activeCategory.id){
            setDataState(prev => ({
                ...prev,
                news: prev.news.filter((data) => data.cat_id === dataState.activeCategory.id),
            }))
        }
    },[dataState.activeCategory]);

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
