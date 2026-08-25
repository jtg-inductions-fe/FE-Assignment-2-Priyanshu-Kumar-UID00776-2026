import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import {
    AccessTime as AccessTimeIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    FilterList as FilterListIcon,
    LocationOnOutlined as LocationIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    CardMedia,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem as SelectMenuItem,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BottomNavigationBar } from '@/components/BottomNavigation/BottomNavigation';
import { FoodVariantToggle } from '@/components/FilterToggleButton/FilterToggleButton';
import { RestaurantSearch } from '@/components/SearchBar/SearchBar';
import { RestaurantSidebar } from '@/components/Sidebar/Sidebar';
import { NavbarContainer } from '@/container/Navbar/NavbarContainer';
import { useDebounce } from '@/hooks/useDebounce';
import {
    AddRestaurantButton,
    ContentArea,
    ControlsWrapper,
    FilterButton,
    FilterButtonStack,
    FormStack,
    HeaderButtonWrapper,
    ImageWrapper,
    MainContentLayout,
    MetaItem,
    OwnerActionButton,
    OwnerActionStack,
    RatingBadge,
    RestaurantContainer,
    RestaurantGrid,
    RestaurantHeaderSection,
    ScrollableContent,
    StyledCard,
    StyledCardContent,
    StyledDialogActions,
} from '@/pages/Restuarant/Restaurant.styles';
import {
    addRestaurant,
    deleteRestaurant,
    editRestaurant,
    fetchRestaurants,
} from '@/services/restaurant.service';
import { showNotification } from '@/slices/notificationSlice';
import {
    addRestaurantSuccess,
    deleteRestaurantSuccess,
    editRestaurantSuccess,
    setRestaurants,
} from '@/slices/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { FoodVariant } from '@/types/fIlterToggleButton.types';
import {
    RestaurantFormData,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

export const Restaurant = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const user = useAppSelector((state) => state.auth.user);
    const isOwner = user?.role === 'RESTAURANT OWNER';
    const allRestaurants = useAppSelector(
        (state) => state.restaurant.restaurants,
    );

    const isMobile = Boolean(useMediaQuery(theme.breakpoints.down('sm')));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [dietFilter, setDietFilter] = useState<FoodVariant>('ALL');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] =
        useState<RestaurantItemTypes | null>(null);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RestaurantFormData>({
        defaultValues: {
            name: '',
            location: '',
            dietType: 'BOTH',
            rating: 4.5,
            deliveryTime: '',
            openingTime: '',
        },
        mode: 'onTouched',
    });

    // Fetch all restaurants from the API when the component first renders
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Turn on the loading skeleton while waiting for data
                setIsLoading(true);
                // Call the API service to get restaurant records
                const data = await fetchRestaurants();
                // Save the loaded restaurants into the redux store
                dispatch(setRestaurants(data));
            } catch (err: unknown) {
                const message =
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch restaurants';
                // Pop up an error toast if loading fails
                dispatch(
                    showNotification({
                        message,
                        severity: 'error',
                    }),
                );
            } finally {
                // Turn off the skeleton loader once the request finishes
                setIsLoading(false);
            }
        };
        // Run the initial data loader
        void loadInitialData();
    }, [dispatch]);

    // Delay updating the search query until the user stops typing
    const debouncedValue = useDebounce<string>(searchTerm);

    const handleRatingToggle = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating],
        );
    };

    // Filter restaurants by owner permissions, search keywords, and veg/non-veg tags
    const filteredRestaurants = useMemo(
        () =>
            allRestaurants.filter((restaurant) => {
                // If logged in as an owner, only show restaurants belonging to them
                if (
                    isOwner &&
                    restaurant.ownerId.toLowerCase() !==
                        user?.email.toLowerCase()
                ) {
                    return false;
                }

                // Check if the restaurant name matches what the user typed
                const matchesSearch = restaurant.name
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase());
                // Skip restaurants that don't match the search text
                if (!matchesSearch) return false;

                // Apply food preference filters for regular customers
                if (!isOwner && dietFilter !== 'ALL') {
                    // Hide non-veg places when filtering for pure veg
                    if (
                        dietFilter === 'VEG' &&
                        restaurant.dietType === 'NON_VEG'
                    )
                        return false;
                    // Hide pure veg places when filtering for non-veg
                    if (
                        dietFilter === 'NON_VEG' &&
                        restaurant.dietType === 'VEG'
                    )
                        return false;
                }

                if (selectedRatings.length > 0) {
                    const meetsAnyRating = selectedRatings.some(
                        (minRating) => restaurant.rating >= minRating,
                    );
                    if (!meetsAnyRating) return false;
                }

                // Include the restaurant if it passed all checks
                return true;
            }),
        [
            allRestaurants,
            isOwner,
            user?.email,
            debouncedValue,
            dietFilter,
            selectedRatings,
        ],
    );

    // Open the creation dialog with clean default form fields
    const handleOpenAddModal = () => {
        setEditingRestaurant(null);
        reset({
            name: '',
            location: '',
            dietType: 'BOTH',
            rating: 4.5,
            deliveryTime: '',
            openingTime: '',
        });
        setIsModalOpen(true);
    };

    // Open the dialog and pre-fill form fields with selected restaurant data
    const handleOpenEditModal = (restaurant: RestaurantItemTypes) => {
        setEditingRestaurant(restaurant);
        reset({
            name: restaurant.name,
            location: restaurant.location,
            dietType: restaurant.dietType,
            rating: restaurant.rating,
            deliveryTime: restaurant.deliveryTime,
            openingTime: restaurant.openingTime,
        });
        setIsModalOpen(true);
    };

    // Save changes for an existing restaurant or create a new one
    const onFormSubmit = async (data: RestaurantFormData) => {
        // Prevent submission if the owner email is missing
        if (!user?.email) {
            dispatch(
                showNotification({
                    message: 'You must be logged in as an owner.',
                    severity: 'error',
                }),
            );
            return;
        }

        try {
            // Check whether we are editing an existing item or creating a new one
            if (editingRestaurant) {
                // Send the updated data to the API
                const updated = await editRestaurant(
                    editingRestaurant.id,
                    data,
                    user.email,
                );
                // Update the restaurant record in redux
                dispatch(editRestaurantSuccess(updated));
                // Show a confirmation banner
                dispatch(
                    showNotification({
                        message: 'Restaurant updated successfully!',
                        severity: 'success',
                    }),
                );
            } else {
                // Call the API to create a brand new restaurant
                const created = await addRestaurant(data, user.email);
                // Add the new restaurant to the Redux store
                dispatch(addRestaurantSuccess(created));
                // Show a success banner
                dispatch(
                    showNotification({
                        message: 'Restaurant added successfully!',
                        severity: 'success',
                    }),
                );
            }
            // Close the dialog after saving
            setIsModalOpen(false);
        } catch (error: unknown) {
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

    // Permanently delete a restaurant
    const handleDelete = async (id: string) => {
        // Ensure the owner is logged in before deleting
        if (!user?.email) {
            // Show an authentication required alert
            dispatch(
                showNotification({
                    message: 'Authentication required to delete.',
                    severity: 'error',
                }),
            );
            return;
        }

        try {
            setIsDeleting(true);
            // Call the API service to remove the restaurant
            await deleteRestaurant(id, user.email);
            // Remove the restaurant from the redux store
            dispatch(deleteRestaurantSuccess(id));
            // Show a success banner confirming deletion
            dispatch(
                showNotification({
                    message: 'Restaurant deleted successfully!',
                    severity: 'success',
                }),
            );
            setDeleteTargetId(null);
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to delete restaurant.';
            // Show an error toast if deletion fails
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

    // Convert diet enum codes into friendly display labels for badges
    const formatDietType = (type: string) => {
        if (type === 'NON_VEG') return 'Non-Veg';
        if (type === 'VEG') return 'Pure Veg';
        return 'Veg & Non-Veg';
    };

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
                            <Typography variant="h1">
                                {isOwner ? 'My Restaurants' : 'Restaurants'}
                            </Typography>
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
                                            Add Restaurant
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
                            {isOwner
                                ? 'Manage your restaurants and update menu offerings.'
                                : 'Discover restaurants and explore their menus.'}
                        </Typography>

                        <ControlsWrapper>
                            <RestaurantSearch
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={
                                    isOwner
                                        ? 'Search managed restaurants'
                                        : 'Search for restaurants'
                                }
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
                                            Add Restaurant
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
                        <RestaurantGrid>
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <StyledCard key={index}>
                                        <Skeleton
                                            variant="rectangular"
                                            animation="wave"
                                            height={180}
                                        />
                                        <StyledCardContent>
                                            <Box>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    mb={1}
                                                >
                                                    <Skeleton
                                                        variant="text"
                                                        animation="pulse"
                                                        width="55%"
                                                        height={30}
                                                    />
                                                    <Skeleton
                                                        variant="rounded"
                                                        animation="pulse"
                                                        width={75}
                                                        height={24}
                                                    />
                                                </Stack>
                                                <Skeleton
                                                    variant="text"
                                                    animation="pulse"
                                                    width="40%"
                                                    height={20}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    animation="pulse"
                                                    width="70%"
                                                    height={20}
                                                />
                                            </Box>
                                        </StyledCardContent>
                                    </StyledCard>
                                ))
                            ) : filteredRestaurants.length === 0 ? (
                                <Box
                                    textAlign="center"
                                    py={6}
                                    gridColumn="1 / -1"
                                >
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        No restaurants found.
                                    </Typography>
                                </Box>
                            ) : (
                                filteredRestaurants.map((restaurant) => (
                                    <StyledCard key={restaurant.id}>
                                        <ImageWrapper>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={restaurant.image}
                                                alt={restaurant.name}
                                            />
                                            <RatingBadge variant="body2">
                                                <StarIcon
                                                    fontSize="inherit"
                                                    color="warning"
                                                />
                                                {restaurant.rating}
                                            </RatingBadge>
                                        </ImageWrapper>

                                        <StyledCardContent>
                                            <Box>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Typography
                                                        variant="h3"
                                                        fontWeight={700}
                                                        noWrap
                                                    >
                                                        {restaurant.name}
                                                    </Typography>
                                                    <Chip
                                                        label={`${formatDietType(restaurant.dietType)}`}
                                                        variant="outlined"
                                                        color={
                                                            restaurant.dietType ===
                                                            'VEG'
                                                                ? 'success'
                                                                : restaurant.dietType ===
                                                                    'NON_VEG'
                                                                  ? 'error'
                                                                  : 'default'
                                                        }
                                                    />
                                                </Stack>

                                                <MetaItem variant="body2">
                                                    <AccessTimeIcon fontSize="inherit" />
                                                    <span>
                                                        {restaurant.openingTime}
                                                    </span>
                                                </MetaItem>

                                                <MetaItem variant="body2">
                                                    <LocationIcon fontSize="inherit" />
                                                    <span>
                                                        {restaurant.location}
                                                    </span>
                                                </MetaItem>
                                            </Box>

                                            {isOwner && (
                                                <OwnerActionStack
                                                    direction="row"
                                                    spacing={1.5}
                                                >
                                                    <OwnerActionButton
                                                        variant="outlined"
                                                        fullWidth
                                                        startIcon={<EditIcon />}
                                                        size="small"
                                                        onClick={() =>
                                                            handleOpenEditModal(
                                                                restaurant,
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </OwnerActionButton>
                                                    <OwnerActionButton
                                                        variant="contained"
                                                        color="error"
                                                        fullWidth
                                                        startIcon={
                                                            <DeleteIcon />
                                                        }
                                                        size="small"
                                                        onClick={() =>
                                                            setDeleteTargetId(
                                                                restaurant.id,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </OwnerActionButton>
                                                </OwnerActionStack>
                                            )}
                                        </StyledCardContent>
                                    </StyledCard>
                                ))
                            )}
                        </RestaurantGrid>
                    </ScrollableContent>
                </ContentArea>
            </MainContentLayout>

            <BottomNavigationBar />

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle fontWeight={700}>
                    {editingRestaurant
                        ? 'Edit Restaurant'
                        : 'Add New Restaurant'}
                </DialogTitle>
                <form
                    onSubmit={(e) => {
                        void handleSubmit(onFormSubmit)(e);
                    }}
                >
                    <DialogContent dividers>
                        <FormStack>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: 'Restaurant name is required',
                                    minLength: {
                                        value: 3,
                                        message:
                                            'Name must be at least 3 characters',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Restaurant Name"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Location is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Location"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.location}
                                        helperText={errors.location?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="dietType"
                                control={control}
                                rules={{ required: 'Diet type is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Diet Type"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.dietType}
                                        helperText={errors.dietType?.message}
                                    >
                                        <SelectMenuItem value="VEG">
                                            VEG
                                        </SelectMenuItem>
                                        <SelectMenuItem value="NON_VEG">
                                            NON_VEG
                                        </SelectMenuItem>
                                        <SelectMenuItem value="BOTH">
                                            BOTH
                                        </SelectMenuItem>
                                    </TextField>
                                )}
                            />

                            <Controller
                                name="rating"
                                control={control}
                                rules={{
                                    required: 'Rating is required',
                                    min: {
                                        value: 1,
                                        message: 'Minimum rating is 1',
                                    },
                                    max: {
                                        value: 5,
                                        message: 'Maximum rating is 5',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Rating (1 - 5)"
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{
                                            step: '0.1',
                                            min: 1,
                                            max: 5,
                                        }}
                                        error={!!errors.rating}
                                        helperText={errors.rating?.message}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseFloat(e.target.value) || 0,
                                            )
                                        }
                                    />
                                )}
                            />

                            <Controller
                                name="deliveryTime"
                                control={control}
                                rules={{
                                    required: 'Delivery time is required',
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Delivery Time (e.g. 20-30 min)"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.deliveryTime}
                                        helperText={
                                            errors.deliveryTime?.message
                                        }
                                    />
                                )}
                            />

                            <Controller
                                name="openingTime"
                                control={control}
                                rules={{ required: 'Opening time is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Opening Hours (e.g. 9:00 AM - 10:00 PM)"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.openingTime}
                                        helperText={errors.openingTime?.message}
                                    />
                                )}
                            />

                            <TextField
                                label="Owner Email"
                                variant="outlined"
                                fullWidth
                                disabled
                                value={user?.email || ''}
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
                                : editingRestaurant
                                  ? 'Save Changes'
                                  : 'Add Restaurant'}
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
                <DialogTitle fontWeight={700}>Delete Restaurant?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary">
                        Are you sure you want to delete this restaurant? This
                        action cannot be undone.
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
