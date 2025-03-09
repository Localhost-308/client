'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span>{` by `}</span>
        <Link href= 'https://github.com/Localhost-308/API-BD6' target='_blank' className='text-primary'>
          LocalHost 306
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>


          <Link href={process.env.NEXT_PUBLIC_DOCS_URL as string} target='_blank' className='text-primary'>
            Documentation
          </Link>
          <Link
            href="https://github.com/Localhost-308/API-BD6"
            target='_blank'
            className='text-primary'
          >
            Support
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
