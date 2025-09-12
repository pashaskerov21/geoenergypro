'use client'
import { ServiceCard } from '@/src/components'
import { ServiceDataType, ServiceTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import React from 'react'

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
                        <ul className="services_wrapper">
                            {
                                dataState.service.map((data) => (
                                    <li key={data.id}>
                                        <ServiceCard
                                            activeLocale={activeLocale}
                                            data={data}
                                            translateData={dataState.serviceTranslate}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="services_content" style={{ backgroundImage: 'url("/bg/image-1.jpg")' }}>
                <div className="bg_layer"></div>
                <div className="container">
                    <div className="section_heading color_white">
                        <h3 className="section_heading_title">
                            {dictionary['services_section_title_2']}
                        </h3>
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
