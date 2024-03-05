'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu, Service } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { ServiceDataType, ServiceTranslateDataType } from '../types/data/type'
import { ServiceSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const ServicesLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const menu = new Menu();
    const slug = 'services';
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

    const service = new Service();
    const [dataState, setDataState] = useState<{
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
    }>({
        service: [],
        serviceTranslate: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const [responseService]: [
                {
                    main: ServiceDataType[],
                    translate: ServiceTranslateDataType[],
                },
            ] = await Promise.all([service.all()]);

            if (responseService.main && responseService.translate) {
                setDataState(prev => ({
                    ...prev,
                    service: responseService.main,
                    serviceTranslate: responseService.translate,
                }))
            }
        }
        fetchData();
    }, []);
    return (
        <>
            {
                dataState.service.length > 0 && (
                    <Fragment>
                        <PageHeading
                            activeLocale={activeLocale}
                            dictionary={dictionary}
                            pageTitleData={layoutParams.pageTitleData}
                        />
                        <ServiceSection
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

export default React.memo(ServicesLayout)
