import { cn } from "@/lib/utils"
import Image from "next/image"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo3.png"
        alt="D3 Déco Logo"
        width={120}
        height={80}
        className="w-auto h-12"
        priority
      />
    </div>
  )
}