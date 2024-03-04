import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IAds } from '../../../../interface/AdsInterface';
import axios from 'axios';
import { addAdsUrl, adsUrl, roomsUrl } from '../../../../services/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import style from './AddNewAd.module.scss';
import { Select } from '@mui/material';
import { toast } from 'react-toastify';
const AddNewAd: React.FC = () => {
    const { requestHeaders } = useContext(AuthContext);
    const navigate = useNavigate();

    const [roomsList, setRoomsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // setActive(event.target.value as string);
        setActive(event.target.value);
    };
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<IAds>();

    // Format Data
    // const appendToFormData = (data: IAds) => {
    //     const formData = new FormData();
    //     formData.append('room', data.room || ''); // Ensure data.room is not undefined
    //     formData.append('discount',data.discount || 0); // Convert discount to string
    //     formData.append('isActive', data.isActive); // Convert isActive to string
    //     return formData;
    // };

    // Cancel Button
    const goBack = () => {
        navigate(-1);
    };

    // Create New Room
    const onSubmit: SubmitHandler<IAds> = async (data: IAds) => {
        // const isActiveBoolean = active === 'yes';
        // data.isActive = isActiveBoolean;
        data.isActive = active === 'yes';
        axios
            .post(`${addAdsUrl}`, data, { headers: requestHeaders })
            .then((response) => {
                navigate('/admin/home/ads');
                toast.success("Ads Add Successfully");
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
            .finally(() => setIsLoading(false));
    };

    // Get All Rooms
    const getAllRooms = () => {
        axios
            .get(`${roomsUrl}`, {
                headers: requestHeaders,
            })
            .then((response) => {
                setRoomsList(response.data.data.rooms);
            })
            .catch((error) => { });
    };

    useEffect(() => {
        getAllRooms();
    }, []);

    return (
        <>
            <Container component="main" className={style.wrapper} sx={{ width: '100%', padding: 0 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} mb={8} mt={4} sx={{ padding: '2rem' }}>
                        <Box
                            sx={{
                                my: 4,
                                mx: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                maxWidth: '100%',
                            }}
                        >
                            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <InputLabel id="roomNumber">Room Number</InputLabel>
                                    <Select
                                        {...register('room', { required: true })}
                                        labelId="roomNumber"
                                        id="roomNumber"
                                        value={getValues('room') || ''}
                                        label="Room Number"
                                        onChange={(e) => setValue('room', e.target.value || '', { shouldValidate: true })}
                                    >
                                        {roomsList?.map((room) => (
                                            <MenuItem key={room._id} value={room._id}>
                                                {room.roomNumber}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {errors.room && <span className="errorMsg">Room is required</span>}

                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <InputLabel id="active">Active</InputLabel>
                                    <Select
                                        {...register('isActive', { required: true })}
                                        labelId="active"
                                        id="active"
                                        value={active}
                                        label="Active"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="yes">Yes</MenuItem>
                                        <MenuItem value="no">No</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.isActive && <span className="errorMsg">Active is required</span>}

                                <TextField
                                    {...register('discount', { required: true, valueAsNumber: true })}
                                    required
                                    id="discount"
                                    label="Discount"
                                    fullWidth
                                    sx={{
                                        width: '100%',
                                        marginBottom: '1rem',

                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        paddingTop: '5px',
                                    }}
                                />
                                {errors.discount && <span className="errorMsg">This field is required</span>}

                                <Grid container spacing={2} justifyContent="flex-end" mt={1}>
                                    <Grid item>
                                        <Button onClick={goBack} variant="outlined">
                                            Cancel
                                        </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button variant="contained" type="submit">
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>


                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AddNewAd;
