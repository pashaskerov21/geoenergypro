'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Page, Project } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { ProjectDataType, ProjectGalleryDataType, ProjectTranslateDataType } from '../types/data/type'
import { ProjectInnerSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    slug: string,
}

const ProjectInnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary, slug }) => {
    const dispatch = useDispatch();
    const mainClass = new Project();
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


    const [dataState, setDataState] = useState<{
        activeProject: ProjectDataType,
        activeProjectTranslate: ProjectTranslateDataType,
        activeProjectGallery: ProjectGalleryDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
    }>({
        activeProject: {} as ProjectDataType,
        activeProjectTranslate: {} as ProjectTranslateDataType,
        activeProjectGallery: [],
        project: [],
        projectTranslate: [],
    });

    const page = new Page();

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                activeProject: ProjectDataType,
                activeProjectTranslate: ProjectTranslateDataType,
                activeProjectGallery: ProjectGalleryDataType[],
                project: ProjectDataType[],
                projectTranslate: ProjectTranslateDataType[],
            } | 'invalid_slug' = await page.project_inner({ lang: activeLocale, slug });
            if (response !== 'invalid_slug') {
                setDataState(prev => ({
                    ...prev,
                    activeProject: response.activeProject,
                    activeProjectTranslate: response.activeProjectTranslate,
                    activeProjectGallery: response.activeProjectGallery,
                    project: response.project,
                    projectTranslate: response.projectTranslate,
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
        backUrl: `/${activeLocale}/projects`
    });

    useEffect(() => {
        if (dataState.activeProject.id) {
            let index = dataState.project.findIndex(item => item.id === dataState.activeProject.id);
            let prevUrl = index === 0 ? null : `/${activeLocale}/projects/${mainClass.getTranslate({
                id: dataState.project[index - 1].id,
                activeLocale,
                key: "slug",
                translateData: dataState.projectTranslate,
            })}`;
            let nextUrl = index === (dataState.project.length - 1) ? null : `/${activeLocale}/projects/${mainClass.getTranslate({
                id: dataState.project[index + 1].id,
                activeLocale,
                key: "slug",
                translateData: dataState.projectTranslate,
            })}`;
            setNavigationState(prev => ({
                ...prev,
                index: index,
                prevUrl: prevUrl,
                nextUrl: nextUrl,
            }));
        }
    }, [dataState.activeProject, dataState.project]);

    return (
        <>
            {
                dataState.project.length > 0 && dataState.activeProject.id && (
                    <Fragment>
                        <PageHeading
                            activeLocale={activeLocale}
                            dictionary={dictionary}
                            pageTitleData={layoutParams.pageTitleData}
                        />
                        <ProjectInnerSection
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

export default React.memo(ProjectInnerLayout)
