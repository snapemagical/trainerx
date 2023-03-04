import { Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Settings, AccountCircle, NotificationsActive, Help } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppContext } from '../../context/App';
import { useNavigate } from 'react-router-dom';
import logo from '../../Page/images/trainerX_logo_Blue.png'
function Footer({
    open,
    AppBar,
    context,
}) {
    const history = useNavigate()
    const { role, notificationsCount, userProfile } = context
    const disabled = role > 2
    return (
        <AppBar
            className={`footer ${open ? 'mainHeaderOpen' : 'mainHeader'}`}
            position="fixed"
            open={open}
            style={{
                backgroundColor: '#FFFFFF',
                color: 'black',
                paddingBottom: '11px',
                paddingTop: '13px',
            }}
        >
            <div className='flex align-center justify-between'>
                <p><a href='https://www.mavaerosafety.com' target={'_blank'}>MAV AeroSafety Consultancy LLP</a></p>
                <ul>
                    <li>
                        <a href='https://www.mavaerosafety.com/privacy-policy' target={'_blank'}>Privacy & Policy</a>
                    </li>
                    <li>
                        <a href='https://www.mavaerosafety.com/terms-of-service' target={'_blank'}>Terms of Use</a>
                    </li>
                </ul>
                {/* <p>Copyright 2022. All rights reserved.</p> */}
            </div>
        </AppBar>
    )
}
export default Footer;