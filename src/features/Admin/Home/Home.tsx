import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { AuthContext } from '../../../context/AuthContext';
import { homeChart } from '../../../services/api';
import { Box } from '@mui/system';
import { Card, Grid, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import  ApiIcon  from '@mui/icons-material/Api';
import  PeopleAltIcon  from '@mui/icons-material/PeopleAlt';

export default function Home() {
  const { requestHeaders } = useContext(AuthContext);
  const [combinedData, setCombinedData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [userData, setUserData] = useState([]);

  const flattenObject = (obj, parentKey = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object') {
        return { ...acc, ...flattenObject(obj[key], newKey) };
      } else {
        return { ...acc, [newKey]: obj[key] };
      }
    }, {});
  };

  const getChartData = () => {
    axios
      .get(`${homeChart}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log(response.data);
        const flatData = flattenObject(response.data.data);

        // Filter data for rooms, facilities, and ads
        const roomsArray = Object.keys(flatData)
          .filter(key => key.startsWith('rooms'))
          .map(key => ({ name: key, value: flatData[key] }));

        const facilitiesArray = Object.keys(flatData)
          .filter(key => key.startsWith('facilities'))
          .map(key => ({ name: key, value: flatData[key] }));

        const adsArray = Object.keys(flatData)
          .filter(key => key.startsWith('ads'))
          .map(key => ({ name: key, value: flatData[key] }));

        // Combine arrays into a single array
        const combinedArray = [...roomsArray, ...facilitiesArray, ...adsArray];

        setCombinedData(combinedArray);

        // Separate data for bookings and users
        const bookingsArray = Object.keys(flatData)
          .filter(key => key.startsWith('bookings'))
          .map(key => ({ name: key, value: flatData[key] }));

        const usersArray = Object.keys(flatData)
          .filter(key => key.startsWith('users'))
          .map(key => ({ name: key, value: flatData[key] }));

        setBookingsData(bookingsArray);
        setUserData(usersArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChartData();
  }, []);

  const COLORS = ['#3949AB', '#FF5252', '#039BE5', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666'];
  const COLORS2 = ['#7E57C2', '#FF6666'];
  const COLORS1 = ['#26A69A', '#FE6645'];

  return (
    <>
      {/* ---------------------- */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Tasks Section */}
          <Grid item xs={12}>
            <Card sx={{ p: 5 }}>
              <div className="titles">
                <Typography variant="h5">Dashboard Analysis</Typography>
              </div>
              <Grid container spacing={3} mt={5}>
                <Grid item xs={4}>
                  <Card sx={{ p: 5, textAlign: 'center', borderRadius: 4, backgroundColor: '#00B0FF', color: 'white' }}>
                    <GridViewIcon />
                    <Typography variant="h5" className="py-5">
                      Rooms
                    </Typography>
                    <Typography variant="h4" >
                      {combinedData.find((entry) => entry?.name.includes('rooms'))?.value || 0}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ p: 5, textAlign: 'center', borderRadius: 4, backgroundColor: '#039BE5', color: 'white' }}>
                    <ApiIcon />
                    <Typography variant="h5" className="py-3 ">
                      Booking Pending
                    </Typography>
                    <Typography variant="h4" >
                      {bookingsData[0]?.value || 0}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ p: 5, textAlign: 'center', borderRadius: 4, backgroundColor: '#00B0FF', color: 'white' }}>
                    <PeopleAltIcon />
                    <Typography variant="h5" className="py-3">
                      Users
                    </Typography>
                    <Typography variant="h4" className="text-dark-light">
                      {userData[0]?.value || 0}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* ---------------------- */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} >

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={combinedData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {combinedData.map((entry, index) => (
                    <Cell key={`combined-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={4} >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingsData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {bookingsData.map((entry, index) => (
                    <Cell key={`bookings-cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={4} >

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {userData.map((entry, index) => (
                    <Cell key={`users-cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
