import { i18n } from '@/i18n-config'
import { redirect } from 'next/navigation'

const NotFound = () => {
    redirect(`/${i18n.locales[0]}/404`)
}

export default NotFound
