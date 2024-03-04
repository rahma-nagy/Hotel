import * as React from "react";
import { Container, Grid, Box, ScopedCssBaseline } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { Typography, List, ListItem } from "@mui/material";
import Link from "@mui/material/Link";
import styles from './Footer.module.scss'

const Footer = () => {
  const footerSections = [
    {
      title: "Staycation.",
      links: [
        { text: "We kaboom your beauty holiday instantly and memorable." },
        { text: "" },
        { text: "" },
      ],
    },
    {
      title: "For Beginners",
      links: [
        { text: "New Account" },
        { text: "Start Booking a Room" },
        { text: "Use Payments" },
      ],
    },
    {
      title: "Explore Us",
      links: [
        { text: "Our Careers" },
        { text: "Privacy" },
        { text: "Terms & Conditions" },
      ],
    },
    {
      title: "Connect Us",
      contactInfo: [
        { text: "support@staycation.id" },
        { text: "021 - 2208 - 1996" },
        { text: "Staycation, Jakarta" },
      ],
    },
  ];
  // Défin  routes for every text
// const linkRoutes = {
//   'New Account': '/register',
//   'Start Booking a Room': '/booking',
//   'Use Payments': '/pay',

// };

  return (
    <ScopedCssBaseline sx={{ py: 2, backgroundColor: "#f5f5f5", marginTop: 'auto' }} >

      <Container component="footer" >
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pl: 8,
          }}
        >
          {/* /* /** */}
          {/* <Grid >
          <Typography
            variant="h5"
            noWrap
            component="a"
            // gutterBottom
            href="#home"
            sx={{ textDecoration: "none",
            fontSize: "2.5rem" }}
          >
            <Box component="span" sx={{ color: "#007BFF", fontWeight: "bold" }}>
              Stay
            </Box>
            <Box component="span" sx={{ color: "black", fontWeight: "bold" }}>
              cation.
            </Box>
          </Typography>
          <Typography sx={{ pt: 3, maxWidth: "200px" }}>
            We kaboom your beauty holiday instantly and memorable.

          </Typography>

        </Grid> */}
          {/* /* /** */}
          {footerSections.map((section, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: index === 0 ? "bold" : "normal",
                  color: index === 0 ? "#007BFF" : "text.primary",
                  fontSize: index === 0 ? "2.3rem" : "1.5rem",
                }}
                gutterBottom
              >
                {index === 0 ? (
                  <>
                    <span style={{ color: "#007BFF" }}>Stay</span>
                    <span style={{ color: "black" }}>cation.</span>
                  </>
                ) : (
                  section.title
                )}
              </Typography>
              {section.links && (
                <List>
                  {section.links.map((link, linkIndex) => (
                    <ListItem
                       className={styles['css-18olizl-MuiListItem-root']}
                      key={linkIndex}
                      sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                      {link.text}

                    </ListItem>
                  ))}
                </List>
              )}
              {section.contactInfo && (
                <List>
                  {section.contactInfo.map((info, infoIndex) => (
                    <ListItem
                       className={styles['css-18olizl-MuiListItem-root']}
                      key={infoIndex}
                      sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                      {info.text}
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </ScopedCssBaseline>
  );
};

export default Footer;
