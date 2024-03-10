'use client'
import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { LocaleType } from '../types/general/type'

type SearchProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const SearchForm: React.FC<SearchProps> = ({activeLocale,dictionary}) => {
    return (
        <form action="#" className="search_form">
            <input type="text" placeholder={`${dictionary['search']}...`} />
            <button type="submit">
                <FaMagnifyingGlass />
            </button>
        </form>
    )
}

export default React.memo(SearchForm)
