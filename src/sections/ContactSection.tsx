'use client'
import React from 'react'
import { LocaleType } from '../types/general/type'
import { SiteSettingDataType, SiteSettingTranslateDataType } from '../types/data/type'
import { Settings } from '../class'
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6'
import { ContactForm } from '../components'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
    }
}

const ContactSection: React.FC<SectionProps> = ({ activeLocale, dictionary, dataState }) => {
    const setting = new Settings();
    return (
        <section className="contact_section">
            <div className="container">
                <div className="contact_content_row">
                    <div className="content_col">
                        <div className="content_heading">
                            <h4 className="up_title">{dictionary['contact_up_title']}</h4>
                            <h2 className="main_title">{dictionary['contact_main_title']}</h2>
                            <div className="design_line"></div>
                            <div className="text">{dictionary['contact_text']}</div>
                        </div>
                        <div className="contact_parameters">
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
                    </div>
                    <div className="content_col">
                        <ContactForm activeLocale={activeLocale} dictionary={dictionary} />
                    </div>
                </div>
            </div>
            {
                dataState.setting.address_url && dataState.setting.address_url !== '' && (
                    <div className="map_container">
                        <iframe src={dataState.setting.address_url} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                )
            }
        </section>
    )
}

export default React.memo(ContactSection)
