import { useMemo, useState } from 'react';

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
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import {
    AddRestaurantButton,
    ControlsWrapper,
    CuisineTypography,
    FormStack,
    ImageWrapper,
    MetaInfoStack,
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
    SubtitleTypography,
} from './Restaurant.styles';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import DietFilterToggle, {
    FoodVariant,
} from '../../components/FilterToggleButton/FilterToggleButton';
import Navbar from '../../components/Navbar/Navbar';
import RestaurantSearch from '../../components/SearchBar/SearchBar';
import { useAppSelector } from '../../store/store';
import RestaurantItemTypes from '../../types/restaurant.types';

const Restaurant = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isOwner = user?.role === 'RESTAURANT OWNER';

    const [searchTerm, setSearchTerm] = useState('');
    const [dietFilter, setDietFilter] = useState<FoodVariant>('ALL');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        cuisines: '',
        location: '',
        priceRange: '',
        dietType: '',
    });

    const [restaurants, setRestaurants] = useState<RestaurantItemTypes[]>([
        {
            id: '1',
            name: 'Trattoria Bella',
            image: '../../src/assets/images/restaurantPizza.jpeg',
            rating: 4.8,
            priceRange: '$5',
            cuisines: ['Authentic Italian', 'Wood-fired Pizza'],
            location: 'Downtown (1.2 m)',
            deliveryTime: '25-35 min',
            dietType: 'BOTH',
            ownerId: 'owner_1',
        },
        {
            id: '2',
            name: "Ocean's Catch Sushi",
            image: '../../src/assets/images/restaurantItalian.jpeg',
            rating: 4.9,
            priceRange: '$10',
            cuisines: ['Japanese', 'Sushi', 'Seafood'],
            location: 'Westside (2.5 m)',
            deliveryTime: '40-50 min',
            dietType: 'NON_VEG',
            ownerId: 'owner_2',
        },
        {
            id: '3',
            name: 'The Green Sprout',
            image: '../../src/assets/images/restaurantSalad.jpeg',
            rating: 4.6,
            priceRange: '$2.5',
            cuisines: ['Healthy', 'Vegan', 'Salads'],
            location: 'North Park (0.8 m)',
            deliveryTime: '15-25 min',
            dietType: 'VEG',
            ownerId: 'owner_1',
        },
        {
            id: '4',
            name: 'Italiano Pizza',
            image: '../../src/assets/images/restaurantPizza.jpeg',
            rating: 4.0,
            priceRange: '$12.5',
            cuisines: ['Cheesy', 'Crust', 'Spicy'],
            location: 'South Park (4.8 m)',
            deliveryTime: '25-40 min',
            dietType: 'VEG',
            ownerId: 'owner_1',
        },
    ]);

    const filteredRestaurants = useMemo(
        () =>
            restaurants.filter((restaurant) => {
                const matchesSearch = restaurant.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
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
        [restaurants, isOwner, searchTerm, dietFilter],
    );

    const handleDelete = (id: string) => {
        setRestaurants((prev) => prev.filter((r) => r.id !== id));
        setDeleteTargetId(null);
    };

    const handleSaveRestaurant = () => {
        const newRestaurant: RestaurantItemTypes = {
            id: Date.now().toString(),
            name: formData.name,
            image: '../../src/assets/images/restaurnatItaliano',
            rating: 5.0,
            priceRange: formData.priceRange,
            cuisines: formData.cuisines.split(',').map((c) => c.trim()),
            location: formData.location,
            deliveryTime: '20-30 min',
            dietType: formData.dietType as never,
            ownerId: user?.email || 'owner_1',
        };
        setRestaurants([newRestaurant, ...restaurants]);
        setIsAddModalOpen(false);
        setFormData({
            name: '',
            cuisines: '',
            location: '',
            priceRange: '',
            dietType: 'BOTH',
        });
    };

    return (
        <RestaurantContainer>
            <Navbar />

            <RestaurantHeaderSection>
                <Typography variant="h4" fontWeight={700}>
                    {isOwner ? 'My Restaurants' : 'Restaurants'}
                </Typography>

                <SubtitleTypography variant="body1" color="text.secondary">
                    {isOwner
                        ? 'Manage your restaurants and update menu offerings.'
                        : 'Discover restaurants and explore their menus.'}
                </SubtitleTypography>

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
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add Restaurant
                        </AddRestaurantButton>
                    ) : (
                        <DietFilterToggle
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
                                            label={restaurant.priceRange}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Stack>

                                    <CuisineTypography
                                        variant="body2"
                                        color="text.secondary"
                                        noWrap
                                    >
                                        {restaurant.cuisines.join(' • ')}
                                    </CuisineTypography>

                                    <MetaInfoStack direction="row" spacing={2}>
                                        <MetaItem>
                                            <LocationIcon fontSize="inherit" />
                                            <span>{restaurant.location}</span>
                                        </MetaItem>
                                        {!isOwner && (
                                            <MetaItem>
                                                <AccessTimeIcon fontSize="inherit" />
                                                <span>
                                                    {restaurant.deliveryTime}
                                                </span>
                                            </MetaItem>
                                        )}
                                    </MetaInfoStack>
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
            <BottomNavigation />

            <Dialog
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle fontWeight={700}>Add New Restaurant</DialogTitle>
                <DialogContent dividers>
                    <FormStack spacing={2}>
                        <TextField
                            label="Restaurant Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        <TextField
                            label="Cuisines (comma separated)"
                            placeholder="e.g. Italian, Wood-fired Pizza"
                            fullWidth
                            value={formData.cuisines}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    cuisines: e.target.value,
                                })
                            }
                        />
                        <TextField
                            label="Location"
                            placeholder="e.g. 123 Main St, Downtown"
                            fullWidth
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                })
                            }
                        />
                    </FormStack>
                </DialogContent>
                <StyledDialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setIsAddModalOpen(false)}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSaveRestaurant}>
                        Save Restaurant
                    </Button>
                </StyledDialogActions>
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
                        onClick={() =>
                            deleteTargetId && handleDelete(deleteTargetId)
                        }
                    >
                        Delete
                    </Button>
                </StyledDialogActions>
            </Dialog>
        </RestaurantContainer>
    );
};

export default Restaurant;
