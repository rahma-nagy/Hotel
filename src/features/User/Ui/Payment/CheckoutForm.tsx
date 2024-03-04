import React, {useContext, useState} from "react";
import bank1 from "../../../../assets/images/payment1.png";
import bank2 from "../../../../assets/images/payment2.png";
import {
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Box,
  Stack,
  Grid
  
} from "@mui/material";
import styles from './Payment.module.scss'
import {useStripe, useElements, CardElement, AddressElement} from '@stripe/react-stripe-js';
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
// import CustomModal from '../../../Shared/CustomModal/CustomModal';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({bookingId}) => {
  console.log("from checkout",bookingId);
  // const [modalState, setModalState] = React.useState("close");
  const { requestHeaders } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  // console.log(stripe,
    // elements );
    // const handleClose = () => {
    //   setModalState("close")
    // };
    // view-Modal
  // const showViewModal = () => {
  //   setModalState("view-modal");
  // };
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardElement);
    console.log(cardElement);
    const {token, error} = await stripe.createToken(cardElement);

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
      setErrorMessage(error.message);

    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log(token?.id);
      const tokenId = token?.id;     
      handlePayment(tokenId);
    }


  }

  const handlePayment = async(token)=>{
      try{
        const response = await axios
        .post(`http://upskilling-egypt.com:3000/api/v0/portal/booking/${bookingId}/pay`,
          {token},
          {headers: requestHeaders,}
        )
        // console.log(response.data.message);
        toast.success(response.data.message);
        navigate('/user/home');
      }catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }

  }

  return (
    <>
      <Container
        maxWidth="sm"
        className={styles["payment-container"]}
        
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          className={styles["payment-form"]}
        >
          <AddressElement options={{mode: 'shipping'}} className={styles["adress-elemnt"]} />
          <CardElement className={styles["payment-card"]}/>
          {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
          <Button
           disabled={!stripe}
            type="submit"
            // variant="contained"
            className={styles["payment-button"]}
            // onClick={showViewModal}
          >
            Pay
          </Button>
          {/* <Button
                variant="contained"
                sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
              >
                Cancel
              </Button> */}
        </Box>
      </Container>
       {/* View Modal */}
       {/* <CustomModal
        open={modalState === "view-modal"}
        onClose={handleClose}
        title="Ads Details"

      >
        <div >

          <div style={{ textAlign: 'center' }}>
          nfg

          </div>

          <Grid item xs={6}>
            <Button variant="contained" type="submit"
              onClick={handleClose}
              style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
              Ok
            </Button>
          </Grid>
        </div>
      </CustomModal> */}
    </>
  );
};

export default CheckoutForm;
