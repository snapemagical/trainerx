import { Grid, Paper, Button, TextField, Container, Divider } from "@mui/material"
import AppLayout from "../../layout/appLayout"
import { makeStyles } from '@material-ui/core/styles'
import Stack from '@mui/material/Stack'
import { FormC } from "../../common/validation"
import { useState } from "react"
import Fetch from "../../common/fetch"
import swal from "sweetalert"
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
function ResetPassword(props) {
    const [state, setState] = useState({ old_password: '', password: '' })
    const [message, setMessage] = useState('')
    const onSubmit = () => {
        setMessage('')
        Fetch('accounts/change-password/', state, { method: 'post' }).then(d => {
            if (d.status) {
                setState({
                    old_password: '', password: ''
                })
                swal('Password changed successfully', '', 'success', {
                    button: 'OK',
                })
            } else {
                setMessage(d.error)
            }
        })
    }
    const onChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const formValid = FormC({ values: state, onSubmit })
    const classes = useStyles()
    return <AppLayout>
        <Container maxWidth="xl">
            <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
                <Paper>
                    <div
                        className={classes.root}
                        style={{ padding: '20px 20px 50px', marginBottom: '65px' }}
                    >
                        <div className="customHeadingMar">
                            <h2>Change Password</h2>
                            <Divider />
                        </div>
                        <Grid className="form-mt" container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    inputProps={{ maxLength: 30 }}
                                    error={Boolean(
                                        formValid.errors.password && formValid.errors.password
                                    )}
                                    helperText={
                                        formValid.errors.password && formValid.errors.password
                                    }
                                    margin="normal"
                                    label="Old Password"
                                    fullWidth
                                    name="old_password"
                                    variant="outlined"
                                    onBlur={formValid.handleBlur}
                                    onChange={formValid.handleChange}
                                    onKeyUp={onChange}
                                    type="password"
                                    style={{ color: "#fff" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    inputProps={{ maxLength: 30 }}
                                    error={Boolean(
                                        formValid.errors.password && formValid.errors.password
                                    )}
                                    fullWidth
                                    helperText={
                                        formValid.errors.password && formValid.errors.password
                                    }
                                    margin="normal"
                                    label="New Password"
                                    name="password"
                                    variant="outlined"
                                    onBlur={formValid.handleBlur}
                                    onChange={formValid.handleChange}
                                    onKeyUp={onChange}
                                    type="password"
                                    style={{ color: "#fff" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                {message ? <p style={{ color: "red", fontSize: "16px", margin: 0 }}>
                                    {message}
                                </p> : null}
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <Stack
                    spacing={2}
                    direction="row"
                    className="buttonss"
                    style={{ justifyContent: 'right' }}
                >
                    <Button
                        variant="contained"
                        type="button"
                        className="save"
                        onClick={() => props.history.goBack()}
                    >
                        Back
                    </Button>
                    <Button variant="contained" type="submit" className="save">
                        Update
                    </Button>
                </Stack>
            </form>
        </Container>
    </AppLayout>
}
export default ResetPassword