import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LinearLoadingAnimation = () => {
  return (
    <Box sx={{ width: '100%', marginTop: '25px', marginBottom: '25px' }}>
        <LinearProgress style={{ color: '#F74902' }} />
    </Box>
  )
}

export default LinearLoadingAnimation;