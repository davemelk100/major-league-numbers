import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default: '',
        destructive: '',
        outline: '',
        secondary: '',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 active:translate-y-0',
        link: 'text-primary underline-offset-4 hover:underline active:translate-y-0',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// Skeuomorphic button styles
const skeuomorphicStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #d8e0e8 0%, #b8c4d0 100%)',
  borderTop: '1px solid #e8eef4',
  borderLeft: '1px solid #dce4ec',
  borderRight: '1px solid #a8b4c0',
  borderBottom: '2px solid #98a4b0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
  color: '#374151',
}

const skeuomorphicVariants = ['default', 'destructive', 'outline', 'secondary']

function Button({
  className,
  variant,
  size,
  asChild = false,
  style,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  const useSkeuomorphic = skeuomorphicVariants.includes(variant || 'default')

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={useSkeuomorphic ? { ...skeuomorphicStyle, ...style } : style}
      {...props}
    />
  )
}

export { Button, buttonVariants }
