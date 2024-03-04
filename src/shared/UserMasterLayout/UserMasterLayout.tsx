import React from 'react'
import NavBar from '../../features/User/Ui/NavBar/NavBar'
import { Box } from '@mui/system'
import Footer from '../../features/User/Ui/Footer/Footer'
import { Outlet } from 'react-router-dom'

function UserMasterLayout() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
                }}
            >
                <NavBar />
                <Box sx={{ flex: '1' , minHeight: '100vh' }}>
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </>
    )
}

export default UserMasterLayout