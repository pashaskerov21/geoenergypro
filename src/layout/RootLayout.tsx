'use client'
import React, { useEffect, useState } from 'react'
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/index.scss';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { LocaleType } from '../types/general/type';
import { Fancybox } from '@fancyapps/ui';
import { SiteSettingDataType, SiteSettingTranslateDataType } from '../types/data/type';
import { Settings } from '../class';



type LayoutProps = {
    children: React.ReactNode,
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const RootLayout: React.FC<LayoutProps> = ({ activeLocale, children, dictionary }) => {
    useEffect(() => { Fancybox.bind("[data-fancybox]", {}) }, []);

    const setting = new Settings();
    const [settingData, setSettingData] = useState<SiteSettingDataType>();
    const [settingTranslateData, setSettingTranslateData] = useState<SiteSettingTranslateDataType[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                main: SiteSettingDataType,
                translate: SiteSettingTranslateDataType[]
            } = await setting.active(1);
            if (response.main && response.translate) {
                setSettingData(response.main);
                setSettingTranslateData(response.translate)
            }
        }
        fetchData();
    }, [])

    return (
        <Provider store={store}>
            {
                settingData && settingTranslateData && (
                    <div>
                        <div>
                            {setting.getTranslate({
                                id: 1,
                                activeLocale,
                                key: 'title',
                                translateData: settingTranslateData
                            })}
                        </div>
                        <div>
                            {setting.getTranslate({
                                id: 1,
                                activeLocale,
                                key: 'description',
                                translateData: settingTranslateData
                            })}
                        </div>
                    </div>
                )
            }
            <main>{children}</main>
        </Provider>
    )
}

export default React.memo(RootLayout)
