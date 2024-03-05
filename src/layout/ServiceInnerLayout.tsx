'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Service } from '../class'
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

    useEffect(() => {
        const fetchData = async () => {
            const [responseActive, responseAll]: [
                {
                    main: ServiceDataType,
                    translate: ServiceTranslateDataType,
                },
                {
                    main: ServiceDataType[],
                    translate: ServiceTranslateDataType[],
                },
            ] = await Promise.all([mainClass.activeSlug({ lang: activeLocale, slug }), mainClass.all(),]);
            if (responseActive.main && responseActive.translate) {
                setDataState(prev => ({
                    ...prev,
                    activeService: responseActive.main,
                    activeServiceTranslate: responseActive.translate
                }))
            }
            if (responseAll.main && responseAll.translate) {
                setDataState(prev => ({
                    ...prev,
                    service: responseAll.main.filter((data) => data.id !== prev.activeService.id),
                    serviceTranslate: responseAll.translate
                }))
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <PageHeading
                activeLocale={activeLocale}
                dictionary={dictionary}
                pageTitleData={layoutParams.pageTitleData}
            />
            <ServiceInnerSection dataState={dataState} />
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
