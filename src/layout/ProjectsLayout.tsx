'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu, Page, Project, ProjectCategory } from '../class'
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
    const slug = 'projects';
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

    const categoryClass = new ProjectCategory();
    const mainClass = new Project();

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
                category: ProjectCategoryDataType[],
                categoryTranslate: ProjectCategoryTranslateDataType[],
                project: ProjectDataType[],
                projectTranslate: ProjectTranslateDataType[],
            } = await page.projects();
            setDataState(prev => ({
                ...prev,
                category: response.category,
                categoryTranslate: response.categoryTranslate,
                project: response.project,
                projectTranslate: response.projectTranslate,
            }))
        }
        fetchData();
    }, [])

    return (
        <>
            {dataState.project.length > 0 && (
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

export default React.memo(ProjectsLayout)
