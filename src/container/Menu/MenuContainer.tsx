import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import {
    AccessTime as Clock,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    FilterList as FilterListIcon,
    Place as Location,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Skeleton,
    Stack,
    TextField,
    ToggleButton,
    Typography,
} from '@mui/material';

import { FoodVariantToggle } from '@/components/FilterToggleButton/FilterToggleButton';
import { FoodVariant } from '@/components/FilterToggleButton/filterToggleButton.types';
import { MenuItemCard } from '@/components/ItemCard/ItemCard';
import { RestaurantSearch } from '@/components/SearchBar/SearchBar';
import { RestaurantSidebar } from '@/components/Sidebar/Sidebar';
import {
    AddRestaurantButton,
    ControlsWrapper,
    FilterSlideModal,
    FormStack,
    MainContentLayout,
    RestaurantContainer,
    RestaurantGrid,
    RestaurantHeaderSection,
    ScrollableContent,
    SelectedToggleButton,
    StyledDialogActions,
} from '@/container/Restaurant/Restaurant.styles';
import {
    addItemToCart,
    decrementCartItem,
    incrementCartItem,
} from '@/features/cartSlice';
import { showNotification } from '@/features/notificationSlice';
import {
    addMenuItemSuccess,
    deleteMenuItemSuccess,
    editMenuItemSuccess,
    setRestaurants,
} from '@/features/restaurantSlice';
import { useDebounce } from '@/hooks/useDebounce';
import {
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
    fetchRestaurants,
} from '@/services/restaurant.service';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { MenuFormData, MenuItem } from '@/types/restaurant.types';

