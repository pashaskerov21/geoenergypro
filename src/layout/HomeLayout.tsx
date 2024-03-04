'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { About, Banner, News, NewsCategory, Partner, Report, Service, Settings } from '@/src/class';
import { AboutDataType, AboutTranslateDataType, BannerDataType, BannerTranslateDataType, NewsCategoryDataType, NewsCategoryTranslateDataType, NewsDataType, NewsTranslateDataType, PartnerDataType, ReportDataType, ReportTranslateDataType, ServiceDataType, ServiceTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '@/src/types/data/type';
import { AboutSection, BannerSection, NewsSection, ServiceSection } from '../sections';

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const HomeLayout: React.FC<LayoutProps> = ({
    activeLocale,
    dictionary,
}) => {
    const setting = new Settings();
    const banner = new Banner();
    const service = new Service();
    const about = new About();
    const report = new Report();
    const news = new News();
    const newsCategory = new NewsCategory();
    const partner = new Partner();

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

    useEffect(() => {
        const fethcData = async () => {
            const [responseSetting, responseBanner, responseService, responseAbout, responseReport, responseNews, responseNewsCategory, responsePartner]: [
                {
                    main: SiteSettingDataType,
                    translate: SiteSettingTranslateDataType[],
                },
                {
                    main: BannerDataType[],
                    translate: BannerTranslateDataType[],
                },
                {
                    home: ServiceDataType[],
                    translate: ServiceTranslateDataType[],
                },
                {
                    main: AboutDataType,
                    translate: AboutTranslateDataType[],
                },
                {
                    main: ReportDataType[],
                    translate: ReportTranslateDataType[],
                },
                {
                    latest: NewsDataType[],
                    translate: NewsTranslateDataType[],
                },
                {
                    main: NewsCategoryDataType[],
                    translate: NewsCategoryTranslateDataType[],
                },
                PartnerDataType[]
            ] = await Promise.all([setting.active(1), banner.all(), service.all(), about.active(1), report.all(), news.all(), newsCategory.all(), partner.all()]);
            if (responseSetting.main && responseSetting.translate) {
                setDataState(prev => ({
                    ...prev,
                    setting: responseSetting.main,
                    settingTranslate: responseSetting.translate,
                }));
            }
            if (responseBanner.main && responseBanner.translate) {
                setDataState(prev => ({
                    ...prev,
                    banner: responseBanner.main,
                    bannerTranslate: responseBanner.translate,
                }))
            }
            if (responseService.home && responseService.translate) {
                setDataState(prev => ({
                    ...prev,
                    service: responseService.home,
                    serviceTranslate: responseService.translate,
                }))
            }
            if (responseAbout.main && responseAbout.translate) {
                setDataState(prev => ({
                    ...prev,
                    about: responseAbout.main,
                    aboutTranslate: responseAbout.translate,
                }))
            }
            if (responseReport.main && responseReport.translate) {
                setDataState(prev => ({
                    ...prev,
                    report: responseReport.main,
                    reportTranslate: responseReport.translate,
                }))
            }
            if (responseNews.latest && responseNews.translate) {
                setDataState(prev => ({
                    ...prev,
                    news: responseNews.latest,
                    newsTranslate: responseNews.translate,
                }))
            }
            if (responseNewsCategory.main && responseNewsCategory.translate) {
                setDataState(prev => ({
                    ...prev,
                    newsCategory: responseNewsCategory.main,
                    newsCategoryTranslate: responseNewsCategory.translate,
                }))
            }
            if (responsePartner) {
                setDataState(prev => ({
                    ...prev,
                    partner: responsePartner,
                }))
            }

        }

        fethcData();
    }, [])
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
