import { Box, Boxed, ResponsiveLayout } from '@telefonica/mistica'
import React, { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}
const HomeLayout = (props: HomeLayoutProps): JSX.Element => {
  return (
    <ResponsiveLayout fullWidth>
      <Box padding={24}>
        <Boxed>{props.children}</Boxed>
      </Box>
    </ResponsiveLayout>
  )
}

export default HomeLayout
