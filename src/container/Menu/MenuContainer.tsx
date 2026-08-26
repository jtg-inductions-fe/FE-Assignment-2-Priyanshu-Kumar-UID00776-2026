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
import type { MenuFormData, MenuItem } from '@/types/restaurant.types';

export const MenuContainer = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const user = useAppSelector((state) => state.auth.user);
    const isOwner = user?.role === 'RESTAURANT OWNER';

    const selectedRestaurant = useAppSelector((state) =>
        state.restaurant.restaurants.find(
            (restaurant) => restaurant.id === restaurantId,
        ),
    );

    const isMobile = Boolean(useMediaQuery(theme.breakpoints.down('sm')));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
            rating: 0,
            stock: 0,
            dietType: 'VEG',
            category: '',
        },
        mode: 'onTouched',
    });

    // Debounce search input to prevent unnecessary re-renders on every keystroke
    const debouncedSearch = useDebounce<string>(searchTerm);

    // Calculate total number of items currently in the cart
    const totalCartCount = useMemo(
        () => Object.values(cartQuantities).reduce((acc, qty) => acc + qty, 0),
        [cartQuantities],
    );

    // Toggle star rating filters in the sidebar
    const handleRatingToggle = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating],
        );
    };

    // Filter menu items by search query, diet type, and minimum rating
    const filteredMenuItems = useMemo(() => {
        // Return an empty list if the restaurant has no menus
        if (!selectedRestaurant?.menus) return [];

        return selectedRestaurant.menus.filter((item: MenuItem) => {
            // Check if the item name includes the searched text
            const matchesSearch = item.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());
            // Return fasle if it doesn't match the search term
            if (!matchesSearch) return false;

            // Apply veg, non-veg filter if one is selected
            if (dietFilter !== 'ALL') {
                if (dietFilter === 'VEG' && item.dietType !== 'VEG')
                    return false;
                if (dietFilter === 'NON_VEG' && item.dietType !== 'NON_VEG')
                    return false;
            }

            // Check if the item matches any of the active rating filters
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
            // Only increment if we have enough stock left
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
            // Decrease quantity if more than 1 item is in cart
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
            dietType: 'VEG',
            category: '',
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
        // Return error if user is not authenticated or restaurant ID is missing
        if (!user?.email || !restaurantId) {
            dispatch(
                showNotification({
                    message: 'You must be logged in as an owner.',
                    severity: 'error',
                }),
            );
            return;
        }
        // Attempt to create or update the menu item
        try {
            // Update the existing item if edit mode is active
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
            }
            // Otherwise create and append a new menu item
            else {
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
            // Close the modal dialog upon successful save
            setIsModalOpen(false);
        } catch (error: unknown) {
            // Handle edit or add failures
            const message =
                error instanceof Error
                    ? error.message
                    : 'An error occurred while saving.';
            // Show a error banner if saving fails
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
        // Verify user authentication before allowing deletion
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
            // Show error alert if deletion fails
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
            // Reset deleting loading state regardless of outcome
            setIsDeleting(false);
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
            <NavbarContainer cartCount={totalCartCount} />

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

                                <Typography variant="h1">
                                    {selectedRestaurant.name}
                                </Typography>
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
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: '100%',
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

            <BottomNavigationBarContainer cartCount={totalCartCount} />

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
                                rules={{ min: 0, max: 5 }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        slotProps={{
                                            htmlInput: {
                                                step: 0.1,
                                                min: 0,
                                                max: 5,
                                            },
                                        }}
                                        label="Rating (0.0 - 5.0)"
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
