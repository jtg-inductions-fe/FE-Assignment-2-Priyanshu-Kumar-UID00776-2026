import { useMemo, useState } from 'react';

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
    MenuItem as SelectMenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { FoodVariantToggle } from '@/components/FilterToggleButton/FilterToggleButton';
import { MenuItemCard } from '@/components/MenuItemCard/MenuItemCard';
import { RestaurantSearch } from '@/components/SearchBar/SearchBar';
import { RestaurantSidebar } from '@/components/Sidebar/Sidebar';
import {
    AddRestaurantButton,
    ControlsWrapper,
    FilterButton,
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
import {
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
} from '@/services/restaurant.service';
import { showNotification } from '@/slices/notificationSlice';
import {
    addMenuItemSuccess,
    deleteMenuItemSuccess,
    editMenuItemSuccess,
} from '@/slices/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { FoodVariant } from '@/types/filterToggleButton.types';
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

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dietFilter, setDietFilter] = useState<FoodVariant>('all');
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [cartQuantities, setCartQuantities] = useState<
        Record<string, number>
    >({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

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
        mode: 'onTouched',
    });

    // Debounce search input to prevent unnecessary re-renders on every keystroke
    const debouncedSearch = useDebounce<string>(searchTerm);

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

    // Add first unit of an item to the cart if it has stock available
    const handleAddToCart = (item: MenuItem) => {
        if ((item.stock ?? 0) > 0) {
            setCartQuantities((prev) => ({ ...prev, [item.id]: 1 }));
        }
    };

    // Increment item count in cart without exceeding available stock
    const handleIncrement = (item: MenuItem) => {
        setCartQuantities((prev) => {
            const current = prev[item.id] || 0;

            if (current < item.stock) {
                return { ...prev, [item.id]: current + 1 };
            }
            return prev;
        });
    };

    // Decrement item quantity or remove it entirely from cart if it reaches 0
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
                    <HeaderButtonWrapper>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton
                                onClick={() => void navigate('/restaurant')}
                            >
                                <ArrowBackIcon />
                            </IconButton>

                            <Typography variant="h1">
                                {selectedRestaurant.name}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
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
                                            setIsDrawerOpen((prev) => !prev)
                                        }
                                    >
                                        Filters
                                    </FilterButton>
                                </>
                            )}
                        </Stack>
                    </HeaderButtonWrapper>
                    {user?.role === 'USER' && (
                        <>
                            <Stack direction="row" spacing={1}>
                                <Clock color="primary" />
                                <Typography variant="body1">
                                    {selectedRestaurant.location}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Location color="primary" />
                                <Typography variant="body1">
                                    {selectedRestaurant.deliveryTime}
                                </Typography>
                            </Stack>
                        </>
                    )}

                    <ControlsWrapper>
                        <RestaurantSearch
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search dishes in this restaurant..."
                        />

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                width: '100%',
                                display: { xs: 'flex', sm: 'none' },
                            }}
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
                                    <FilterButton
                                        variant="outlined"
                                        startIcon={<FilterListIcon />}
                                        onClick={() => setIsDrawerOpen(true)}
                                    >
                                        Filters
                                    </FilterButton>
                                </>
                            )}
                        </Stack>
                    </ControlsWrapper>
                </RestaurantHeaderSection>

                <ScrollableContent>
                    <RestaurantGrid>
                        {filteredMenuItems.length === 0 ? (
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                textAlign="center"
                            >
                                No menu items found for this restaurant.
                            </Typography>
                        ) : (
                            filteredMenuItems.map((item) => (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    isOwner={isOwner}
                                    quantity={cartQuantities[item.id] || 0}
                                    onAction={handleMenuAction}
                                />
                            ))
                        )}
                    </RestaurantGrid>
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
                                name="price"
                                control={control}
                                rules={{ required: 'Price is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Price (₹)"
                                        fullWidth
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseFloat(e.target.value),
                                            )
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="stock"
                                control={control}
                                rules={{
                                    required: 'Stock is required',
                                    min: 0,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Stock Quantity"
                                        fullWidth
                                        error={!!errors.stock}
                                        helperText={errors.stock?.message}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseInt(e.target.value, 10),
                                            )
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="rating"
                                control={control}
                                rules={{ min: 1, max: 5 }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        slotProps={{
                                            htmlInput: {
                                                step: 0.1,
                                                min: 1,
                                                max: 5,
                                            },
                                        }}
                                        label="Rating (1.0 - 5.0)"
                                        fullWidth
                                        onChange={(e) =>
                                            field.onChange(
                                                parseFloat(e.target.value),
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
                                        <SelectMenuItem value="veg">
                                            VEG
                                        </SelectMenuItem>
                                        <SelectMenuItem value="nonVeg">
                                            NON VEG
                                        </SelectMenuItem>
                                    </TextField>
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
