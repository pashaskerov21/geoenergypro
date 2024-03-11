'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu, Page } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { AboutDataType, AboutTranslateDataType, ReportDataType, ReportTranslateDataType, ServiceDataType, ServiceTranslateDataType } from '../types/data/type'
import { AboutSection, ServiceSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const AboutLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const menu = new Menu();
    const slug = 'about';
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
        about: AboutDataType,
        aboutTranslate: AboutTranslateDataType[],
        report: ReportDataType[],
        reportTranslate: ReportTranslateDataType[],
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
    }>({
        about: {} as AboutDataType,
        aboutTranslate: [],
        report: [],
        reportTranslate: [],
        service: [],
        serviceTranslate: [],
    });

    const page = new Page();
    useEffect(() => {
        const fetchData = async () => {
            const response: {
                about: AboutDataType,
                aboutTranslate: AboutTranslateDataType[],
                report: ReportDataType[],
                reportTranslate: ReportTranslateDataType[],
                service: ServiceDataType[],
                serviceTranslate: ServiceTranslateDataType[],
            } = await page.about();
            setDataState(prev => ({
                ...prev,
                about: response.about,
                aboutTranslate: response.aboutTranslate,
                report: response.report,
                reportTranslate: response.reportTranslate,
                service: response.service,
                serviceTranslate: response.serviceTranslate,
            }))
        }
        fetchData();
    }, []);


    return (
        <>
            {
                dataState.aboutTranslate.length > 0 && (
                    <Fragment>
                        <PageHeading
                            activeLocale={activeLocale}
                            dictionary={dictionary}
                            pageTitleData={layoutParams.pageTitleData}
                        />
                        <AboutSection
                            activeLocale={activeLocale}
                            dataState={dataState}
                            dictionary={dictionary}
                        />
                    </Fragment>
                )
            }
            {
                dataState.service.length > 0 && (
                    <ServiceSection
                        activeLocale={activeLocale}
                        dataState={dataState}
                        dictionary={dictionary}
                    />
                )
            }
        </>
    )
}

export default React.memo(AboutLayout)
