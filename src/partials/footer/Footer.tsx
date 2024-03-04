'use client'
import React, { useRef, useState } from 'react'
import { Menu, News, Project, Service, Settings } from '@/src/class';
import {
    MenuDataType,
    MenuTranslateDataType,
    NewsDataType,
    NewsTranslateDataType,
    ProjectCategoryDataType,
    ProjectCategoryTranslateDataType,
    ProjectDataType,
    ProjectTranslateDataType,
    ServiceDataType,
    ServiceTranslateDataType,
    SiteSettingDataType,
    SiteSettingTranslateDataType
} from '@/src/types/data/type';
import { LocaleType } from '@/src/types/general/type';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMagnifyingGlass, FaXTwitter, FaYoutube } from 'react-icons/fa6';

type FooterProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        menu: MenuDataType[],
        menuTranslate: MenuTranslateDataType[];
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
        news: NewsDataType[],
        newsTranslate: NewsTranslateDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
    }
}

const Footer: React.FC<FooterProps> = ({
    activeLocale,
    dataState,
    dictionary,
}) => {
    const baseURL = process.env.BASE_URL;
    const setting = new Settings();
    const menu = new Menu();
    const service = new Service();
    const project = new Project();
    const news = new News();
    return (
        <footer>
            <div className="footer_nav">
                <div className="container">
                    <div className="inner">
                        {dataState.setting.logo && dataState.setting.logo !== null && (
                            <Link href={`/${activeLocale}`} className='logo'>
                                <Image src={baseURL + dataState.setting.logo} width={205} height={125} alt='' />
                            </Link>
                        )}
                        <div className="footer_nav_links">
                            <div className="hover_line"></div>
                            {
                                dataState.menu.map((data) => (
                                    <Link key={data.id} href={`/${activeLocale + data.slug}`}>
                                        {menu.getTranslate({
                                            id: data.id,
                                            activeLocale,
                                            key: "title",
                                            translateData: dataState.menuTranslate
                                        })}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_center">
                <div className="container">
                    <div className="inner">
                        <div className="inner_left">
                            <div className="footer_center_content">
                                <div className="content_title">
                                    {setting.getTranslate({
                                        id: 1,
                                        activeLocale,
                                        key: "title",
                                        translateData: dataState.settingTranslate,
                                    })}
                                </div>
                                <div className="content_text">
                                    {setting.getTranslate({
                                        id: 1,
                                        activeLocale,
                                        key: "footer_text",
                                        translateData: dataState.settingTranslate,
                                    })}
                                </div>
                            </div>
                            <form action="#" className="search_form">
                                <input type="text" placeholder="Search..." />
                                <button type="submit">
                                    <FaMagnifyingGlass />
                                </button>
                            </form>
                        </div>
                        <div className="inner_right">
                            <div className="footer_center_col">
                                <div className="col_title">{dictionary['latest_news']}</div>
                                <div className="col_links">
                                    {
                                        dataState.news.map((data) => (
                                            <Link key={data.id} href={`/${activeLocale}/${news.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "slug",
                                                translateData: dataState.newsTranslate,
                                            })}`}>
                                                {news.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "title",
                                                    translateData: dataState.newsTranslate,
                                                })}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="footer_center_col">
                                <div className="col_title">{dictionary['services']}</div>
                                <div className="col_links">
                                    {
                                        dataState.service.map((data) => (
                                            <Link key={data.id} href={`/${activeLocale}/${service.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "slug",
                                                translateData: dataState.serviceTranslate,
                                            })}`}>
                                                {service.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "title",
                                                    translateData: dataState.serviceTranslate,
                                                })}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="footer_center_col">
                                <div className="col_title">{dictionary['projects']}</div>
                                <div className="col_links">
                                    {
                                        dataState.project.map((data) => (
                                            <Link key={data.id} href={`/${activeLocale}/${project.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "slug",
                                                translateData: dataState.projectTranslate,
                                            })}`}>
                                                {project.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "title",
                                                    translateData: dataState.projectTranslate,
                                                })}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="inner">
                        <div className="inner_left">
                            <div className="copyright">
                                {
                                    setting.getTranslate({
                                        id: 1,
                                        activeLocale,
                                        key: "copyright",
                                        translateData: dataState.settingTranslate,
                                    })
                                }
                            </div>
                        </div>
                        <div className="inner_right">
                            <div className="social_media">
                                {dataState.setting.facebook && <Link target='_blank' href={dataState.setting.facebook}><FaFacebookF/></Link>}
                                {dataState.setting.linkedin && <Link target='_blank' href={dataState.setting.linkedin}><FaLinkedinIn/></Link>}
                                {dataState.setting.instagram && <Link target='_blank' href={dataState.setting.instagram}><FaInstagram/></Link>}
                                {dataState.setting.twitter && <Link target='_blank' href={dataState.setting.twitter}><FaXTwitter/></Link>}
                                {dataState.setting.youtube && <Link target='_blank' href={dataState.setting.youtube}><FaYoutube/></Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default React.memo(Footer)
