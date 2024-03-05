'use client'
import React, { Fragment, useEffect, useState } from 'react'
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
import { Menu, News, Project, ProjectCategory, Service, Settings } from '../class';
import Header from '../partials/header/Header';
import Footer from '../partials/footer/Footer';
import { FaGear } from 'react-icons/fa6';
import { Preloader } from '../components';



type LayoutProps = {
    children: React.ReactNode,
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const RootLayout: React.FC<LayoutProps> = ({ activeLocale, children, dictionary }) => {
    useEffect(() => { Fancybox.bind("[data-fancybox]", {}) }, []);

    const menu = new Menu();
    const setting = new Settings();
    const service = new Service();
    const projectCategory = new ProjectCategory();
    const project = new Project();
    const news = new News();

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

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            const [responseSetting, responseMenu, responseService, responseProjectCategory, responseProject, responseNews]: [
                {
                    main: SiteSettingDataType,
                    translate: SiteSettingTranslateDataType[]
                },
                {
                    main: MenuDataType[],
                    translate: MenuTranslateDataType[]
                },
                {
                    main: ServiceDataType[],
                    translate: ServiceTranslateDataType[],
                },
                {
                    main: ProjectCategoryDataType[],
                    translate: ProjectCategoryTranslateDataType[],
                },
                {
                    main: ProjectDataType[],
                    translate: ProjectTranslateDataType[],
                },
                {
                    latest: NewsDataType[],
                    translate: NewsTranslateDataType[],
                },
            ] = await Promise.all([setting.active(1), menu.all(), service.all(), projectCategory.all(), project.all(), news.all()]);
            if (responseSetting.main && responseSetting.translate) {
                setDataState(prev => ({
                    ...prev,
                    setting: responseSetting.main,
                    settingTranslate: responseSetting.translate,
                }))
            };
            if (responseMenu.main && responseMenu.translate) {
                setDataState(prev => ({
                    ...prev,
                    menu: responseMenu.main,
                    menuTranslate: responseMenu.translate,
                }))
            }
            if (responseService.main && responseService.translate) {
                setDataState(prev => ({
                    ...prev,
                    service: responseService.main,
                    serviceTranslate: responseService.translate,
                }))
            }
            if (responseProjectCategory.main && responseProjectCategory.translate) {
                setDataState(prev => ({
                    ...prev,
                    projectCategory: responseProjectCategory.main,
                    projectCategoryTranslate: responseProjectCategory.translate,
                }))
            }
            if (responseProject.main && responseProject.translate) {
                setDataState(prev => ({
                    ...prev,
                    project: responseProject.main,
                    projectTranslate: responseProject.translate,
                }))
            }
            if (responseNews.latest && responseNews.translate) {
                setDataState(prev => ({
                    ...prev,
                    news: responseNews.latest,
                    newsTranslate: responseNews.translate,
                }))
            }
        }
        fetchData();

        setLoading(false);
    }, [])

    return (
        <Provider store={store}>
            {loading && <Preloader />}
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
