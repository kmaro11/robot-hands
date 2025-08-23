import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export interface ButtonAnchorProps {
  linkType?: 'custom' | 'pages'
  href: string
  children: React.ReactNode
  size?: 'small' | 'normal' | 'green-small' | 'green-normal'
  variant?: 'primary' | 'secondary' | 'borderless' | 'green' | 'green-dark'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonAnchorProps> = ({
  href,
  children,
  size = 'normal',
  variant = 'primary',
  className,
  disabled,
  type = 'button',
  linkType = 'pages',
}) => {
  let variantClass = ''
  let sizeClass = ''
  switch (variant) {
    case 'primary':
      variantClass = 'bg-green text-primary hover:bg-green-100 hover:text-white'
      break
    case 'secondary':
      variantClass = 'bg-green-100 text-white hover:bg-green hover:text-primary'
      break
    case 'borderless':
      variantClass = 'px-0'
      break
  }

  switch (size) {
    case 'small':
      sizeClass =
        'max-w-max text-[15px] lg:text-20 leading-[100%] px-6 rounded-[2.5px] h-10 lg:h-10'
      break
    case 'normal':
      sizeClass =
        'max-w-max text-[15px] lg:text-20 leading-[100%] px-6 rounded-[2.5px] h-10 lg:h-[50px]'
      break
  }

  return (
    <>
      {linkType === 'custom' ? (
        <a
          href={href}
          className={twMerge(
            'flex items-center justify-center text-center transition-colors duration-300',
            sizeClass,
            variantClass,
            className,
            disabled && 'pointer-events-none opacity-50',
          )}
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          type={type}
          className={twMerge(
            'flex items-center justify-center text-center transition-colors duration-300',
            sizeClass,
            variantClass,
            className,
            disabled && 'pointer-events-none opacity-50',
          )}
        >
          {children}
        </Link>
      )}
    </>
  )
}
