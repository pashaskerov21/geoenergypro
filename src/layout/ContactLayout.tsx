'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu, Page } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { ServiceDataType, ServiceTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '../types/data/type'
import { ContactSection, ServiceSection } from '../sections'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const ContactLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const menu = new Menu();
    const slug = 'contact';
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
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
    }>({
        setting: {} as SiteSettingDataType,
        settingTranslate: [],
        service: [],
        serviceTranslate: [],
    });

    const page = new Page();
    useEffect(() => {
        const fethcData = async () => {
            const response: {
                setting: SiteSettingDataType,
                settingTranslate: SiteSettingTranslateDataType[],
                service: ServiceDataType[],
                serviceTranslate: ServiceTranslateDataType[],
            } = await page.contact();
            setDataState(prev => ({
                ...prev,
                setting: response.setting,
                settingTranslate: response.settingTranslate,
                service: response.service,
                serviceTranslate: response.serviceTranslate,
            }))
        }

        fethcData();
    }, []);
    return (
        <>
            {
                dataState.settingTranslate.length > 0 && (
                    <Fragment>
                        <PageHeading
                            activeLocale={activeLocale}
                            dictionary={dictionary}
                            pageTitleData={layoutParams.pageTitleData}
                        />
                        <ContactSection
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

export default React.memo(ContactLayout)
