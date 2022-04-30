import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularLoadingAnimation = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', margin: '50px', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress
            style={{ color: '#F74902' }}
            size={100}
        />
    </Box>
  )
}

export default CircularLoadingAnimation;