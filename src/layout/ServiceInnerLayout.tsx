'use client'
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Page, Service } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { ServiceDataType, ServiceTranslateDataType } from '../types/data/type'
import { ServiceInnerSection, ServiceSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    slug: string,
}

const ServiceInnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary, slug }) => {
    const dispatch = useDispatch();
    const mainClass = new Service();
    const parentSlug = 'services';
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
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
        activeService: ServiceDataType,
        activeServiceTranslate: ServiceTranslateDataType
    }>({
        service: [],
        serviceTranslate: [],
        activeService: {} as ServiceDataType,
        activeServiceTranslate: {} as ServiceTranslateDataType
    });

    const page = new Page();

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                service: ServiceDataType[],
                serviceTranslate: ServiceTranslateDataType[],
                activeService: ServiceDataType,
                activeServiceTranslate: ServiceTranslateDataType
            } | 'invalid_slug' = await page.service_inner({ lang: activeLocale, slug });
            if (response !== 'invalid_slug') {
                setDataState(prev => ({
                    ...prev,
                    service: response.service,
                    serviceTranslate: response.serviceTranslate,
                    activeService: response.activeService,
                    activeServiceTranslate: response.activeServiceTranslate
                }))
            }

        }
        fetchData();
    }, [])

    return (
        <>
            {
                dataState.activeService.id && (
                    <Fragment>
                        <PageHeading
                            activeLocale={activeLocale}
                            dictionary={dictionary}
                            pageTitleData={layoutParams.pageTitleData}
                        />
                        <ServiceInnerSection dataState={dataState} />
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

export default React.memo(ServiceInnerLayout)
