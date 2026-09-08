import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
    Add as AddIcon,
    FilterList as FilterListIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem as SelectMenuItem,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { FoodVariantToggle } from '@/components/FilterToggleButton/FilterToggleButton';
import { RestaurantCard } from '@/components/RestaurantCard/RestaurantCard';
import { RestaurantSearch } from '@/components/SearchBar/SearchBar';
import { RestaurantSidebar } from '@/components/Sidebar/Sidebar';
import {
    DELIVERY_TIME_SLOTS,
    DIET_TYPE_LABELS,
} from '@/constant/restaurantConstants';
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
    StyledCard,
    StyledCardContent,
    StyledDialogActions,
} from '@/container/Restaurant/Restaurant.styles';
import { useDebounce } from '@/hooks/useDebounce';
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
import { FoodVariant } from '@/types/filterToggleButton.types';
import {
    RestaurantFormData,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

export const Restaurant = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const isOwner = user?.role === 'RESTAURANT OWNER';
    const allRestaurants = useAppSelector(
        (state) => state.restaurant.restaurants,
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [dietFilter, setDietFilter] = useState<FoodVariant>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] =
        useState<RestaurantItemTypes | null>(null);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const EMPTY_RESTAURANT_FORM: RestaurantFormData = {
        name: '',
        location: '',
        dietType: 'both',
        rating: 4.5,
        deliveryTime: '',
        openingTime: '',
        endTime: '',
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RestaurantFormData>({
        defaultValues: EMPTY_RESTAURANT_FORM,
        mode: 'onTouched',
    });

    // Fetch all restaurants from the API when the component first renders
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
                        : 'Failed to fetch restaurants';
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
                if (
                    isOwner &&
                    restaurant.ownerId.toLowerCase() !==
                        user?.email.toLowerCase()
                ) {
                    return false;
                }

                const matchesSearch = restaurant.name
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase());

                if (!matchesSearch) return false;

                if (!isOwner && dietFilter !== 'all') {
                    if (
                        dietFilter === 'veg' &&
                        restaurant.dietType === 'nonVeg'
                    )
                        return false;

                    if (
                        dietFilter === 'nonVeg' &&
                        restaurant.dietType === 'veg'
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
        reset(EMPTY_RESTAURANT_FORM);
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
            endTime: restaurant.endTime,
        });
        setIsModalOpen(true);
    };

    // Save changes for an existing restaurant or create a new one
    const onFormSubmit = async (data: RestaurantFormData) => {
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
                const updated = await editRestaurant(
                    editingRestaurant.id,
                    data,
                    user.email,
                );
                dispatch(editRestaurantSuccess(updated));
                dispatch(
                    showNotification({
                        message: 'Restaurant updated successfully!',
                        severity: 'success',
                    }),
                );
            } else {
                const created = await addRestaurant(data, user.email);

                dispatch(addRestaurantSuccess(created));

                dispatch(
                    showNotification({
                        message: 'Restaurant added successfully!',
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

    // Permanently delete a restaurant
    const handleDelete = async (id: string) => {
        if (!user?.email) {
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

            await deleteRestaurant(id, user.email);

            dispatch(deleteRestaurantSuccess(id));

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
                        <Typography variant="h1">
                            {isOwner ? 'My Restaurants' : 'Restaurants'}
                        </Typography>

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
                                            setIsDrawerOpen((prev) => !prev)
                                        }
                                    >
                                        Filters
                                    </FilterButton>
                                </>
                            )}
                        </Stack>
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

                        <Box
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                width: '100%',
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
                                    Add Restaurant
                                </AddRestaurantButton>
                            ) : (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                >
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
                                </Stack>
                            )}
                        </Box>
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
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                textAlign="center"
                            >
                                No restaurants found.
                            </Typography>
                        ) : (
                            filteredRestaurants.map((restaurant) => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                    isOwner={isOwner}
                                    onEdit={handleOpenEditModal}
                                    onCardClick={(id) =>
                                        void navigate(`/restaurant/${id}`)
                                    }
                                    onDelete={setDeleteTargetId}
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
                <DialogTitle variant="h6">
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
                                        {Object.entries(DIET_TYPE_LABELS).map(
                                            ([value, label]) => (
                                                <SelectMenuItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectMenuItem>
                                            ),
                                        )}
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
                                        slotProps={{
                                            htmlInput: {
                                                step: '0.1',
                                                min: 1,
                                                max: 5,
                                            },
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
                                        select
                                        label="Delivery Time"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.deliveryTime}
                                        helperText={
                                            errors.deliveryTime?.message
                                        }
                                    >
                                        {DELIVERY_TIME_SLOTS.map((slot) => (
                                            <SelectMenuItem
                                                key={slot}
                                                value={slot}
                                            >
                                                {slot}
                                            </SelectMenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Box display="flex" gap={5} width="100%">
                                <Controller
                                    name="openingTime"
                                    control={control}
                                    rules={{
                                        required: 'Start time is required',
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Start Time"
                                            type="time"
                                            fullWidth
                                            error={!!errors.openingTime}
                                            helperText={
                                                errors.openingTime?.message
                                            }
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="endTime"
                                    control={control}
                                    rules={{ required: 'End time is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="End Time"
                                            type="time"
                                            fullWidth
                                            error={!!errors.endTime}
                                            helperText={errors.endTime?.message}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Box>
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
                            {editingRestaurant
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
                <DialogTitle variant="h4">Delete Restaurant?</DialogTitle>
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
                        loading={isDeleting}
                        onClick={() => {
                            if (deleteTargetId) {
                                void handleDelete(deleteTargetId);
                            }
                        }}
                    >
                        Delete
                    </Button>
                </StyledDialogActions>
            </Dialog>
        </RestaurantContainer>
    );
};
