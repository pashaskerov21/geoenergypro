'use client'
import React from 'react'
import { GalleryDataType } from '../types/data/type'
import Link from 'next/link'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Image from 'next/image'

type SectionProps = {
    dataState: {
        gallery: GalleryDataType[],
    }
}

const GallerySection: React.FC<SectionProps> = ({ dataState }) => {
    const baseURL = process.env.BASE_URL;
    return (
        <section className="gallery_section">
            <div className="container">
                {
                    dataState.gallery.length > 0 && (
                        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2,1200: 3, 1400: 4}}>
                            <Masonry gutter='15px' columnsCount={2}>
                                {
                                    dataState.gallery.map((data) => (
                                        data.image && (
                                            <Link key={data.id} href={baseURL + data.image} className="gallery_image" data-fancybox='gallery'>
                                                <Image src={baseURL + data.image} width={1000} height={1000} alt='' priority={true} />
                                            </Link>
                                        )
                                    ))
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                    )
                }
            </div>
        </section>
    )
}

export default React.memo(GallerySection)
