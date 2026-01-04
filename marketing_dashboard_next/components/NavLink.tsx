"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  to: string
  className?: string
  activeClassName?: string
  end?: boolean
  children: React.ReactNode
}

export function NavLink({ to, className, activeClassName, end, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = end ? pathname === to : pathname.startsWith(to)

  return (
    <Link href={to} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  )
}
