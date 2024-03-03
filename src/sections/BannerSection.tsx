import React, { Fragment } from 'react'

import { LocaleType } from '@/src/types/general/type'
import { BannerDataType, BannerTranslateDataType, SiteSettingDataType, SiteSettingTranslateDataType } from '../types/data/type'
import { Banner, Settings } from '../class';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6';



type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        banner: BannerDataType[],
        bannerTranslate: BannerTranslateDataType[],
    }
}

const BannerSection: React.FC<SectionProps> = ({ activeLocale, dictionary, dataState }) => {
    const baseURL = process.env.BASE_URL;
    const setting = new Settings();
    const banner = new Banner();
    return (
        <section className="banner_section">
            {dataState.banner.length > 0 && (
                <Swiper
                    className='banner_swiper'
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                >
                    {
                        dataState.banner.map((data) => (
                            data.image && (
                                <SwiperSlide key={data.id}>
                                    <div className="banner_slider" style={{ backgroundImage: `url(${baseURL + data.image})` }}>
                                        <div className="gradient_overlay"></div>
                                        <div className="container">
                                            <div className="banner_slider_content">
                                                <div className="content_title">
                                                    {banner.getTranslate(({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "title",
                                                        translateData: dataState.bannerTranslate,
                                                    }))}
                                                </div>
                                                <div className="design_line"></div>
                                                <div className="content_text">
                                                    {banner.getTranslate(({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "text",
                                                        translateData: dataState.bannerTranslate,
                                                    }))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        ))
                    }
                </Swiper>
            )}
            <div className="banner_contact_wrapper">
                <div className="contact_item">
                    <div className="item_icon">
                        <FaEnvelope />
                    </div>
                    <div className="item_content">
                        <div className="item_value">
                            {dataState.setting.mail}
                        </div>
                        <div className="item_text">
                            {setting.getTranslate({
                                id: 1,
                                activeLocale,
                                key: "mail_text",
                                translateData: dataState.settingTranslate,
                            })}
                        </div>
                    </div>
                </div>
                <div className="contact_item">
                    <div className="item_icon">
                        <FaPhone />
                    </div>
                    <div className="item_content">
                        <div className="item_value">
                            {dataState.setting.phone}
                        </div>
                        <div className="item_text">
                            {setting.getTranslate({
                                id: 1,
                                activeLocale,
                                key: "phone_text",
                                translateData: dataState.settingTranslate,
                            })}
                        </div>
                    </div>
                </div>
                <div className="contact_item">
                    <div className="item_icon">
                        <FaLocationDot />
                    </div>
                    <div className="item_content">
                        <div className="item_value">
                            {setting.getTranslate({
                                id: 1,
                                activeLocale,
                                key: "title",
                                translateData: dataState.settingTranslate,
                            })}
                        </div>
                        <div className="item_text">
                            {setting.getTranslate({
                                id: 1,
                                activeLocale,
                                key: "address_text",
                                translateData: dataState.settingTranslate,
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(BannerSection);
