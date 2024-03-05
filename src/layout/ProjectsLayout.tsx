'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu, Project, ProjectCategory } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType } from '../types/data/type'
import { ProjectSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const ProjectsLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const menu = new Menu();
    const mainClass = new Project();
    const categoryClass = new ProjectCategory();
    const mainSlug = 'projects';
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
                slug: mainSlug
            }
        }),
    });

    const urlParams = new URLSearchParams(window.location.search);
    const categorySlug = urlParams.get('category');

    useEffect(() => {
        const getParams = async () => {
            if (categorySlug === null) {
                const titleData = await menu.getPageTitleData(mainSlug, activeLocale);
                setLayoutParams(prev => ({
                    ...prev,
                    pageTitleData: titleData,
                }));
            } else {
                const pageTitleData: PageTitleDataType = await categoryClass.getPageTitleData(mainSlug, categorySlug, activeLocale);
                const localeSlugs: LocaleStateType[] = await categoryClass.getLocaleSlugs(mainSlug, categorySlug, activeLocale);
                setLayoutParams(prev => ({
                    ...prev,
                    pageTitleData: pageTitleData,
                    localeSlugs: localeSlugs,
                }))
            }

        }

        getParams();
    }, [categorySlug]);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(layoutParams.localeSlugs))
    }, [dispatch]);



    const [dataState, setDataState] = useState<{
        activeCategory: ProjectCategoryDataType,
        activeCategoryTranslate: ProjectCategoryTranslateDataType,
        category: ProjectCategoryDataType[],
        categoryTranslate: ProjectCategoryTranslateDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
    }>({
        activeCategory: {} as ProjectCategoryDataType,
        activeCategoryTranslate: {} as ProjectCategoryTranslateDataType,
        category: [],
        categoryTranslate: [],
        project: [],
        projectTranslate: [],
    });


    useEffect(() => {
        const fetchData = async () => {
            const [responseActiveCategory, responseCategory, responseProject]: [
                {
                    main: ProjectCategoryDataType,
                    translate: ProjectCategoryTranslateDataType,
                },
                {
                    main: ProjectCategoryDataType[],
                    translate: ProjectCategoryTranslateDataType[],
                },
                {
                    main: ProjectDataType[],
                    translate: ProjectTranslateDataType[],
                },
            ] = await Promise.all([categoryClass.activeSlug({ lang: activeLocale, slug: categorySlug ?? 'no_category' }), categoryClass.all(), mainClass.all()]);
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
            if (responseProject.main && responseProject.translate) {
                setDataState(prev => ({
                    ...prev,
                    project: responseProject.main,
                    projectTranslate: responseProject.translate,
                }))
            }
        }
        fetchData();
    }, [categorySlug]);


    useEffect(() => {
        if (categorySlug !== null && dataState.activeCategory.id) {
            setDataState(prev => ({
                ...prev,
                project: prev.project.filter((data) => data.cat_id === dataState.activeCategory.id),
            }));
        }
    }, [categorySlug, dataState.activeCategory])

    useEffect(() => {
        console.log(dataState)
    }, [dataState])

    return (
        <>
            {dataState.project.length > 0 && (
                <Fragment>
                    <PageHeading
                        activeLocale={activeLocale}
                        dictionary={dictionary}
                        pageTitleData={layoutParams.pageTitleData}
                    />
                    <ProjectSection activeLocale={activeLocale} dataState={dataState} dictionary={dictionary} />
                </Fragment>
            )}
        </>
    )
}

export default React.memo(ProjectsLayout)
