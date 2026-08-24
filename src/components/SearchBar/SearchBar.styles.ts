import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SearchBar = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: '30px',
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: theme.typography.pxToRem(600),
    },
}));
