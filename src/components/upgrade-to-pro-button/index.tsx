// MUI Imports
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Style Imports
import styles from './styles.module.css'

const TooltipContent = () => {
  return (
    <Card>
      <a href='https://github.com/Localhost-308/API-BD6' target='_blank' className='flex'>
        <img
          src=''
          alt='Upgrade to Pro'
          className='w-full'
        />
      </a>
      <CardHeader title={`${themeConfig.templateName} - MUI Next.js Admin Template`} />
      <CardContent>
        <Typography color='textSecondary' className='mbe-4'>
          {`${themeConfig.templateName} Admin is the most developer friendly & highly customizable Admin Dashboard Template based on MUI and Next.js.`}
        </Typography>
        <Typography color='textSecondary'>Click on below button to explore the PRO version.</Typography>
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
  )
}



