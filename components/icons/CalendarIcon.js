const SvgComponent = (props) => (
  <svg
    width={24}
    height={24}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M8 12a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8ZM7 17a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z'
      fill='currentColor'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8 3a1 1 0 0 0-2 0v1.1A5.002 5.002 0 0 0 2 9v8a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V9a5.002 5.002 0 0 0-4-4.9V3a1 1 0 1 0-2 0v1H8V3Zm12 7H4v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7ZM4.17 8A3.001 3.001 0 0 1 7 6h10c1.306 0 2.418.835 2.83 2H4.17Z'
      fill='currentColor'
    />
  </svg>
)

export default SvgComponent
