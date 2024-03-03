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
import { MenuDataType, MenuTranslateDataType, ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType, ServiceDataType, ServiceTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '../types/data/type';
import { Menu, Project, ProjectCategory, Service, Settings } from '../class';
import Header from '../partials/header/Header';



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
    });

    useEffect(() => {
        const fetchData = async () => {
            const [responseSetting, responseMenu, responseService, responseProjectCategory, responseProject]: [
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
            ] = await Promise.all([setting.active(1), menu.all(), service.all(), projectCategory.all(), project.all()]);
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

        }
        fetchData();
    }, [])

    return (
        <Provider store={store}>
            <Header
                activeLocale={activeLocale}
                dataState={dataState}
                dictionary={dictionary}
            />
            <main>{children}</main>
        </Provider>
    )
}

export default React.memo(RootLayout)
