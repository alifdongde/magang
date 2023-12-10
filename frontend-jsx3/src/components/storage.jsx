
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width:200,
  marginLeft:'20px',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'dark' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#205fff' : '#308fe8',
  },
}));

// Inspired by the former Facebook spinners.
function CustomizedProgressBars() {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant="determinate" value={60 }  />
         <h6 style={{margin:'9px',marginLeft:'19px', fontWeight:'initial'}}> Telah digunakan 1,6 GB dari total 3,2 GB</h6>
        </Box>
      );
    }


export default CustomizedProgressBars
 