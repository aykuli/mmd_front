import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface ViewSelectProps {
  view: string;
  setView: (value: string) => void

}

const ViewSelect = ({view,setView}: ViewSelectProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="view-select-label">Вид показа</InputLabel>
        <Select
          labelId="view-select-label"
          id="view-select"
          value={view}
          label="Вид показа"
          onChange={(e) => setView(e.target.value as string)}
        >
          <MenuItem value={'table'}>Таблица</MenuItem>
          <MenuItem value={'chart'}>График</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default ViewSelect