'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import NavSearch from '@components/layout/shared/search'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import { useState } from 'react'

const NavbarContent = () => {
  const [open, setOpen] = useState(false)

  const notifications = [
    { id: 1, message: 'New comment on your post' },
    { id: 2, message: 'You have a new follower' },
    { id: 3, message: 'Your order has been shipped' }
  ]

  const handleToggle = () => {
    setOpen(prev => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-2 sm:gap-4'>
        <NavToggle />
        <NavSearch />
      </div>
      <div className='flex items-center'>
        <Link
          className='flex mie-2'
          href="https://github.com/Localhost-308/API-BD6"
          target='_blank'
        >

        </Link>
        <ModeDropdown />
        <Box position="relative">
          <IconButton className='text-textPrimary' onClick={handleToggle}>
            <i className='ri-notification-2-line' />
          </IconButton>
          {open && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper elevation={3} sx={{ position: 'absolute', top: '40px', right: '0', width: '300px', zIndex: 1 }}>
                <Box p={2}>
                  <Typography variant='h6'>Notifications</Typography>
                  {notifications.map(notification => (
                    <Box key={notification.id} mt={2}>
                      <Typography variant='body2'>{notification.message}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </ClickAwayListener>
          )}
        </Box>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
