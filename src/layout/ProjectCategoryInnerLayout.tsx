'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Page, Project, ProjectCategory } from '../class'
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

    const page = new Page();

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                activeCategory: ProjectCategoryDataType,
                activeCategoryTranslate: ProjectCategoryTranslateDataType,
                category: ProjectCategoryDataType[],
                categoryTranslate: ProjectCategoryTranslateDataType[],
                project: ProjectDataType[],
                projectTranslate: ProjectTranslateDataType[],
            } | 'invalid_slug' = await page.project_category_inner({ lang: activeLocale, slug });
            if (response !== 'invalid_slug') {
                setDataState(prev => ({
                    ...prev,
                    activeCategory: response.activeCategory,
                    activeCategoryTranslate: response.activeCategoryTranslate,
                    category: response.category,
                    categoryTranslate: response.categoryTranslate,
                    project: response.project,
                    projectTranslate: response.projectTranslate,
                }))
            }
        }
        fetchData();
    }, []);
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
