import { Autocomplete, TextField } from "@mui/material";

type SearchListFieldProps<T> = {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  label: string;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue: ((option: T, value: T) => boolean) | undefined;
  getOptionKey?: (option: T) => string | number;
};

function SearchListField<T>({
  options,
  value,
  label,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
  getOptionKey,
}: SearchListFieldProps<T>) {
  return (
    <Autocomplete
      options={options}
      value={value}
      getOptionLabel={getOptionLabel}
      onChange={(_, newValue) => onChange(newValue)}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        const resolvedKey = getOptionKey ? getOptionKey(option) : key;
        return (
          <li {...rest} key={resolvedKey}>
            {getOptionLabel(option).charAt(0).toUpperCase() +
              getOptionLabel(option).slice(1)}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          helperText="Start typing to search"
          size="small"
        />
      )}
    />
  );
}

export default SearchListField;
