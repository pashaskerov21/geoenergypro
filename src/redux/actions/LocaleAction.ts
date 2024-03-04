import { LocaleStateType } from "@/src/types/general/type"
import { UPDATE_LOCALE_SLUG } from "../ActionTypes"

export const updateLocaleSlug = (data: LocaleStateType[]) => {
    return{
        type: UPDATE_LOCALE_SLUG,
        payload: data,
    }
}
