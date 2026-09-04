import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';

import { SearchBar } from '@/components/SearchBar/SearchBar.styles';
import { RestaurantSearchProps } from '@/types/serachBar.types';

export const RestaurantSearch = ({
    value,
    onChange,
    placeholder = 'Search for restaurants',
}: RestaurantSearchProps) => (
    <SearchBar
        placeholder={placeholder}
        aria-label={placeholder}
        type="search"
        value={value}
        onChange={onChange}
        size="medium"
        fullWidth
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
