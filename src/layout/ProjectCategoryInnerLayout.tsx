'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Project, ProjectCategory } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType } from '../types/data/type'
import { ProjectSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    slug: string,
}

const ProjectCategoryInnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary, slug }) => {
    const dispatch = useDispatch();
    const mainClass = new Project();
    const categoryClass = new ProjectCategory();
    const parentSlug = 'projects';
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
            const [responseActiveCategory, responseCategory, responseMain]: [
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
                    project: responseMain.main,
                    projectTranslate: responseMain.translate,
                }))
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(dataState.activeCategory.id){
            setDataState(prev => ({
                ...prev,
                project: prev.project.filter((data) => data.cat_id === dataState.activeCategory.id),
            }))
        }
    },[dataState.activeCategory])
    return (
        <>
            {dataState.activeCategory.id && dataState.project.length > 0 && (
                <Fragment>
                    <PageHeading
                        activeLocale={activeLocale}
                        dictionary={dictionary}
                        pageTitleData={layoutParams.pageTitleData}
                    />
                    <ProjectSection
                        activeLocale={activeLocale}
                        dataState={dataState}
                        dictionary={dictionary}
                    />
                </Fragment>
            )}
        </>
    )
}

export default React.memo(ProjectCategoryInnerLayout)
