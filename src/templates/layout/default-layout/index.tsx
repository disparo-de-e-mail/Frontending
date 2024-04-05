import { Box, ResponsiveLayout, useWindowSize } from '@telefonica/mistica'

const Defaultlayout = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  const { height } = useWindowSize()

  return (
    <ResponsiveLayout fullWidth>
      <Box>
        <main>
          <div style={{ height: height }}>{children}</div>
        </main>
      </Box>
    </ResponsiveLayout>
  )
}

export default Defaultlayout
