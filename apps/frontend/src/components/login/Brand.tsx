import { GraduationCap } from 'lucide-react'

export default function Brand() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--overlay-12)]">
        <GraduationCap className="h-5 w-5" />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">SESH</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground-rgb))]">Melde dich an, um fortzufahren</p>
      </div>
    </div>
  )
}