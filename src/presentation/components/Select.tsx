import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IOpions } from "../../core/type";

type SelectCoreProps<T = unknown> = {
  label: string;
  name?: string;
  value: string | null;
  options: IOpions<T>[] | undefined;
  onChange: (name: string | undefined, value: string | null) => void;
};

const SelectCore: React.FC<SelectCoreProps> = ({
  label,
  value,
  options,
  name,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${label}`}
        id={`select-${label}`}
        value={value || ""}
        label={label}
        name={name}
        onChange={(ev) => onChange(name, ev.target.value as string)}
      >
        {options?.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCore;
