'use client'
import React, { useEffect } from 'react'
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/index.scss';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { LocaleType } from '../types/general/type';
import { Fancybox } from '@fancyapps/ui';



type LayoutProps = {
    children: React.ReactNode,
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const RootLayout: React.FC<LayoutProps> = ({ activeLocale, children, dictionary }) => {
    useEffect(() => { Fancybox.bind("[data-fancybox]", {}) }, []);
    return (
        <Provider store={store}>
            <main>{children}</main>
        </Provider>
    )
}

export default React.memo(RootLayout)
