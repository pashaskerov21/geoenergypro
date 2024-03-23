'use client'
import React from 'react'
import Image from 'next/image'
import { ServiceDataType, ServiceTranslateDataType } from '@/src/types/data/type'

type SectionProps = {
    dataState: {
        activeService: ServiceDataType,
        activeServiceTranslate: ServiceTranslateDataType
    }
}

const ServiceInnerSection: React.FC<SectionProps> = ({ dataState }) => {
    const baseURL = process.env.BASE_URL;
    return (
        <section className="service_detail_section">
            <div className="container">
                <div className="article_row">
                    <div className="article_col">
                        <div className="article_text" dangerouslySetInnerHTML={{ __html: dataState.activeServiceTranslate.text ?? '' }} ></div>
                    </div>
                    <div className="article_col">
                        <div className="article_image">
                            {dataState.activeService.image ?
                                <Image src={baseURL + dataState.activeService.image} width={1000} height={1000} alt="" priority={true} /> :
                                <Image src='/bg/image-3.jpg' width={1000} height={1000} alt="" priority={true} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(ServiceInnerSection)