export const MenuContainer = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const isOwner = user?.role === 'RESTAURANT OWNER';

    const selectedRestaurant = useAppSelector((state) =>
        state.restaurant.restaurants.find(
            (restaurant) => restaurant.id === restaurantId,
        ),
    );

    const cartItems = useAppSelector((state) => state.cart.items);
    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dietFilter, setDietFilter] = useState<FoodVariant>('all');
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchRestaurants();
                dispatch(setRestaurants(data));
            } catch (err: unknown) {
                const message =
                    err instanceof Error
                        ? err.message
                        : 'Failed to load restaurant data';
                dispatch(
                    showNotification({
                        message,
                        severity: 'error',
                    }),
                );
            } finally {
                setIsLoading(false);
            }
        };

        void loadInitialData();
    }, [dispatch]);

    const handleMenuAction = (actionType: string, item: MenuItem) => {
        switch (actionType) {
            case 'addToCart':
                handleAddToCart(item);
                break;
            case 'increment':
                handleIncrement(item);
                break;
            case 'decrement':
                handleDecrement(item);
                break;
            case 'edit':
                handleOpenEditModal(item);
                break;
            case 'delete':
                setDeleteTargetId(item.id);
                break;
        }
    };

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
            rating: 0,
            stock: 0,
            dietType: 'veg',
        },
        mode: 'onChange',
    });

    // Debounce search input to prevent unnecessary re-renders on every keystroke
    const debouncedSearch = useDebounce<string>(searchTerm);

    // Cart quantity from Redux cart
    const cartQuantities = useMemo(
        () =>
            cartItems.reduce<Record<string, number>>((acc, item) => {
                acc[item.menuItem.id] = item.quantity;
                return acc;
            }, {}),
        [cartItems],
    );

    // Toggle star rating filters in the sidebar
    const handleRatingToggle = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((restaurant) => restaurant !== rating)
                : [...prev, rating],
        );
    };

    // Filter menu items by search query, diet type, and minimum rating
    const filteredMenuItems = useMemo(() => {
        if (!selectedRestaurant?.menus) return [];

        return selectedRestaurant.menus.filter((item: MenuItem) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());

            if (!matchesSearch) return false;

            if (dietFilter !== 'all') {
                if (dietFilter === 'veg' && item.dietType !== 'veg')
                    return false;
                if (dietFilter === 'nonVeg' && item.dietType !== 'nonVeg')
                    return false;
            }

            if (selectedRatings.length > 0 && item.rating) {
                const passes = selectedRatings.some(
                    (restaurant) => item.rating >= restaurant,
                );
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

    // Dispatch adding an item to the user cart in redux and localStorage
    const handleAddToCart = (item: MenuItem) => {
        if (!user) {
            dispatch(
                showNotification({
                    message: 'Please login to add items to cart.',
                    severity: 'warning',
                }),
            );
            void navigate('/login');
            return;
        }

        if (isOwner) {
            dispatch(
                showNotification({
                    message: 'Restaurant owners cannot place orders.',
                    severity: 'error',
                }),
            );
            return;
        }

        dispatch(
            addItemToCart({
                userEmail: user.email,
                restaurantId: selectedRestaurant?.id || '',
                restaurantName: selectedRestaurant?.name || '',
                menuItem: item,
            }),
        );
    };

    // Increment item count in cart
    const handleIncrement = (item: MenuItem) => {
        if (!user) return;
        dispatch(
            incrementCartItem({
                userEmail: user.email,
                menuItemId: item.id,
            }),
        );
    };

    // Decrement item quantity or remove from cart
    const handleDecrement = (item: MenuItem) => {
        if (!user) return;
        dispatch(
            decrementCartItem({
                userEmail: user.email,
                menuItemId: item.id,
            }),
        );
    };

    // Open the modal with empty fields to add a brand new menu item
    const handleOpenAddModal = () => {
        setEditingItem(null);
        reset({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            rating: 0,
            dietType: 'veg',
        });
        setIsModalOpen(true);
    };

    // Open the modal pre-filled with an existing item's data to edit it
    const handleOpenEditModal = (item: MenuItem) => {
        setEditingItem(item);
        reset({
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock || 0,
            rating: item.rating || 0,
            dietType: item.dietType,
        });
        setIsModalOpen(true);
    };

    // Save added or edited menu item data to the restaurant store
    const onFormSubmit = async (data: MenuFormData) => {
        if (!user?.email || !restaurantId) {
            dispatch(
                showNotification({
                    message: 'You must be logged in as an owner.',
                    severity: 'error',
                }),
            );
            return;
        }

        try {
            if (editingItem) {
                const updated = await editMenuItem(
                    restaurantId,
                    editingItem.id,
                    data,
                    user.email,
                );

                dispatch(editMenuItemSuccess(updated));

                dispatch(
                    showNotification({
                        message: 'Menu item updated',
                        severity: 'success',
                    }),
                );
            } else {
                const created = await addMenuItem(
                    restaurantId,
                    data,
                    user.email,
                );

                dispatch(addMenuItemSuccess(created));

                dispatch(
                    showNotification({
                        message: 'Menu item added',
                        severity: 'success',
                    }),
                );
            }

            setIsModalOpen(false);
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'An error occurred while saving.';

            dispatch(
                showNotification({
                    message,
                    severity: 'error',
                }),
            );
        }
    };

    // Delete a menu item by ID from the restaurant
    const handleDelete = async (id: string) => {
        if (!user?.email || !restaurantId) {
            dispatch(
                showNotification({
                    message: 'Authentication required',
                    severity: 'error',
                }),
            );
            return;
        }

        // Execute menu item deletion request
        try {
            setIsDeleting(true);
            await deleteMenuItem(restaurantId, id, user.email);

            dispatch(
                deleteMenuItemSuccess({
                    restaurantId: restaurantId,
                    menuId: id,
                }),
            );

            dispatch(
                showNotification({
                    message: 'Menu item deleted succesfully',
                    severity: 'success',
                }),
            );
            setDeleteTargetId(null);
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to delete menu item';
            dispatch(
                showNotification({
                    message,
                    severity: 'error',
                }),
            );
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <RestaurantContainer px={{ xs: 2, sm: 10 }}>
                <Box py={5}>
                    <Skeleton variant="text" width="30%" height={50} />
                    <Skeleton
                        variant="text"
                        width="20%"
                        height={30}
                        sx={{ mb: 4 }}
                    />
                    <RestaurantGrid>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rounded"
                                height={220}
                                animation="wave"
                            />
                        ))}
                    </RestaurantGrid>
                </Box>
            </RestaurantContainer>
        );
    }

    if (!selectedRestaurant) {
        return (
            <RestaurantContainer>
                <Box textAlign="center" py={10}>
                    <Typography variant="h5">Menu not found.</Typography>
                    <Typography
                        variant="body1"
                        color="primary"
                        onClick={() => void navigate('/restaurant')}
                    >
                        Back to Restaurants
                    </Typography>
                </Box>
            </RestaurantContainer>
        );
    }

    return (
        <RestaurantContainer px={{ sm: 10 }}>
            <MainContentLayout>
                <RestaurantSidebar
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    selectedRatings={selectedRatings}
                    onRatingToggle={handleRatingToggle}
                />
                <RestaurantHeaderSection>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton
                            onClick={() => void navigate('/restaurant')}
                        >
                            <ArrowBackIcon />
                        </IconButton>

                        <Typography variant="h1">
                            {selectedRestaurant.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Clock color="primary" />
                        <Typography variant="body1">
                            {selectedRestaurant.deliveryTime}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Location color="primary" />
                        <Typography variant="body1">
                            {selectedRestaurant.location}
                        </Typography>
                    </Stack>
                </RestaurantHeaderSection>
                <ControlsWrapper
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    padding={{ xs: 3, sm: 1 }}
                >
                    <RestaurantSearch
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search dishes in this restaurant..."
                    />

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={5}
                        justifyContent={{ xs: 'space-between', sm: 'flex-end' }}
                        width="100%"
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
                            <>
                                <FoodVariantToggle
                                    foodVariant={dietFilter}
                                    onFilterChange={setDietFilter}
                                />
                                <FilterSlideModal
                                    variant="outlined"
                                    startIcon={<FilterListIcon />}
                                    onClick={() => setIsDrawerOpen(true)}
                                >
                                    Filters
                                </FilterSlideModal>
                            </>
                        )}
                    </Stack>
                </ControlsWrapper>

                <ScrollableContent pb={10}>
                    {filteredMenuItems.length === 0 ? (
                        <Box textAlign="center" py={8} width="100%">
                            <Typography variant="h6" color="text.secondary">
                                No menu items found.
                            </Typography>
                        </Box>
                    ) : (
                        <RestaurantGrid>
                            {filteredMenuItems.map((item) => (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    isOwner={isOwner}
                                    quantity={cartQuantities[item.id] || 0}
                                    onAction={handleMenuAction}
                                />
                            ))}
                        </RestaurantGrid>
                    )}
                </ScrollableContent>
            </MainContentLayout>

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle variant="h5">
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
                                name="stock"
                                control={control}
                                rules={{
                                    validate: (val) =>
                                        val > 0 ||
                                        'Stock must be greater than 0',
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={
                                            field.value === 0 ? '' : field.value
                                        }
                                        type="number"
                                        label="Stock Quantity"
                                        fullWidth
                                        error={!!errors.stock}
                                        helperText={errors.stock?.message}
                                        slotProps={{
                                            htmlInput: { min: 1 },
                                        }}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            field.onChange(
                                                val === ''
                                                    ? 0
                                                    : parseInt(val, 10),
                                            );
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="price"
                                control={control}
                                rules={{
                                    validate: (val) =>
                                        val > 0 ||
                                        'Price must be greater than 0',
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={
                                            field.value === 0 ? '' : field.value
                                        }
                                        type="number"
                                        label="Price (₹)"
                                        fullWidth
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                        slotProps={{
                                            htmlInput: { min: 1 },
                                        }}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            field.onChange(
                                                val === ''
                                                    ? 0
                                                    : parseFloat(val),
                                            );
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="rating"
                                control={control}
                                rules={{
                                    validate: (val) =>
                                        (val >= 1 && val <= 5) ||
                                        'Rating must be between 1.0 and 5.0',
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={
                                            field.value === 0 ? '' : field.value
                                        }
                                        type="number"
                                        label="Rating"
                                        fullWidth
                                        error={!!errors.rating}
                                        helperText={errors.rating?.message}
                                        slotProps={{
                                            htmlInput: {
                                                step: 0.1,
                                                min: 1,
                                                max: 5,
                                            },
                                        }}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            field.onChange(
                                                val === ''
                                                    ? 0
                                                    : parseFloat(val),
                                            );
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="dietType"
                                control={control}
                                rules={{ required: 'Diet type is required' }}
                                render={({ field: { value, onChange } }) => (
                                    <Box width="100%" textAlign="left">
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                            mb={1}
                                        >
                                            Diet Type
                                        </Typography>
                                        <SelectedToggleButton
                                            value={value}
                                            exclusive
                                            fullWidth
                                            onChange={(_, val) => {
                                                if (val !== null) onChange(val);
                                            }}
                                        >
                                            <ToggleButton value="veg">
                                                VEG
                                            </ToggleButton>
                                            <ToggleButton value="nonVeg">
                                                NON VEG
                                            </ToggleButton>
                                        </SelectedToggleButton>
                                    </Box>
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
                            loading={isSubmitting}
                        >
                            {editingItem ? 'Save Changes' : 'Add Item'}
                        </Button>
                    </StyledDialogActions>
                </form>
            </Dialog>

            <Dialog
                open={Boolean(deleteTargetId)}
                onClose={() => setDeleteTargetId(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle variant="h4">Delete Menu Item?</DialogTitle>
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
                        disabled={isDeleting}
                        onClick={() => {
                            if (deleteTargetId) {
                                void handleDelete(deleteTargetId);
                            }
                        }}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </StyledDialogActions>
            </Dialog>
        </RestaurantContainer>
    );
};
