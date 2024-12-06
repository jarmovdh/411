import Loader from "@modules/411/components/loader/Loader"

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full [var(--theme-color)]">
      <Loader />
    </div>
  )
}
