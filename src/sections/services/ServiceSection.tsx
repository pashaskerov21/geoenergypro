'use client'
import { Service } from '@/src/class'
import { ServiceCard } from '@/src/components'
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
                                    <ServiceCard
                                        activeLocale={activeLocale}
                                        data={data}
                                        translateData={dataState.serviceTranslate}
                                    />
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
