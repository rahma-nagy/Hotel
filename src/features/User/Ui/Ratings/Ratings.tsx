import { Typography, Button, Grid } from '@mui/material'
import { Container, Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import RateComponent from '../../../Shared/RateComponent/RateComponent'
import { allReviewsUrl, createReviewsUrl } from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import style from './Ratings.module.scss'
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import loginImge1 from '../../../../assets/images/login Popup1.jpg'
import CustomModal from '../../../Shared/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';


function Ratings({ roomId }) {
    const { requestHeaders, userData } = useContext(AuthContext);
    // const { userId } = useContext(AuthContext);
    const [userRating, setUserRating] = useState(0); // State to store the user's rating
    const [reviewText, setReviewText] = useState('');
    const { register, handleSubmit, setValue, reset } = useForm();
    const [reviewsList, setReviewsList] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const navigate = useNavigate();
    const handleRatingChange = (rating) => {
        setUserRating(rating);
    };
    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    const toggleReviews = () => {
        setShowReviews((prev) => !prev);
    }

    // ***********view-Modal*************
    const [modalState, setModalState] = React.useState("close");
    const showLoginModal = () => {
        setModalState("login-modal");
    };
    const handleClose = () => {
        setModalState("close");
    };

    // const createReview = async (data) => {
    //     try {

    //         await axios.post(
    //             createReviewsUrl,
    //             {
    //                 roomId: roomId,
    //                 rating: userRating,
    //                 review: data.review,
    //             },
    //             {
    //                 headers: requestHeaders,
    //             }
    //         );

    //         toast.success("Review created successfully");
    //         reset();
    //         getAllReviews();
    //     } catch (error) {
    //         console.error("Error creating review:", error);
    //         toast.error(error.response.data.message);
    //     }
    // };

    const createReview = (data) => {
        if (!userData) {
            // toast.info('login now')
            showLoginModal();
        }
        else {
            axios.post(
                createReviewsUrl,
                {
                    roomId: roomId,
                    rating: userRating,
                    review: data.review,
                },
                {
                    headers: requestHeaders,
                }
            ).then((response) => {
                toast.success("Review created successfully");
                reset();
                getAllReviews();
            }).catch((error) => {
                toast.error(error.response.data.message);

            });
        }


    };

    const goLogin = () => {
        // navigate('/login');
        navigate('/login', { state: { from: location.pathname } });
    };

    const getAllReviews = () => {
        axios.get(`${allReviewsUrl}${roomId}`,
            {
                headers: requestHeaders
            })
            .then((response) => {
                // console.log("Comment created successfully:", response.data);
                setReviewsList(response?.data?.data?.roomReviews)
                console.log(response?.data?.data?.roomReviews);


            })
            .catch((error) => {
                console.error("Error creating comment:", error);

            })
    }

    useEffect(() => {
        getAllReviews();
    }, []);


    return (
        <>

            <Box sx={{ mt: "1rem" }}>
                <Typography variant="h5" sx={{ pt: "1.5rem", pb: "1.5rem" }}>Rate</Typography>
                <RateComponent onChange={handleRatingChange} />
                <form onSubmit={handleSubmit(createReview)}>
                    <textarea
                        {...register('review', { required: true })}
                        className={style.messageField}
                        id="outlined-multiline-static"
                        placeholder='Wite Your Rate Message Here...'
                        rows={6}
                        defaultValue="Add rate"
                        value={reviewText}
                        onChange={handleReviewTextChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
                    >
                        Rate
                    </Button>
                    {/* Button to toggle comments visibility */}
                    <div style={{ marginTop: '1rem' }}>
                        <Button variant="contained" onClick={toggleReviews}>
                            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                        </Button>
                    </div>
                </form>
            </Box>
            {console.log('reviewsList:', reviewsList)}
            {showReviews && reviewsList && reviewsList.length > 0 && (
                <Container>
                    <Box sx={{ pt: "1.5rem", pb: "4rem" }}>
                        {/* Filter comments for the current user */}
                        {reviewsList
                            // .filter((review) => review.user?._id === userId)
                            .map((review) => (
                                <div key={review._id} className={style.commentContainer}>
                                    {/* Render UI for each comment */}
                                    <div className={style.commentContent}>
                                        <p>{review.user?.userName}: {review.review}</p>                                    </div>

                                    <div className={style.commentActions}>
                                        <Button>
                                            <EditIcon />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                    </Box>
                </Container>
            )}
            <CustomModal
                open={modalState === "login-modal"}
                onClose={handleClose}
                title="Hey you need to login first !"
            >

                <div className="customModal">
                    <img src={loginImge1} style={{ width: '300px', height: '300px' }} alt="" />

                    <Grid
                        item xs={6}>
                        <Button
                            sx={{ mb: '9px' }}
                            variant="contained"
                            type="submit"
                            onClick={handleClose}
                            className="btnClose"
                            color="error"
                        >
                            close
                        </Button>
                    </Grid>
                </div>

                <Grid item xs={6}>
                    <Button
                        sx={{ mt: '45px', ml: '-70px' }}
                        variant="contained"
                        type="submit"
                        onClick={goLogin}
                        className="btnClose"
                    >

                        Login
                    </Button>
                </Grid>
            </CustomModal>
        </>
    )
}

export default Ratings