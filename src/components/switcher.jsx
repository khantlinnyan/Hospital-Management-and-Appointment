'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '../../i18n'

export default function Switcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <ul className='flex gap-x-1 mr-2'>
      {i18n.locales.map(locale => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className='rounded-md border !bg-green-500 px-3 py-2 text-white'
            >
              {locale}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
