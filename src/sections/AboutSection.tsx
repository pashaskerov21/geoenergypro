'use client'
import React from 'react'
import { LocaleType } from '../types/general/type'
import { AboutDataType, AboutTranslateDataType, ReportDataType, ReportTranslateDataType } from '../types/data/type'
import { About, Report } from '../class'
import { Counter } from '../components'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        about: AboutDataType,
        aboutTranslate: AboutTranslateDataType[],
        report: ReportDataType[],
        reportTranslate: ReportTranslateDataType[]
    },
    sliceStatus: boolean,
}

const AboutSection: React.FC<SectionProps> = ({ activeLocale, dataState, dictionary, sliceStatus }) => {
    const baseURL = process.env.BASE_URL;
    const about = new About();
    const report = new Report();
    return (
        <section className="about_section">
            <div className="container">
                <div className="about_wrapper">
                    <div className="about_content" style={{ backgroundImage: `url("${dataState.about.image ? (baseURL + dataState.about.image) : (baseURL + '/bg/image-2.jpg')}")` }}>
                        <div className="content_inner">
                            <div className="section_heading">
                                <div className="section_heading_uptext">
                                    {about.getTranslate({
                                        id: 1,
                                        activeLocale,
                                        key: "sub_title",
                                        translateData: dataState.aboutTranslate,
                                    })}
                                </div>
                                <div className="section_heading_title">
                                    {about.getTranslate({
                                        id: 1,
                                        activeLocale,
                                        key: "title",
                                        translateData: dataState.aboutTranslate,
                                    })}
                                </div>
                                <div className="design_line"></div>
                            </div>
                            {
                                sliceStatus ? (
                                    <div className="about_text" dangerouslySetInnerHTML={{
                                        __html: about.getTranslate({
                                            id: 1,
                                            activeLocale,
                                            key: "text",
                                            translateData: dataState.aboutTranslate,
                                        }).length > 500 ? about.getTranslate({
                                            id: 1,
                                            activeLocale,
                                            key: "text",
                                            translateData: dataState.aboutTranslate,
                                        }).slice(0, 500) + '...' : about.getTranslate({
                                            id: 1,
                                            activeLocale,
                                            key: "text",
                                            translateData: dataState.aboutTranslate,
                                        })
                                    }} ></div>
                                ) : (
                                    <div className="about_text" dangerouslySetInnerHTML={{
                                        __html: about.getTranslate({
                                            id: 1,
                                            activeLocale,
                                            key: "text",
                                            translateData: dataState.aboutTranslate,
                                        })
                                    }} ></div>
                                )
                            }

                        </div>
                        <div className="about_report">
                            {dataState.report.map((data) => (
                                <div className="report_item" key={data.id}>
                                    <Counter value={data.value} />
                                    <div className="item_label">{report.getTranslate({
                                        id: data.id,
                                        activeLocale,
                                        key: "title",
                                        translateData: dataState.reportTranslate
                                    })}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default React.memo(AboutSection)
