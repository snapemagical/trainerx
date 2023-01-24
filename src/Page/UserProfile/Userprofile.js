import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import Button from '@material-ui/core/Button'
import Avatar from '@mui/material/Avatar'
import './Userprofile.css'
import AppLayout from '../../layout/appLayout'
import Fetch from '../../common/fetch'
import { withContext } from '../../context/appContext'
import { useParams } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

function Userprofile({ context, history }) {
  var url = history.location.search ? history.location.search?.split('?profileId=')[1] : '';
  //  const { id } = useParams()
  const classes = useStyles()
  const [profileList, setProfile] = useState({})
  const [emergencyDetail, setEmergencyDetail] = useState({})

  useEffect(() => {
    context.getProfile()
  }, [])
  useEffect(() => {
    Fetch('accounts/user_emergency/').then((d) => {
      if (d?.status) {
        const { data } = d
        setEmergencyDetail({
          relation: data.relation ? data.relation : '',
          full_name: data.full_name ? data.full_name : '',
          contact: data.contact ? data.contact : '',
        })
      }
    })
    if (url) {
      Fetch(`accounts/user/view-user-profile/?id=${url}`).then((d) => {
        if (d?.status) {
          const { data } = d
          setProfile(data)
        }
      })
    } else {
      setProfile(context.userProfile)
    }
  }, [context.userProfile])
  const { role } = context
  const disabled = role > 2
  const { profile } = profileList
  return (
    <AppLayout>
      <Container className="user_profile" maxWidth="xl">
        <Grid
          style={{ marginBottom: '10px' }}
          container
          spacing={3}
        >
          <Grid
            className="customColP"
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              marginTop: '0px',
              color: '#3D4A68',
            }}
          >
            <h2 className="m-0">My Profile</h2>
          </Grid>

          {disabled ? null : <Grid
            className="buttonColhalf"
            item
            xs={12}
            sm={12}
            md={6}
            style={{ marginTop: '0px', marginBottom: '0px' }}
          >
            <Link
              to="/user-profile/personal"
              style={{ textDecoration: 'none' }}
            >
              <Button
                className="usermgbtn"
                variant="contained"
                type="submit"
                style={{
                  float: 'right',
                  textTransform: 'capitalize',
                  backgroundColor: '#7564E7',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                Edit Profile
              </Button>
            </Link>
          </Grid>}

        </Grid>
        <Paper className="form-shadow" elevation={3}>
          <div
            className={classes.root}
            style={{ padding: '20px', marginBottom: '65px' }}
          >
            <p className="Basic profile-value" style={{ marginBottom: '10px' }}>
              Basic Details
            </p>

            <Divider />
            <Grid className="mb-30" container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                className="profileImg"
                style={{
                  marginTop: '20px',
                  color: '#3D4A68',
                  backgroundColor: 'white',
                }}
              >
                <div className="Remy" style={{ backgroundColor: 'white' }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      profile?.profile_image
                        ? profile?.profile_image
                        : '/static/images/avatar/1.jpg'
                    }
                    sx={{ width: 188, height: 188 }}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={2}
                style={{
                  marginTop: '20px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p className="Full">Full Name</p>
                  <p className="Basic profile-value">
                    {profile?.first_name
                      ? profile?.first_name + ' ' + (profile?.middle_name ? profile?.middle_name + ' ' : '') + profile?.last_name
                      : '-'}
                  </p>
                </div>
                <div className="Basic1">
                  <p>Date of Birth</p>
                  <p className="Basic profile-value">
                    {profile?.date_of_birth ? profile?.date_of_birth : '-'}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                style={{
                  marginTop: '20px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>Email ID</p>
                  <p className="Basic profile-value">{profileList?.email}</p>
                </div>
                <div className="Basic1">
                  <p>Position</p>
                  <p className="Basic profile-value position">{profileList?.position} Pilot</p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                style={{
                  marginTop: '20px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>Contact No.</p>
                  <p className="Basic profile-value">{profileList?.phone_no}</p>
                </div>
                {profileList?.position !== 'instructor' ?<div className="Basic1">
                  <p>Course Applied</p>
                  <p className="Basic profile-value">
                    {profile?.course_applied ? profile?.course_applied_name : '-'}
                  </p>
                </div>:null}
              </Grid>
            </Grid>
            <p className="Basic profile-value" style={{ marginBottom: '10px' }}>
              Emergency Contact Details
            </p>
            <Divider />
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={2}
                style={{
                  marginTop: '10px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>Full Name</p>
                  <p className="Basic profile-value">
                    {emergencyDetail?.full_name
                      ? emergencyDetail?.full_name
                      : '-'}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={2}
                style={{
                  marginTop: '10px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>Relation</p>
                  <p className="Basic profile-value">
                    {emergencyDetail?.relation
                      ? emergencyDetail?.relation
                      : '-'}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={2}
                style={{
                  marginTop: '10px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>Contact No.</p>
                  <p className="Basic profile-value">
                    {emergencyDetail?.contact ? emergencyDetail?.contact : '-'}
                  </p>
                </div>
              </Grid>
            </Grid>

            <p className="Basic profile-value" style={{ marginTop: '40px' }}>
              Other Details
            </p>
            <Divider />
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={2}
                style={{
                  marginTop: '10px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>License Type</p>
                  <p className="Basic profile-value">
                    {profileList?.license_type
                      ? profileList?.license_type
                      : '-'}
                  </p>
                </div>
                
                <div>
                  <p>Medical Expiry</p>
                  <p className="Basic profile-value">
                    {profileList?.medical_expiry
                      ? profileList?.medical_expiry
                      : '-'}
                  </p>
                </div>

                <div className="Basic1">
                  <p>ELP Details</p>
                  <p className="Basic profile-value">
                    {profileList?.elp_details ? profileList?.elp_details : '-'}
                  </p>
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={2}
                style={{
                  marginTop: '10px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>License Expiry</p>
                  <p className="Basic profile-value">
                    {profileList?.license_expiry
                      ? profileList?.license_expiry
                      : '-'}
                  </p>
                </div>
                

                <div className="Basic1">
                  <p>ELPValid upto</p>
                  <p className="Basic profile-value">
                    {profileList?.elp_valid_upto
                      ? profileList?.elp_valid_upto
                      : '-'}
                  </p>
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                style={{
                  marginTop: '10px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>Instrument Rating</p>
                  <p className="Basic profile-value">
                    {profileList?.instrument_rating
                      ? profileList?.instrument_rating
                      : '-'}
                  </p>
                </div>

                <div className="Basic1">
                  <p>A/c Endorsement</p>
                  <p className="Basic profile-value">
                    {profileList?.aircraft_endorsement
                      ? profileList?.aircraft_endorsement
                      : '-'}
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={5}
                style={{
                  marginTop: '10px',
                  color: '#3D4A68',
                }}
              >
                <div>
                  <p>Other Ratings</p>
                  <p className="Basic profile-value">
                    {profileList?.other_ratings
                      ? profileList?.other_ratings
                      : '-'}
                  </p>
                </div>

                <div className="Basic1">
                  <p>A/c Endorsement Date</p>
                  <p className="Basic profile-value">
                    {profileList?.aircraft_endorsement_date
                      ? profileList?.aircraft_endorsement_date
                      : '-'}
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Container>
    </AppLayout>
  );
}
export default withContext(Userprofile)
