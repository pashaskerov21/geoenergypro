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
import { MenuDataType, MenuTranslateDataType, NewsDataType, NewsTranslateDataType, ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType, ServiceDataType, ServiceTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '../types/data/type';
import Header from '../partials/header/Header';
import Footer from '../partials/footer/Footer';
import { Preloader } from '../components';
import { Page } from '../class';
import { HiOutlineArrowNarrowUp } from "react-icons/hi";


type LayoutProps = {
    children: React.ReactNode,
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const RootLayout: React.FC<LayoutProps> = ({ activeLocale, children, dictionary }) => {
    useEffect(() => { Fancybox.bind("[data-fancybox]", {}) }, []);

    const [dataState, setDataState] = useState<{
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        menu: MenuDataType[],
        menuTranslate: MenuTranslateDataType[];
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
        projectCategory: ProjectCategoryDataType[],
        projectCategoryTranslate: ProjectCategoryTranslateDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
    }>({
        setting: {} as SiteSettingDataType,
        settingTranslate: [],
        menu: [],
        menuTranslate: [],
        service: [],
        serviceTranslate: [],
        projectCategory: [],
        projectCategoryTranslate: [],
        project: [],
        projectTranslate: [],
        news: [],
        newsTranslate: [],
    });

    const page = new Page();
    const [loading, setLoading] = useState<boolean>(true);

    const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false);
    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (this.scrollY > 300) {
                setShowScrollBtn(true);
            } else {
                setShowScrollBtn(false)
            }
        });

        return () => {
            window.removeEventListener('scroll', () => { });
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                setting: SiteSettingDataType,
                settingTranslate: SiteSettingTranslateDataType[],
                menu: MenuDataType[],
                menuTranslate: MenuTranslateDataType[],
                service: ServiceDataType[],
                serviceTranslate: ServiceTranslateDataType[],
                projectCategory: ProjectCategoryDataType[],
                projectCategoryTranslate: ProjectCategoryTranslateDataType[],
                project: ProjectDataType[],
                projectTranslate: ProjectTranslateDataType[],
                news: NewsDataType[],
                newsTranslate: NewsTranslateDataType[],
            } = await page.root();
            setDataState(prev => ({
                ...prev,
                setting: response.setting,
                settingTranslate: response.settingTranslate,
                menu: response.menu,
                menuTranslate: response.menuTranslate,
                service: response.service,
                serviceTranslate: response.serviceTranslate,
                projectCategory: response.projectCategory,
                projectCategoryTranslate: response.projectCategoryTranslate,
                project: response.project,
                projectTranslate: response.projectTranslate,
                news: response.news,
                newsTranslate: response.newsTranslate,
            }));
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (dataState.menu.length > 0) {
            setLoading(false);
        }
    }, [dataState.menu])

    return (
        <Provider store={store}>
            {loading && <Preloader />}
            {showScrollBtn && <button type='button' className='scroll_button' onClick={() => window.scrollTo(0, 0)}><HiOutlineArrowNarrowUp/></button>}
            {
                dataState.menu.length > 0 && <Header
                    activeLocale={activeLocale}
                    dataState={dataState}
                    dictionary={dictionary}
                />
            }
            <main>{children}</main>
            {
                dataState.menu.length > 0 && <Footer
                    activeLocale={activeLocale}
                    dataState={dataState}
                    dictionary={dictionary}
                />
            }
        </Provider>
    )
}

export default React.memo(RootLayout)
