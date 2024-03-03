'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { Banner, Settings } from '@/src/class';
import { BannerDataType, BannerTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '@/src/types/data/type';
import { BannerSection } from '../sections';

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
    const [dataState, setDataState] = useState<{
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        banner: BannerDataType[],
        bannerTranslate: BannerTranslateDataType[],
    }>({
        setting: {} as SiteSettingDataType,
        settingTranslate: [],
        banner: [],
        bannerTranslate: [],
    });

    useEffect(() => {
        const fethcData = async () => {
            const [responseSetting, responseBanner]: [
                {
                    main: SiteSettingDataType,
                    translate: SiteSettingTranslateDataType[],
                },
                {
                    main: BannerDataType[],
                    translate: BannerTranslateDataType[],
                }
            ] = await Promise.all([setting.active(1), banner.all()]);
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
        </Fragment>
    )
}

export default React.memo(HomeLayout)
