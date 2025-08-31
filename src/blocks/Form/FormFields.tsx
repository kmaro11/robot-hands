'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

const formSchema = z.object({
  fullName: z.string().optional(),
  company: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\d+\-()\s]+$/.test(val), {
      message: 'Netinkamas telefono numeris',
    }),
  email: z.string().email('Netinkamas el. pašto adresas'),
})

type FormData = z.infer<typeof formSchema>

export const FormFields = ({
  fieldsColor,
  formType = 'register',
}: {
  fieldsColor?: string
  formType?: 'download' | 'register'
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) // NEW loading state

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true) // disable button here
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, formType, website: 'Dobot website form' }),
    })

    if (res.ok) {
      setIsSubmitted(true)
    } else {
      alert('Įvyko klaida siunčiant laišką.')
    }

    setIsSubmitting(false) // enable button again if needed
  }

  const baseInputClass = twMerge(
    'border-2 border-transparent  w-full h-16 px-[26px] py-2 rounded-[5px] focus:outline-none transition text-gray-400 text-15',
    fieldsColor ? fieldsColor : 'bg-gray-300',
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <input
        type="text"
        placeholder="Vardas Pavardė"
        {...register('fullName')}
        className={twMerge(baseInputClass, errors.fullName && 'border-red-500')}
      />

      <input
        type="text"
        placeholder="Įmonės pavadinimas"
        {...register('company')}
        className={twMerge(baseInputClass, errors.company && 'border-red-500')}
      />

      <input
        type="tel"
        placeholder="Telefonas"
        {...register('phone')}
        className={twMerge(baseInputClass, errors.phone && 'border-red-500')}
      />

      <input
        type="email"
        placeholder="El. paštas*"
        {...register('email')}
        className={twMerge(baseInputClass, errors.email && 'border-red-500')}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={twMerge(
          'mt-2.5 sm:max-w-max text-xl leading-[100%] px-14 rounded-[2.5px] h-[60px] bg-green text-primary',
          isSubmitting && 'opacity-50 cursor-not-allowed',
        )}
      >
        {isSubmitted ? 'Registracija sėkminga' : isSubmitting ? 'Siunčiama...' : 'Registruotis'}
      </button>
    </form>
  )
}
