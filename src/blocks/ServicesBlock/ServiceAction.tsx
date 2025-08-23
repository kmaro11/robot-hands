import { twMerge } from 'tailwind-merge'

export const ServiceAction = ({ link, className }: { link: string; className?: string }) => {
  return (
    <a
      href={link}
      target="_blank"
      className={twMerge('flex items-center mt-8 group', className)}
      rel="noreferrer"
    >
      <span className="text-green-100 text-15 mr-3 group-hover:text-green transition-colors duration-300">
        Sužinoti daugiau
      </span>
      <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-green transition-colors duration-300">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_701_3411)">
            <path
              d="M14.643 8.18457L1.69531 8.18457"
              stroke="white"
              strokeWidth="0.97108"
              strokeMiterlimit="10"
            />
            <path
              d="M9.25 3.00509L14.6427 8.18419L9.25 13.3633"
              stroke="white"
              strokeWidth="0.97108"
              strokeMiterlimit="10"
            />
          </g>
          <defs>
            <clipPath id="clip0_701_3411">
              <rect
                width="15.5373"
                height="15.5373"
                fill="white"
                transform="translate(0.400391 15.9531) rotate(-90)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </a>
  )
}
