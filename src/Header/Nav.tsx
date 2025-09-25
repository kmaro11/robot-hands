import { Header } from '@/payload-types'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface HeaderClientProps {
  navItems: Header
  closeMenu: () => void
}

export const Nav = ({ navItems, closeMenu }: HeaderClientProps) => {
  const slug = (item: any) => {
    if (
      item.type === 'reference' &&
      typeof item.reference?.value === 'object' &&
      item.reference.value.slug
    )
      return `/${item.reference.value.slug}`
    return '#'
  }

  const simpleButton =
    'text-primary border-b border-primary lg:border-none lg:h-7 h-10 pb-3 lg:pb-0 lg:bg-gray lg:rounded-[3px] text-30 lg:text-15 lg:hover:bg-green-100 lg:hover:text-white font-bold lg:font-normal'

  const greenButton =
    'bg-green lg:bg-green-100 text-primary lg:text-white h-[50px] lg:h-10 hover:bg-green-100 lg:hover:bg-green hover:text-white lg:hover:text-primary lg:ml-5 mt-8 lg:mt-0 text-center p-0 justify-center rounded-[3px]'

  return (
    <nav>
      <ul className="flex flex-col lg:flex-row lg:items-center items-start gap-x-[14px] max-w-[400px] lg:max-w-none gap-y-[14px]">
        {navItems.navItems?.map((item, index) => (
          <li key={index} className="w-full lg:w-auto">
            {item.link.type === 'custom' && item.link.url && (
              <a
                href={item.link.url}
                target={item.link.newTab ? '_blank' : '_self'}
                onClick={closeMenu}
                className={twMerge(
                  'flex items-center transition-colors duration-300 lg:px-[14px] w-full lg:w-auto flex-shrink-0',
                  item.link.button ? greenButton : simpleButton,
                )}
              >
                {item.link.label}
              </a>
            )}
            {item.link.type === 'reference' && (
              <Link
                href={slug(item.link)}
                target={item.link.newTab ? '_blank' : '_self'}
                onClick={closeMenu}
                className={twMerge(
                  'flex items-center transition-colors duration-300 lg:px-[14px] w-full lg:w-auto flex-shrink-0',
                  item.link.button ? greenButton : simpleButton,
                )}
              >
                {item.link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
