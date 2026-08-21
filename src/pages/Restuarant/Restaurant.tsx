import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import {
    AccessTime as AccessTimeIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
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
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { BottomNavigationBar } from '@/components/BottomNavigation/BottomNavigation';
import {
    FoodVariant,
    FoodVariantToggle,
} from '@/components/FilterToggleButton/FilterToggleButton';
import { Navbar } from '@/components/Navbar/Navbar';
import { RestaurantSearch } from '@/components/SearchBar/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import {
    AddRestaurantButton,
    ControlsWrapper,
    FormStack,
    ImageWrapper,
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
import {
    RestaurantFormData,
    RestaurantItemTypes,
} from '@/types/restaurant.types';

export const Restaurant = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isOwner = user?.role === 'RESTAURANT OWNER';
    const allRestaurants = useAppSelector(
        (state) => state.restaurant.restaurants,
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [dietFilter, setDietFilter] = useState<FoodVariant>('ALL');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] =
        useState<RestaurantItemTypes | null>(null);
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

    useEffect(() => {
        const loadInitialData = async () => {
            try {
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
            }
        };
        void loadInitialData();
    }, [dispatch]);

    const debouncedValue = useDebounce<string>(searchTerm);

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

                if (!isOwner && dietFilter !== 'ALL') {
                    if (
                        dietFilter === 'VEG' &&
                        restaurant.dietType === 'NON_VEG'
                    )
                        return false;
                    if (
                        dietFilter === 'NON_VEG' &&
                        restaurant.dietType === 'VEG'
                    )
                        return false;
                }

                return true;
            }),
        [allRestaurants, isOwner, user?.email, debouncedValue, dietFilter],
    );

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

    const formatDietType = (type: string) => {
        if (type === 'NON_VEG') return 'Non-Veg';
        if (type === 'VEG') return 'Pure Veg';
        return 'Veg & Non-Veg';
    };

    return (
        <RestaurantContainer>
            <Navbar />

            <RestaurantHeaderSection>
                <Typography variant="h4" fontWeight={700}>
                    {isOwner ? 'My Restaurants' : 'Restaurants'}
                </Typography>

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
                        <FoodVariantToggle
                            foodVariant={dietFilter}
                            onFilterChange={setDietFilter}
                        />
                    )}
                </ControlsWrapper>
            </RestaurantHeaderSection>

            <ScrollableContent>
                <RestaurantGrid>
                    {filteredRestaurants.map((restaurant) => (
                        <StyledCard key={restaurant.id}>
                            <ImageWrapper>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={restaurant.image}
                                    alt={restaurant.name}
                                />
                                <RatingBadge>
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
                                            variant="h6"
                                            fontWeight={700}
                                            noWrap
                                        >
                                            {restaurant.name}
                                        </Typography>
                                        <Chip
                                            label={`${formatDietType(restaurant.dietType)}`}
                                            variant="outlined"
                                            color={
                                                restaurant.dietType === 'VEG'
                                                    ? 'success'
                                                    : restaurant.dietType ===
                                                        'NON_VEG'
                                                      ? 'error'
                                                      : 'default'
                                            }
                                        />
                                    </Stack>

                                    {!isOwner && (
                                        <MetaItem>
                                            <AccessTimeIcon fontSize="inherit" />
                                            <span>
                                                {restaurant.openingTime}
                                            </span>
                                        </MetaItem>
                                    )}

                                    <MetaItem>
                                        <LocationIcon fontSize="inherit" />
                                        <span>{restaurant.location}</span>
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
                                                handleOpenEditModal(restaurant)
                                            }
                                        >
                                            Edit
                                        </OwnerActionButton>
                                        <OwnerActionButton
                                            variant="contained"
                                            color="error"
                                            fullWidth
                                            startIcon={<DeleteIcon />}
                                            size="small"
                                            onClick={() =>
                                                setDeleteTargetId(restaurant.id)
                                            }
                                        >
                                            Delete
                                        </OwnerActionButton>
                                    </OwnerActionStack>
                                )}
                            </StyledCardContent>
                        </StyledCard>
                    ))}
                </RestaurantGrid>
            </ScrollableContent>

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
