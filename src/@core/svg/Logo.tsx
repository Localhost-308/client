// React Imports
import type { SVGAttributes } from 'react'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><image href="data:image/png;base64,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" height="100%" width="100%"/></svg>
  )
}

export default Logo
