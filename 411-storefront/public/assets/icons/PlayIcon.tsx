const PlayIcon = ({ className }: { className: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`fill-current ${className}`}
    style={{ fill: "var(--logo-fill-color)" }}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" />
  </svg>
)

export default PlayIcon
