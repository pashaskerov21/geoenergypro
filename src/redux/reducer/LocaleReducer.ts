import { Reducer } from "react"
import { UPDATE_LOCALE_SLUG } from "../ActionTypes"
import { i18n } from "@/i18n-config"
import { LocaleStateType } from "@/src/types/general/type"


const initialState: LocaleStateType[] = i18n.locales.map((locale) => {
    return {
        locale: locale,
        slug: "",
    }
})

const LocaleReducer: Reducer<LocaleStateType[], any> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOCALE_SLUG:
            return [...action.payload]
        default:
            return state;
    }
}
export default LocaleReducer;