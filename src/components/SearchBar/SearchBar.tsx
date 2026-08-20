import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

interface RestaurantSearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const RestaurantSearch = ({
    value,
    onChange,
    placeholder = 'Search for restaurants',
}: RestaurantSearchProps) => (
    <TextField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size="small"
        fullWidth
        sx={{ maxWidth: 500 }}
        slotProps={{
            input: {
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="action" />
                    </InputAdornment>
                ),
            },
        }}
    />
);
