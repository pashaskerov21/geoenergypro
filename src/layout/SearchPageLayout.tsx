'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { i18n } from '@/i18n-config'
import { NewsCard, PageHeading, ProjectCard, SearchForm, ServiceCard } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { MenuDataType, MenuTranslateDataType, NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType, ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType, ServiceDataType, ServiceTranslateDataType } from '../types/data/type'
import { ServiceSection } from '../sections'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { NewsCategory, ProjectCategory } from '../class'


type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const SearchPageLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const slug = 'search';
    const [layoutParams, setLayoutParams] = useState<{
        searchQuery: string,
        pageTitleData: PageTitleDataType,
        localeSlugs: LocaleStateType[],
    }>({
        searchQuery: '',
        pageTitleData: {
            title: dictionary['search'],
            breadcrumbs: [
                {
                    id: 1,
                    url: `/${activeLocale}`,
                    title: dictionary['search'],
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




    const baseURL = process.env.BASE_URL;
    const router = useRouter();
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    const [dataState, setDataState] = useState<{
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
        projectCategory: ProjectCategoryDataType[],
        projectCategoryTranslate: ProjectCategoryTranslateDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
        newsCategory: NewsCategoryDataType[],
        newsCategoryTranslate: NewsCategoryTranslateDataType[],
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
        menu: MenuDataType[],
        menuTranslate: MenuTranslateDataType[],
    }>({
        service: [],
        serviceTranslate: [],
        projectCategory: [],
        projectCategoryTranslate: [],
        project: [],
        projectTranslate: [],
        newsCategory: [],
        newsCategoryTranslate: [],
        news: [],
        newsTranslate: [],
        menu: [],
        menuTranslate: [],
    });

    useEffect(() => {
        if (queryParam) {
            setLayoutParams(prev => ({
                ...prev,
                searchQuery: queryParam,
                localeSlugs: i18n.locales.map((locale) => {
                    return {
                        locale: locale,
                        slug: `${slug}?query=${queryParam}`,
                    }
                })
            }))
        }

        const searchRequest = async () => {
            const data = {
                lang: activeLocale,
                query: queryParam !== null ? queryParam : 'no_query',
            }
            const response = await axios.post(`${baseURL}/api/site/search`, {
                data: data,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.data) {
                setDataState(prev => ({
                    ...prev,
                    service: response.data.service,
                    serviceTranslate: response.data.serviceTranslate,
                    projectCategory: response.data.projectCategory,
                    projectCategoryTranslate: response.data.projectCategoryTranslate,
                    project: response.data.project,
                    projectTranslate: response.data.projectTranslate,
                    newsCategory: response.data.newsCategory,
                    newsCategoryTranslate: response.data.newsCategoryTranslate,
                    news: response.data.news,
                    newsTranslate: response.data.newsTranslate,
                    menu: response.data.menu,
                    menuTranslate: response.data.menuTranslate,
                }))
            }
        }

        searchRequest();
    }, [queryParam]);


    React.useEffect(() => {
        dispatch(updateLocaleSlug(layoutParams.localeSlugs))
    }, [dispatch, layoutParams.localeSlugs]);


    const projectCategory = new ProjectCategory();
    const newsCategory = new NewsCategory();
    useEffect(() => {
        if (
            dataState.service.length === 0 &&
            dataState.project.length === 0 &&
            dataState.news.length === 0
        ) {
            if (dataState.menu.length > 0) {
                router.push(`/${activeLocale}/${dataState.menu[0].slug}`)
            } else if (dataState.projectCategory.length > 0) {
                const slug = projectCategory.getTranslate({
                    id: dataState.projectCategory[0].id,
                    activeLocale,
                    key: "slug",
                    translateData: dataState.projectCategoryTranslate,
                });
                router.push(`/${activeLocale}/projects/category/${slug}`)
            } else if (dataState.newsCategory.length > 0) {
                const slug = newsCategory.getTranslate({
                    id: dataState.newsCategory[0].id,
                    activeLocale,
                    key: "slug",
                    translateData: dataState.newsCategoryTranslate,
                });
                router.push(`/${activeLocale}/news/category/${slug}`)
            }
        }
    }, [dataState]);


    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])

    return (
        <>
            {
                dataState.service.length === 0 &&
                dataState.projectCategory.length === 0 &&
                dataState.project.length === 0 &&
                dataState.newsCategory.length === 0 &&
                dataState.news.length === 0 &&
                dataState.menu.length === 0 && (
                    <section className="search_message">
                        <div className='container'>
                            <div className="search_default">
                                <h1 className="title">{loading ? (
                                    <Fragment>
                                        {dictionary['search']} <div className="loader_spin"></div>
                                    </Fragment>
                                ) : dictionary['no_search_result']}</h1>
                                {!loading && <SearchForm
                                    activeLocale={activeLocale}
                                    dictionary={dictionary}
                                />}
                            </div>
                        </div>
                    </section>
                )
            }
            {
                dataState.service.length > 0 && (
                    <section className='services_section'>
                        <div className="container">
                            <div className="services_wrapper">
                                {
                                    dataState.service.map((data) => (
                                        <ServiceCard
                                            activeLocale={activeLocale}
                                            data={data}
                                            translateData={dataState.serviceTranslate}
                                            searchKeyword={layoutParams.searchQuery}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                )
            }
            {
                dataState.project.length > 0 && (
                    <section className="projects_section">
                        <div className="container">
                            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 992: 2 }}>
                                <Masonry gutter='40px' columnsCount={2}>
                                    {
                                        dataState.project.map((data) => (
                                            <ProjectCard
                                                activeLocale={activeLocale}
                                                categoryTranslateData={dataState.projectCategoryTranslate}
                                                data={data}
                                                dictionary={dictionary}
                                                translateData={dataState.projectTranslate}
                                                searchKeyword={layoutParams.searchQuery}
                                            />
                                        ))
                                    }
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    </section>
                )
            }
            {
                dataState.news.length > 0 && (
                    <section className="news_main_section">
                        <div className="container">
                            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 992: 2 }}>
                                <Masonry gutter='30px' columnsCount={2}>
                                    {
                                        dataState.news.map((data) => (
                                            <NewsCard
                                                activeLocale={activeLocale}
                                                categoryTranslateData={dataState.newsCategoryTranslate}
                                                data={data}
                                                dictionary={dictionary}
                                                translateData={dataState.newsTranslate}
                                                searchKeyword={layoutParams.searchQuery}
                                            />
                                        ))
                                    }
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default React.memo(SearchPageLayout)
