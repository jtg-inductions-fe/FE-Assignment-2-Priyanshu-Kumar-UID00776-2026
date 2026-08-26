import { useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    FilterList as FilterListIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem as SelectMenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FoodVariantToggle } from '@/components/FilterToggleButton/FilterToggleButton';
import { MenuItemCard } from '@/components/MenuItemCard/MenuItemCard';
import { RestaurantSearch } from '@/components/SearchBar/SearchBar';
import { RestaurantSidebar } from '@/components/Sidebar/Sidebar';
import { BottomNavigationBarContainer } from '@/container/BottomNavigationBar/BottomNavigationBarContainer';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';
import {
    AddRestaurantButton,
    ContentArea,
    ControlsWrapper,
    FilterButton,
    FilterButtonStack,
    FormStack,
    HeaderButtonWrapper,
    MainContentLayout,
    RestaurantContainer,
    RestaurantGrid,
    RestaurantHeaderSection,
    ScrollableContent,
    StyledDialogActions,
} from '@/container/Restaurant/Restaurant.styles';
import { useDebounce } from '@/hooks/useDebounce';
import { showNotification } from '@/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { FoodVariant } from '@/types/fIlterToggleButton.types';
import type { MenuFormData, MenuItem } from '@/types/restaurant.types';

export const MenuContainer = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const user = useAppSelector((state) => state.auth.user);
    const isOwner = user?.role === 'RESTAURANT OWNER';

    const selectedRestaurant = useAppSelector((state) =>
        state.restaurant.restaurants.find((r) => r.id === restaurantId),
    );

    const isMobile = Boolean(useMediaQuery(theme.breakpoints.down('sm')));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dietFilter, setDietFilter] = useState<FoodVariant>('ALL');
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [cartQuantities, setCartQuantities] = useState<
        Record<string, number>
    >({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<MenuFormData>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            dietType: 'VEG',
            category: '',
        },
        mode: 'onTouched',
    });

    const debouncedSearch = useDebounce<string>(searchTerm);

    const handleRatingToggle = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating],
        );
    };

    const filteredMenuItems = useMemo(() => {
        if (!selectedRestaurant?.menus) return [];

        return selectedRestaurant.menus.filter((item: MenuItem) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());
            if (!matchesSearch) return false;

            if (dietFilter !== 'ALL') {
                if (dietFilter === 'VEG' && item.dietType !== 'VEG')
                    return false;
                if (dietFilter === 'NON_VEG' && item.dietType !== 'NON_VEG')
                    return false;
            }

            if (selectedRatings.length > 0 && item.rating) {
                const passes = selectedRatings.some((r) => item.rating >= r);
                if (!passes) return false;
            }

            return true;
        });
    }, [
        selectedRestaurant?.menus,
        debouncedSearch,
        dietFilter,
        selectedRatings,
    ]);

    const handleAddToCart = (item: MenuItem) => {
        setCartQuantities((prev) => ({ ...prev, [item.id]: 1 }));
    };

    const handleIncrement = (item: MenuItem) => {
        setCartQuantities((prev) => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1,
        }));
    };

    const handleDecrement = (item: MenuItem) => {
        setCartQuantities((prev) => {
            const next = { ...prev };
            if (next[item.id] > 1) {
                next[item.id] -= 1;
            } else {
                delete next[item.id];
            }
            return next;
        });
    };

    const handleOpenAddModal = () => {
        setEditingItem(null);
        reset({
            name: '',
            description: '',
            price: 0,
            dietType: 'VEG',
            category: '',
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item: MenuItem) => {
        setEditingItem(item);
        reset({
            name: item.name,
            description: item.description,
            price: item.price,
            dietType: item.dietType,
        });
        setIsModalOpen(true);
    };

    const onFormSubmit = () => {
        try {
            dispatch(
                showNotification({
                    message: editingItem
                        ? 'Menu item updated!'
                        : 'Menu item added!',
                    severity: 'success',
                }),
            );
            setIsModalOpen(false);
        } catch {
            dispatch(
                showNotification({
                    message: 'Operation failed',
                    severity: 'error',
                }),
            );
        }
    };

    if (!selectedRestaurant) {
        return (
            <RestaurantContainer>
                <NavbarContainer />
                <Box textAlign="center" py={10}>
                    <Typography variant="h5">Restaurant not found.</Typography>
                    <Typography
                        variant="body1"
                        color="primary"
                        sx={{ cursor: 'pointer', mt: 2 }}
                        onClick={() => void navigate('/restaurant')}
                    >
                        Back to Restaurants
                    </Typography>
                </Box>
                <BottomNavigationBarContainer />
            </RestaurantContainer>
        );
    }

    return (
        <RestaurantContainer>
            <NavbarContainer />

            <MainContentLayout>
                <RestaurantSidebar
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    selectedRatings={selectedRatings}
                    onRatingToggle={handleRatingToggle}
                />

                <ContentArea>
                    <RestaurantHeaderSection>
                        <HeaderButtonWrapper>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <IconButton
                                    onClick={() => void navigate('/restaurant')}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                                <Box>
                                    <Typography variant="h1">
                                        {selectedRestaurant.name} - Menu
                                    </Typography>
                                </Box>
                            </Stack>

                            {!isMobile && (
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    alignItems="center"
                                >
                                    {isOwner ? (
                                        <AddRestaurantButton
                                            variant="contained"
                                            color="primary"
                                            startIcon={<AddIcon />}
                                            onClick={handleOpenAddModal}
                                        >
                                            Add Menu Item
                                        </AddRestaurantButton>
                                    ) : (
                                        <>
                                            <FoodVariantToggle
                                                foodVariant={dietFilter}
                                                onFilterChange={setDietFilter}
                                            />
                                            <FilterButton
                                                variant="outlined"
                                                startIcon={<FilterListIcon />}
                                                onClick={() =>
                                                    setIsDrawerOpen(
                                                        (prev) => !prev,
                                                    )
                                                }
                                            >
                                                Filters
                                            </FilterButton>
                                        </>
                                    )}
                                </Stack>
                            )}
                        </HeaderButtonWrapper>

                        <Typography variant="body1" color="text.secondary">
                            {selectedRestaurant.location} •{' '}
                            {selectedRestaurant.deliveryTime}
                        </Typography>

                        <ControlsWrapper>
                            <RestaurantSearch
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search dishes in this restaurant..."
                            />

                            {isMobile && (
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    alignItems="center"
                                    sx={{ width: '100%' }}
                                >
                                    {isOwner ? (
                                        <AddRestaurantButton
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            startIcon={<AddIcon />}
                                            onClick={handleOpenAddModal}
                                        >
                                            Add Menu Item
                                        </AddRestaurantButton>
                                    ) : (
                                        <FilterButtonStack>
                                            <FoodVariantToggle
                                                foodVariant={dietFilter}
                                                onFilterChange={setDietFilter}
                                            />
                                            <FilterButton
                                                variant="outlined"
                                                startIcon={<FilterListIcon />}
                                                onClick={() =>
                                                    setIsDrawerOpen(true)
                                                }
                                            >
                                                Filters
                                            </FilterButton>
                                        </FilterButtonStack>
                                    )}
                                </Stack>
                            )}
                        </ControlsWrapper>
                    </RestaurantHeaderSection>

                    <ScrollableContent>
                        <RestaurantGrid
                            sx={{
                                gridTemplateColumns:
                                    'repeat(auto-fill, minmax(360px, 1fr))',
                            }}
                        >
                            {filteredMenuItems.length === 0 ? (
                                <Box
                                    textAlign="center"
                                    py={6}
                                    gridColumn="1 / -1"
                                >
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        No menu items found for this restaurant.
                                    </Typography>
                                </Box>
                            ) : (
                                filteredMenuItems.map((item) => (
                                    <MenuItemCard
                                        key={item.id}
                                        item={item}
                                        isOwner={isOwner}
                                        quantity={cartQuantities[item.id] || 0}
                                        onAddToCart={handleAddToCart}
                                        onIncrement={handleIncrement}
                                        onDecrement={handleDecrement}
                                        onEdit={handleOpenEditModal}
                                        onDelete={setDeleteTargetId}
                                    />
                                ))
                            )}
                        </RestaurantGrid>
                    </ScrollableContent>
                </ContentArea>
            </MainContentLayout>

            <BottomNavigationBarContainer />

            {/* Add / Edit Menu Item Dialog */}
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle fontWeight={700}>
                    {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>
                <form onSubmit={(e) => void handleSubmit(onFormSubmit)(e)}>
                    <DialogContent dividers>
                        <FormStack>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Dish Name"
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        multiline
                                        rows={2}
                                        fullWidth
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="price"
                                control={control}
                                rules={{ required: 'Price is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Price ($)"
                                        fullWidth
                                        inputProps={{ step: '0.01' }}
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseFloat(e.target.value) || 0,
                                            )
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="dietType"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Diet Type"
                                        fullWidth
                                    >
                                        <SelectMenuItem value="VEG">
                                            VEG
                                        </SelectMenuItem>
                                        <SelectMenuItem value="NON_VEG">
                                            NON_VEG
                                        </SelectMenuItem>
                                    </TextField>
                                )}
                            />
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Category (e.g. Burgers, Pizzas)"
                                        fullWidth
                                    />
                                )}
                            />
                        </FormStack>
                    </DialogContent>
                    <StyledDialogActions>
                        <Button
                            variant="contained"
                            onClick={() => setIsModalOpen(false)}
                            color="inherit"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Saving...'
                                : editingItem
                                  ? 'Save Changes'
                                  : 'Add Item'}
                        </Button>
                    </StyledDialogActions>
                </form>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={Boolean(deleteTargetId)}
                onClose={() => setDeleteTargetId(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle fontWeight={700}>Delete Menu Item?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary">
                        Are you sure you want to delete this menu item?
                    </Typography>
                </DialogContent>
                <StyledDialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setDeleteTargetId(null)}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            setDeleteTargetId(null);
                            dispatch(
                                showNotification({
                                    message: 'Item deleted!',
                                    severity: 'success',
                                }),
                            );
                        }}
                    >
                        Delete
                    </Button>
                </StyledDialogActions>
            </Dialog>
        </RestaurantContainer>
    );
};
