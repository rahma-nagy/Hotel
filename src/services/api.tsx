// ******** Base Url **********
export const baseUrl = "http://upskilling-egypt.com:3000/api/v0";
// ***********home chart**********
export const homeChart = `${baseUrl}/admin/dashboard`

// ******** Login ********
export const loginUrl = `${baseUrl}/admin/users/login`;
// ******** Register ********
export const regisrterUrl = `${baseUrl}/admin/users`;
// ******** Reset-Password ********
export const resetPassUrl = `${baseUrl}/admin/users/reset-password`;
// ******** forget-Password ********
export const forgetPassUrl = `${baseUrl}/admin/users/forgot-password`;
// ******** Change-Password ********
export const changePassUrl = `${baseUrl}/admin/users/change-password`;
// export const forgetPassUrl = `${baseUrl}/admin/users/forgot-password`;
// ******** users-url ********
export const usersUrl = `${baseUrl}/admin/users`;
// ******* Get All Rooms *********
export const roomsUrl = `${baseUrl}/admin/rooms`
// ******* Create Rooms *********
export const addroomsUrl = `${baseUrl}/admin/rooms`
// ******* Rooms Details *********
export const roomsDetailsUrl = `${baseUrl}/admin/rooms/` //with id
// ******* Update Rooms *********
export const updateRoomsUrl = `${baseUrl}/admin/rooms/` //with id
// ******* Delete Rooms *********
export const deleteRoomsUrl = `${baseUrl}/admin/rooms/` //with id
// ******* Get All Rooms Facility*********
export const facilitiesRoomsUrl = `${baseUrl}/admin/room-facilities`;

// ******* Get facility Details*********
// export const facilitiesDetailsUrl = `${baseUrl}/admin/room-facilities`;


//********* Get Ads ********/
export const adsUrl = `${baseUrl}/admin/ads`
//********* Create Ads ********/
export const addAdsUrl = `${baseUrl}/admin/ads`
//********* Get Ads Details ********/
export const adsDetailsUrl = `${baseUrl}/admin/ads/` //With id
//********* Update Ads ********/
export const updateAdsUrl = `${baseUrl}/admin/ads/` //With id
//********* Delete Ads ********/
export const deleteAdsUrl = `${baseUrl}/admin/ads/` //With id


// ******** all bookings ********
export const bookingUrl = `${baseUrl}/admin/booking`;
// ******** booking details********
export const bookingDetailsUrl = `${baseUrl}/admin/booking`;
// ******** delete booking ********
export const deleteBookingUrl = `${baseUrl}/admin/booking`;


// ******** USER API********
// ******** Login user ********
export const userLoginUrl = `${baseUrl}/portal/users/login`;
// ******** Register user  ********
export const userRegisrterUrl = `${baseUrl}/portal/users`;
// ******** Reset-Password user  ********
export const userResetPassUrl = `${baseUrl}/portal/users/reset-password`;
// ******** forget-Password user  ********
export const userForgetPassUrl = `${baseUrl}/portal/users/forgot-password`;
// ******** Change-Password user ********
export const userChangePassUrl = `${baseUrl}/portal/users/change-password`;



// ******** Rooms Dispaly ***********
export const roomsDisplayUrl = `${baseUrl}/portal/rooms/available?page=1&size=40`;

// ******** Favorite Rooms **********
export const favRooms = `${baseUrl}/portal/favorite-rooms`

// ******** Rooms Details ***********

export const userRoomsDetailsUrl =`${baseUrl}/portal/rooms/` //with id


// ***********get all filtered rooms*************
export const allRoomsFilterdUrl =`${baseUrl}/portal/rooms/available`;


// ********** Ads Display ************
export const userAdsDisplayUrl = `${baseUrl}/portal/ads`;


// ***********add to fav rooms*************
export const addToFavUrl =`${baseUrl}/portal/favorite-rooms`;
// ***********get all fav rooms*************
export const allFavRoomsUrl =`${baseUrl}/portal/favorite-rooms`;
// ***********remove from fav rooms*************
// TODO add id
export const removeFavRoomUrl =`${baseUrl}/portal/favorite-rooms`;

// ***********get all reviewss*************
export const allReviewsUrl =`${baseUrl}/portal/room-reviews/`;//With id
// ********** create reviewss*************

export const createReviewsUrl =`${baseUrl}/portal/room-reviews/`;


//***********create booking***********
export const createBookingUrl =`${baseUrl}/portal/booking`;
  // ************ get Booking Details****************
export const getBookingdetailsUrl =`${baseUrl}/portal/booking/`;//With id

// ***********Comment Curd URl************
export const commentUrl =`${baseUrl}/portal/room-comments`

