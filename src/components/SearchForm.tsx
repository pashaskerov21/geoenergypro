'use client'
import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { LocaleType } from '../types/general/type'
import { useRouter } from 'next/navigation'

type SearchProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const SearchForm: React.FC<SearchProps> = ({ activeLocale, dictionary }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue && searchValue !== null && searchValue !== '') {
            router.push(`/${activeLocale}/search?query=${encodeURIComponent(searchValue)}`);
            setSearchValue('');
        }
    }
    return (
        <form onSubmit={onSubmit} autoComplete="off" className="search_form">
            <input type="text" placeholder={`${dictionary['search']}...`} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button type="submit">
                <FaMagnifyingGlass />
            </button>
        </form>
    )
}

export default React.memo(SearchForm)
