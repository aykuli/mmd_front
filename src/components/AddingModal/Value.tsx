import {
  Autocomplete,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material"

import { IEntity } from "../../types"

interface ValueProps {
  entities: IEntity[]
  entity: string | IEntity | undefined | number | null
  value: string | null
  unit: string | null
  onEntityChange: (e: IEntity) => void
  onValueChange: (e: string) => void
}

const Value = ({
  value,
  unit,
  entity,
  entities,
  onEntityChange,
  onValueChange,
}: ValueProps) => {
  return (
    <>
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <Autocomplete
          fullWidth
          disablePortal
          freeSolo
          id="member"
          options={entities}
          getOptionLabel={(option) => (option as IEntity).title}
          value={entity}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Выберите тип анализа *" />
          )}
          onChange={(e, localValue) => onEntityChange(localValue as IEntity)}
        />
      </div>

      <FormControl fullWidth>
        <TextField
          id="value"
          label="Результат измерения *"
          variant="outlined"
          onChange={(e) => {
            onValueChange(e.target.value)
          }}
          value={value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {(entity as IEntity)?.unit}
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </>
  )
}

export default Value
