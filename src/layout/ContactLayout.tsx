'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu, Settings } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { SiteSettingDataType, SiteSettingTranslateDataType } from '../types/data/type'
import { ContactSection } from '../sections'

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

    const setting = new Settings();
    const [dataState, setDataState] = useState<{
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
    }>({
        setting: {} as SiteSettingDataType,
        settingTranslate: [],
    });

    useEffect(() => {
        const fethcData = async () => {
            const [responseSetting]: [
                {
                    main: SiteSettingDataType,
                    translate: SiteSettingTranslateDataType[],
                },
            ] = await Promise.all([setting.active(1)]);
            if (responseSetting.main && responseSetting.translate) {
                setDataState(prev => ({
                    ...prev,
                    setting: responseSetting.main,
                    settingTranslate: responseSetting.translate,
                }));
            }
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
        </>
    )
}

export default React.memo(ContactLayout)
