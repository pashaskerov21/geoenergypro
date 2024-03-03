'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { About, Banner, Report, Service, Settings } from '@/src/class';
import { AboutDataType, AboutTranslateDataType, BannerDataType, BannerTranslateDataType, ReportDataType, ReportTranslateDataType, ServiceDataType, ServiceTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '@/src/types/data/type';
import { AboutSection, BannerSection, ServiceSection } from '../sections';

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
    });

    useEffect(() => {
        const fethcData = async () => {
            const [responseSetting, responseBanner, responseService, responseAbout, responseReport]: [
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
                }
            ] = await Promise.all([setting.active(1), banner.all(), service.all(), about.active(1), report.all()]);
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
        }

        fethcData();
    }, [])
    return (
        <Fragment>
            <BannerSection
                activeLocale={activeLocale}
                dataState={dataState}
                dictionary={dictionary}
            />
            <ServiceSection
                activeLocale={activeLocale}
                dataState={dataState}
                dictionary={dictionary}
            />
            <AboutSection
                activeLocale={activeLocale}
                dataState={dataState}
                dictionary={dictionary}
            />
        </Fragment>
    )
}

export default React.memo(HomeLayout)
