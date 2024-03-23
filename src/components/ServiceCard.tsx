'use client'
import React, { Fragment } from 'react'
import { ServiceDataType, ServiceTranslateDataType } from '../types/data/type'
import Image from 'next/image'
import Link from 'next/link'
import { LocaleType } from '../types/general/type'
import { Service } from '../class'
import { FaArrowRight } from 'react-icons/fa6'

type CardProps = {
    activeLocale: LocaleType,
    data: ServiceDataType,
    translateData: ServiceTranslateDataType[],
    searchKeyword?: string,
}

const Title: React.FC<{ title: string, searchKeyword?: string }> = ({ searchKeyword, title }) => {
    if (searchKeyword) {
        const regex = new RegExp(`(${searchKeyword})`, 'gi');
        const parts = title.split(regex);
        return (
            <Fragment>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <span key={index} className='search_query'>
                            {part}
                        </span>
                    ) : (
                        <Fragment key={index}>{part}</Fragment>
                    )
                )}
            </Fragment>
        )
    } else {
        return (
            <Fragment>{title}</Fragment>
        )
    }
}

const ServiceCard: React.FC<CardProps> = ({ activeLocale, data, translateData, searchKeyword, }) => {
    const baseURL = process.env.BASE_URL;
    const service = new Service();
    return (
        <div className="service_card" key={data.id}>
            <div className="card_icon">
                {data.icon && <Image src={baseURL + data.icon} width={60} height={60} alt='' />}
            </div>
            <Link href={`/${activeLocale}/services/${service.getTranslate({
                id: data.id,
                activeLocale,
                key: "slug",
                translateData: translateData,
            })}`} className="card_title">
                <Title
                    title={service.getTranslate({
                        id: data.id,
                        activeLocale,
                        key: "title",
                        translateData: translateData,
                    })}
                    searchKeyword={searchKeyword}
                />
            </Link>
            <div className="design_line"></div>
            <div className="card_text" dangerouslySetInnerHTML={{
                __html: service.getTranslate({
                    id: data.id,
                    activeLocale,
                    key: "text",
                    translateData: translateData,
                }).length > 160 ? service.getTranslate({
                    id: data.id,
                    activeLocale,
                    key: "text",
                    translateData: translateData,
                }).slice(0, 160) : service.getTranslate({
                    id: data.id,
                    activeLocale,
                    key: "text",
                    translateData: translateData,
                })
            }}></div>
            <Link href={`/${activeLocale}/services/${service.getTranslate({
                id: data.id,
                activeLocale,
                key: "slug",
                translateData: translateData,
            })}`} className='arrow_btn'><FaArrowRight /></Link>
        </div>
    )
}

export default React.memo(ServiceCard)
