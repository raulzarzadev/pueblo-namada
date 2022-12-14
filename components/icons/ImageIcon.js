const SvgComponent = (props) => (
  <svg
    width={24}
    height={24}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M18 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
      fill='currentColor'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 8a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v5.238l1.517-1.82a3 3 0 0 1 4.8.256l1.438 2.155a1 1 0 0 0 1.362.294l.836-.523a3 3 0 0 1 3.942.68l1.997 2.521c.07-.255.108-.523.108-.801V8a3 3 0 0 0-3-3H7Zm11.677 13.488-2.35-2.965a1 1 0 0 0-1.314-.227l-.836.523a3 3 0 0 1-4.086-.88l-1.437-2.156a1 1 0 0 0-1.6-.085l-3.035 3.641A3 3 0 0 0 7 19h10c.621 0 1.198-.189 1.677-.512Z'
      fill='currentColor'
    />
  </svg>
)

export default SvgComponent
