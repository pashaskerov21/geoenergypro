'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { Banner, Service, Settings } from '@/src/class';
import { BannerDataType, BannerTranslateDataType, ServiceDataType, ServiceTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '@/src/types/data/type';
import { BannerSection, ServiceSection } from '../sections';

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

    const [dataState, setDataState] = useState<{
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        banner: BannerDataType[],
        bannerTranslate: BannerTranslateDataType[],
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
    }>({
        setting: {} as SiteSettingDataType,
        settingTranslate: [],
        banner: [],
        bannerTranslate: [],
        service: [],
        serviceTranslate: []
    });

    useEffect(() => {
        const fethcData = async () => {
            const [responseSetting, responseBanner, responseService]: [
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
                }
            ] = await Promise.all([setting.active(1), banner.all(), service.all()]);
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
        </Fragment>
    )
}

export default React.memo(HomeLayout)
