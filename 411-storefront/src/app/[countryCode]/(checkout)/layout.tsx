import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative small:min-h-screen">
      <div className="h-16 border-b ">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi [var(--theme-color)] flex items-center gap-x-2 uppercase flex-1 basis-0"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-[var(--colorsubtle)] hover:[var(--theme-color)] ">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-[var(--colorsubtle)] hover:[var(--theme-color)]">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-[var(--colorsubtle)] hover:[var(--theme-color)] uppercase"
          >
            411 Store
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative">{children}</div>
      <div className="py-4 w-full flex items-center justify-center"></div>
    </div>
  )
}
