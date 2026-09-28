import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-3 py-2.5 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20 *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-destructive dark:bg-destructive/20 dark:border-destructive/30",
        success:
          "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 *:data-[slot=alert-description]:text-emerald-700/90 *:[svg]:text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/30 dark:*:data-[slot=alert-description]:text-emerald-400/90",
        warning:
          "bg-amber-500/10 text-amber-700 border-amber-500/20 *:data-[slot=alert-description]:text-amber-700/90 *:[svg]:text-amber-600 dark:text-amber-400 dark:border-amber-500/30 dark:*:data-[slot=alert-description]:text-amber-400/90",
        info:
          "bg-sky-500/10 text-sky-700 border-sky-500/20 *:data-[slot=alert-description]:text-sky-700/90 *:[svg]:text-sky-600 dark:text-sky-400 dark:border-sky-500/30 dark:*:data-[slot=alert-description]:text-sky-400/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-semibold text-xs tracking-tight group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-xs text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-2",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
