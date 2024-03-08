import { LocaleType } from "../general/type"

type SiteSettingDataType = {
    id?: number,
    logo: string | null,
    logo_white: string | null,
    favicon: string | null,
    pdf: string | null,
    mail: string | null,
    phone: string | null,
    hot_line: string | null,
    facebook: string | null,
    linkedin: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    author_url: string | null,
    address_url: string | null,
}

type SiteSettingTranslateDataType = {
    id?: number,
    setting_id?: number | null,
    lang: LocaleType,
    title: string | null,
    description: string | null,
    author: string | null,
    keywords: string | null,
    copyright: string | null,
    address_text: string | null,
    mail_text: string | null,
    phone_text: string | null,
    footer_text: string | null,
}

type MenuDataType = {
    id: number,
    slug: string,
    order: number,
}
type MenuTranslateDataType = {
    id: number,
    menu_id: number,
    lang: LocaleType,
    title: string,
    meta_title: string | null,
    meta_description: string | null,
    meta_keywords: string | null,
}

type BannerDataType = {
    id: number,
    image: string | null,
    order: number,
}
type BannerTranslateDataType = {
    id: number,
    banner_id: number,
    lang: LocaleType,
    title: string | null,
    text: string | null,
}

type ServiceDataType = {
    id: number,
    icon: string | null,
    image: string | null,
    order: number,
    status: number,
}
type ServiceTranslateDataType = {
    id: number,
    service_id: number,
    lang: LocaleType,
    title: string | null,
    slug: string | null,
    text: string | null,
}
type AboutDataType = {
    id: number,
    image: string | null,
}
type AboutTranslateDataType = {
    id: number,
    about_id: number,
    lang: LocaleType,
    title: string | null,
    sub_title: string | null,
    text: string | null,
}
type ReportDataType = {
    id: number,
    value: number,
    order: number,
}
type ReportTranslateDataType = {
    id: number,
    report_id: number,
    lang: LocaleType,
    title: string | null,
}
type ProjectCategoryDataType = {
    id: number,
    order: number,
}
type ProjectCategoryTranslateDataType = {
    id: number,
    cat_id: number,
    lang: LocaleType,
    title: string | null,
    slug: string | null,
}
type ProjectDataType = {
    id: number,
    image: string | null,
    cat_id: number,
    order: number,
}
type ProjectTranslateDataType = {
    id: number,
    project_id: number,
    lang: LocaleType,
    title: string | null,
    slug: string | null,
    text: string | null,
    client: string | null,
    delivery_date: string | null,
    project_type: string | null,
    location: string | null,
}
type ProjectGalleryDataType = {
    id: number,
    project_id: number,
    image: string | null,
    order: number,
}
type NewsCategoryDataType = {
    id: number,
    order: number,
}
type NewsCategoryTranslateDataType = {
    id: number,
    cat_id: number,
    lang: LocaleType,
    title: string | null,
    slug: string | null,
}
type NewsDataType = {
    id: number,
    image: string | null,
    cat_id: number,
    order: number,
}
type NewsTranslateDataType = {
    id: number,
    news_id: number,
    lang: LocaleType,
    title: string | null,
    slug: string | null,
    text: string | null,
    date: string | null,
    author: string | null,
}
type NewsGalleryDataType = {
    id: number,
    news_id: number,
    image: string | null,
    order: number,
}
type GalleryDataType = {
    id: number,
    image: string | null,
    order: number,
}
type PartnerDataType = {
    id: number,
    image: string | null,
    url: string | null,
    order: number,
}

type SettingFileDataKeyType = "logo" | "logo_white" | "favicon" | "pdf";
type SettingMainDataKeyType = "mail" | "phone" | "hot_line" | "facebook" | "linkedin" | "twitter" | "instagram" | "youtube" | "author_url" | "address_url";
type SettingTranslateDataKeyType = "lang" | "title" | "description" | "author" | "keywords" | "copyright" | "address_text" | "mail_text" | "phone_text" | "footer_text";

type MenuTranslateKeyType = "title" | "meta_title" | "meta_description" | "meta_keywords";
type AboutTranslateKeyType = "title" | "sub_title" | "text";
type ProjectTranslateKeyType = "title" | "slug" | "text" | "client" | "delivery_date" | "project_type" | "location";
type NewsTranslateKeyType = "title" | "slug" | "text" | "date" | "author";

type MessageDataType = {
    fullname: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
}

export type {
    SiteSettingDataType,
    SiteSettingTranslateDataType,
    MenuDataType,
    MenuTranslateDataType,
    BannerDataType,
    BannerTranslateDataType,
    ServiceDataType,
    ServiceTranslateDataType,
    AboutDataType,
    AboutTranslateDataType,
    ReportDataType,
    ReportTranslateDataType,
    ProjectCategoryDataType,
    ProjectCategoryTranslateDataType,
    ProjectDataType,
    ProjectTranslateDataType,
    ProjectGalleryDataType,
    NewsCategoryDataType,
    NewsCategoryTranslateDataType,
    NewsDataType,
    NewsTranslateDataType,
    NewsGalleryDataType,
    GalleryDataType,
    PartnerDataType,

    SettingFileDataKeyType,
    SettingMainDataKeyType,
    SettingTranslateDataKeyType,
    MenuTranslateKeyType,
    AboutTranslateKeyType,
    ProjectTranslateKeyType,
    NewsTranslateKeyType,

    MessageDataType,
}