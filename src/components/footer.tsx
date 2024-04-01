import Link from 'next/link';

export function Footer() {
  return (
    // <footer className='py-6 items-center justify-center mt-auto shadow-sm border-t'>
    //   <Link href='https://www.piotrpabich.com/projects/TalkTactics'>
    //     <p className='text-current text-center font-semibold'>
    //       © 2024 Piotr Pabich
    //     </p>
    //   </Link>
    // </footer>
    <footer className='px-4 py-6 mt-auto shadow-sm border-t flex flex-col md:flex-row items-center justify-center md:gap-6'>
      <span className='text-sm text-semibold text-current'>
        <Link href='https://www.piotrpabich.com/projects/TalkTactics'>
          © 2024 Piotr Pabich™
        </Link>
      </span>
      <div className='flex mt-4 sm:justify-center items-center md:mt-0 space-x-5 rtl:space-x-reverse'>
        <Link href='https://github.com/PiotrPabichCode/talk-tactics-frontend-nextjs'>
          <svg
            className='w-4 h-4 dark:hover:fill-blue-800 hover:fill-blue-800 fill-black dark:fill-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'>
            <path d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z' />
          </svg>
          <span className='sr-only'>GitHub frontend repository</span>
        </Link>
        <Link href='https://github.com/PiotrPabichCode/talk-tactics-backend-springboot'>
          <svg
            className='w-4 h-4 fill-black dark:fill-white dark:hover:fill-blue-800 hover:fill-blue-800'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 122.88 91.26'>
            <path d='M8.32,0h106.24c4.58,0,8.32,3.74,8.32,8.32v74.62c0,4.57-3.74,8.32-8.32,8.32H8.32C3.74,91.26,0,87.51,0,82.94 V8.32C0,3.74,3.74,0,8.32,0L8.32,0z M43.7,64.74H32.8l-1.57,5.14H21.4l11.73-31.16h10.54l11.68,31.16H45.26L43.7,64.74L43.7,64.74z M41.67,58l-3.4-11.2L34.85,58H41.67L41.67,58z M59.15,38.72h16.02c3.49,0,6.1,0.83,7.84,2.49c1.73,1.66,2.6,4.03,2.6,7.09 c0,3.15-0.95,5.61-2.84,7.38c-1.89,1.78-4.79,2.66-8.68,2.66h-5.28v11.53h-9.66V38.72L59.15,38.72z M68.81,52.03h2.37 c1.87,0,3.18-0.33,3.94-0.97c0.75-0.65,1.13-1.47,1.13-2.48c0-0.98-0.33-1.81-0.99-2.49c-0.65-0.68-1.89-1.02-3.7-1.02h-2.76V52.03 L68.81,52.03z M91.82,38.72h9.66v31.16h-9.66V38.72L91.82,38.72z M117.97,23.29H5.29v60.46c0,0.64,0.25,1.2,0.67,1.63 c0.42,0.42,0.99,0.67,1.63,0.67h108.04c0.64,0,1.2-0.25,1.63-0.67c0.43-0.43,0.67-0.99,0.67-1.63V23.29H117.97L117.97,23.29z M106.64,9.35c2.27,0,4.11,1.84,4.11,4.11c0,2.27-1.84,4.11-4.11,4.11c-2.27,0-4.11-1.84-4.11-4.11 C102.54,11.19,104.38,9.35,106.64,9.35L106.64,9.35z M78.8,9.35c2.27,0,4.11,1.84,4.11,4.11c0,2.27-1.84,4.11-4.11,4.11 c-2.27,0-4.11-1.84-4.11-4.11C74.69,11.19,76.53,9.35,78.8,9.35L78.8,9.35z M92.72,9.35c2.27,0,4.11,1.84,4.11,4.11 c0,2.27-1.84,4.11-4.11,4.11c-2.27,0-4.11-1.84-4.11-4.11C88.61,11.19,90.45,9.35,92.72,9.35L92.72,9.35z"' />
          </svg>
          <span className='sr-only'>GitHub backend repository</span>
        </Link>
      </div>
    </footer>
  );
}
