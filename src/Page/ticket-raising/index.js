import { Paper } from "@mui/material";
import { React, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles'
import AppLayout from "../../layout/appLayout";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))
function TicketRaising({ match }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/shell.js';
        document.body.appendChild(script);
        script.addEventListener('load', () => {
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
                    region: 'na1',
                    portalId: '19488787',
                    formId: '7ade5503-7094-4d84-b7e7-88ee0a130cd2',
                    target: '#hubspotForm'
                })
            }
        });
    }, []);
  const classes = useStyles()
  return (
        <AppLayout>
            <Paper className={classes.paper} elevation={3} style={{ marginTop: '20px' }}>
                <div id="hubspotForm"></div>
            </Paper>
        </AppLayout>
    );
}
export default TicketRaising;