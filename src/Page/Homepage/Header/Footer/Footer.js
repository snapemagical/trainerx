import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";
import MdPhone from '@mui/icons-material/Phone';
import Chip from '@mui/material/Chip';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRight from '@mui/icons-material/ChevronRight';
import LocationOn from '@mui/icons-material/LocationOn';
import IconButton from "@material-ui/core/IconButton";
import FooterLogo from '../../../images/ic_logo_min.png';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import "./Footer.css";
// import facebbok from "../../imgg/facebook.png"
// import linkedin2 from "../../imgg/linkedin2.png"
// import instagram from "../../imgg/instagram.png"

function Footer() {
  return (
    <div className="footerr">
      {/* <Container maxWidth="lg"> */}
      <Grid container spacing={0} style={{}}>
        <Grid className="footerLogoSide" item xs={12} md={6}>
          <div className="footer_logo">
            <img className="img-fluid" src={FooterLogo} />
          </div>
        </Grid>

        <Grid className="footerContentSide" item xs={12} md={6}>
          <div className="details">
            <div className="social_icons">
              <p style={{ display: 'flex' }}>
                <EmailIcon /> info@mavaerosafety.com
              </p>
              <p style={{ display: 'flex' }}>
                <MdPhone />
                +91 124-4843576
              </p>
              <p>
                <LocationOn /> Corporate Office: D82, Lambeth Rd, Rosewood City,
                Sector 50, Gurugram, Haryana India (122001)
              </p>
            </div>
          </div>
          <div className="social-icon-col">
            <a href="#">
              <FacebookIcon className="facebook" />
            </a>
            <a href="#">
              <TwitterIcon className="twitter" />
            </a>
            <a href="#">
              <InstagramIcon className="instagram" />
            </a>
          </div>
          <div className="bottom_footer">
            <p>
              Copyright 2022 MAV AeroSafety - All Rights Reserved.
              <a> Privacy Policy Terms of Service</a>
            </p>
          </div>
        </Grid>
      </Grid>
      {/* </Container> */}
    </div>
  );
}

export default Footer;
