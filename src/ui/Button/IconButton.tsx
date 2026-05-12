import { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { cn } from '@/src/utils/cn'

type IconButtonVariant = 'dark' | 'ghost'

const variantClass: Record<IconButtonVariant, string> = {
  dark: 'w-10 h-10 rounded-full bg-gray-900 items-center justify-center',
  ghost: '',
}

interface IconButtonProps extends TouchableOpacityProps {
  icon: ReactNode
  variant?: IconButtonVariant
}

export function IconButton({ icon, variant = 'ghost', className, ...props }: IconButtonProps) {
  return (
    <TouchableOpacity className={cn(variantClass[variant], className)} {...props}>
      {icon}
    </TouchableOpacity>
  )
}
