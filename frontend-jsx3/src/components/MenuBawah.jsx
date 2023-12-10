import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PrintIcon from '@mui/icons-material/Print';
import Burger from './burger';

function MenuBawah() {
  return (
    <Box sx={{ height: 220, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position:'fixed', bottom: 5, right: 5 }}
        icon={<SpeedDialIcon />}
      >
      
      <SpeedDialAction icon={<PrintIcon/>} tooltipTitle ="print"  />
      <SpeedDialAction icon={<FileUploadOutlinedIcon/>} tooltipTitle ="Upload" />
      <SpeedDialAction>  <Burger/></SpeedDialAction>
      </SpeedDial>
    </Box>
  );
}

export default MenuBawah