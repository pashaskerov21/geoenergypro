'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { AboutDataType, AboutTranslateDataType, BannerDataType, BannerTranslateDataType, NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType, PartnerDataType, ReportDataType, ReportTranslateDataType, ServiceDataType, ServiceTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '@/src/types/data/type';
import { AboutSection, BannerSection, NewsSection, ServiceSection } from '../sections';
import { i18n } from '@/i18n-config';
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '../redux/actions/LocaleAction';
import { Page } from '../class';

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const HomeLayout: React.FC<LayoutProps> = ({
    activeLocale,
    dictionary,
}) => {
    const dispatch = useDispatch();

    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: ''
        }
    });

    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const [dataState, setDataState] = useState<{
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        banner: BannerDataType[],
        bannerTranslate: BannerTranslateDataType[],
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
        about: AboutDataType,
        aboutTranslate: AboutTranslateDataType[],
        report: ReportDataType[],
        reportTranslate: ReportTranslateDataType[],
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
        newsCategory: NewsCategoryDataType[],
        newsCategoryTranslate: NewsCategoryTranslateDataType[],
        partner: PartnerDataType[],
    }>({
        setting: {} as SiteSettingDataType,
        settingTranslate: [],
        banner: [],
        bannerTranslate: [],
        service: [],
        serviceTranslate: [],
        about: {} as AboutDataType,
        aboutTranslate: [],
        report: [],
        reportTranslate: [],
        news: [],
        newsTranslate: [],
        newsCategory: [],
        newsCategoryTranslate: [],
        partner: [],
    });

    const page = new Page();
    useEffect(() => {
        const fethcData = async () => {
            const response: {
                setting: SiteSettingDataType,
                settingTranslate: SiteSettingTranslateDataType[],
                banner: BannerDataType[],
                bannerTranslate: BannerTranslateDataType[],
                service: ServiceDataType[],
                serviceTranslate: ServiceTranslateDataType[],
                about: AboutDataType,
                aboutTranslate: AboutTranslateDataType[],
                report: ReportDataType[],
                reportTranslate: ReportTranslateDataType[],
                news: NewsDataType[],
                newsTranslate: NewsTranslateDataType[],
                newsCategory: NewsCategoryDataType[],
                newsCategoryTranslate: NewsCategoryTranslateDataType[],
                partner: PartnerDataType[],
            } = await page.home();
            setDataState(prev => ({
                ...prev,
                setting: response.setting,
                settingTranslate: response.settingTranslate,
                banner: response.banner,
                bannerTranslate: response.bannerTranslate,
                service: response.service,
                serviceTranslate: response.serviceTranslate,
                about: response.about,
                aboutTranslate: response.aboutTranslate,
                report: response.report,
                reportTranslate: response.reportTranslate,
                news: response.news,
                newsTranslate: response.newsTranslate,
                newsCategory: response.newsCategory,
                newsCategoryTranslate: response.newsCategoryTranslate,
                partner: response.partner,
            }))
        }

        fethcData();
    }, []);
    return (
        <Fragment>
            {
                dataState.banner.length > 0 && (
                    <BannerSection
                        activeLocale={activeLocale}
                        dataState={dataState}
                        dictionary={dictionary}
                    />
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
            {
                dataState.about && dataState.aboutTranslate.length > 0 && (
                    <AboutSection
                        activeLocale={activeLocale}
                        dataState={dataState}
                        dictionary={dictionary}
                        sliceStatus={true}
                    />
                )
            }
            {
                dataState.news.length > 0 && (
                    <NewsSection
                        activeLocale={activeLocale}
                        dataState={dataState}
                        dictionary={dictionary}
                    />
                )
            }
        </Fragment>
    )
}

export default React.memo(HomeLayout)
