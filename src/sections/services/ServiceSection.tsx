'use client'
import { Service } from '@/src/class'
import { ServiceDataType, ServiceTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[]
    }
}

const ServiceSection: React.FC<SectionProps> = ({
    activeLocale,
    dataState,
    dictionary,
}) => {
    const baseURL = process.env.BASE_URL;
    const service = new Service();
    return (
        <section className="services_section">
            <div className="container cards_container">
                <div className="section_heading">
                    <h2 className="section_heading_title">
                        {dictionary['services_section_title_1']}
                    </h2>
                </div>
                {
                    dataState.service.length > 0 && (
                        <div className="services_wrapper">
                            {
                                dataState.service.map((data) => (
                                    <div className="service_card" key={data.id}>
                                        <div className="card_icon">
                                            {data.icon && <Image src={baseURL + data.icon} width={60} height={60} alt='' />}
                                        </div>
                                        <div className="card_title">
                                            {service.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "title",
                                                translateData: dataState.serviceTranslate,
                                            })}
                                        </div>
                                        <div className="design_line"></div>
                                        <div className="card_text" dangerouslySetInnerHTML={{
                                            __html: service.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "text",
                                                translateData: dataState.serviceTranslate,
                                            }).length > 160 ? service.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "text",
                                                translateData: dataState.serviceTranslate,
                                            }).slice(0, 160) : service.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "text",
                                                translateData: dataState.serviceTranslate,
                                            })
                                        }} />
                                        <Link href={`/${activeLocale}/services/${service.getTranslate({
                                            id: data.id,
                                            activeLocale,
                                            key: "slug",
                                            translateData: dataState.serviceTranslate,
                                        })}`} className='arrow_btn'><FaArrowRight /></Link>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className="services_content" style={{ backgroundImage: 'url("/bg/image-1.jpg")' }}>
                <div className="bg_layer"></div>
                <div className="container">
                    <div className="section_heading color_white">
                        <div className="section_heading_title">
                            {dictionary['services_section_title_2']}
                        </div>
                        <div className="design_line"></div>
                        <div className="section_heading_text">
                            {dictionary['services_section_text']}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(ServiceSection)
