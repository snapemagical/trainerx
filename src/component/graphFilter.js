import { FormControl, Select, RadioGroup, Radio, FormControlLabel, Checkbox, Stack, TextField, MenuItem } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Grid } from "@mui/material";
import { Container, Button } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import Fetch from "../common/fetch";
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
export const GraphFilter = ({ changeFilter,stateFilter,showList = { aircraft:false,student: false, date: false, instructor: false } }) => {
    const [date, setDate] = useState({
        from_date: null,
        to_date: null,
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState({
        student: [],
        instructor: [],
        aircraft:[]
    })
    const [filtersAll, setFilterAll] = useState({
        instructor_id: '',
        student_id:'',
        yearly: '',
        monthly: '',
        from_date: '',
        to_date: '',
        aircraft_id:''
    })
    useState(()=>{
        if(stateFilter){
            setFilterAll(stateFilter)
            setDate({
                from_date: stateFilter.from_date?moment(stateFilter.from_date).format('llll'):null,
                to_date: stateFilter.to_date?moment(stateFilter.to_date).format('llll'):null,
            })
        }
    },[stateFilter])
    const open = Boolean(anchorEl);
    const [customDate,setcustomDate]=useState(false)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        Fetch('accounts/user-invite/instructor-list/').then(d => {
            if (d?.status) {
                setData((prev) => ({
                    ...prev,
                    instructor: d.data
                }))
            }
        })
        Fetch('accounts/user-invite/student-list/').then(d => {
            if (d?.status) {
                setData((prev) => ({
                    ...prev,
                    student: d.data
                }))
            }
        })
        Fetch('aircraft/').then(d => {
            if (d?.status) {
                setData((prev) => ({
                    ...prev,
                    aircraft: d.data
                }))
            }
        })
    }, [])
    const dateUpdate = (val, name) => {
        const d = val ? moment(val).format("YYYY-MM-DD") : val;
        setDate({
            ...date,
            [name]: val,
        });
        setFilterAll({
            ...filtersAll,
            [name]: d,
        });
    };
    const onChangeDate = (val, name) => {
        if (name === 'to_date') {
          let fromD = moment(date.from_date).format('L')
          if (filtersAll.from_date?.length && !moment(fromD).isSame(moment(val).format('L')) && !moment(date.from_date).isAfter(moment(val).format())) {
            dateUpdate(val, name)
          } else {
            setDate({
              ...date,
              [name]: null
            })
            setFilterAll({
              ...filtersAll,
              [name]:''
            });
          }
        } else {
          dateUpdate(val, name)
        }
      }
    const handleChange = (e) => {
        setFilterAll({
            ...filtersAll,
            [e.target.name]: e.target.value
        })
    }
    const handleRadioChange = (e) => {
        if(e.target.value === 'custom'){
            setcustomDate(true)
            setFilterAll({
                ...filtersAll,
                yearly:'',
                monthly: '',
            })
        }else if(e.target.value === 'monthly'){
            setcustomDate(false);
            setDate({
                from_date: null,
                to_date: null,  
            })
            setFilterAll({
                ...filtersAll,
                yearly:'',
                from_date: '',
                to_date: '',
                [e.target.value]: e.target.value
            })
        }else{
            setcustomDate(false)
            setDate({
                from_date: null,
                to_date: null,  
            })
            setFilterAll({
                ...filtersAll,
                monthly:'',
                from_date: '',
                to_date: '',
                [e.target.value]: e.target.value
            })
        }
    }
    const handleClearAll = () => {
        setFilterAll({
            user_id: '',
            year: '',
            monthly: '',
            from_date: '',
            to_date: '',
            instructor_id: '',
            student_id:'',
        })
        setDate({
            from_date: null,
            to_date: null,  
        })
        setcustomDate(false)
    }
    return <Grid
        item
        xs={12}
        sm={12}
        justifyContent="flex-end"
    >
        <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
        >
            Filters
        </Button>
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            className='graphFilter'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <Container maxWidth="sm">
                <div className="flex justify-between align-center">
                    <div>
                        <h4>Filters</h4>
                    </div>
                    <div>
                        <Button
                            onClick={handleClearAll}
                            variant="outlined"
                            style={{
                                textTransform: "capitalize",
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                </div>
                <Grid container spacing={3}>
                    {showList?.student ? <Grid item xs={12} sm={12}>
                        <h2 style={{ margin: "0px" }}>Student</h2>
                        <FormControl className="form-control" fullWidth>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-controlled-open-select"
                                onChange={handleChange}
                                defaultValue=""
                                value={filtersAll.student_id}
                                name="student_id"
                                variant="outlined"
                            >
                                {data?.student?.map((d, i) => (
                                    <MenuItem key={i} value={d.id}>
                                        {d.profile?.first_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> : null}
                    {showList?.aircraft ? <Grid item xs={12} sm={12}>
                        <h2 style={{ margin: "0px" }}>Aircraft</h2>
                        <FormControl className="form-control" fullWidth>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-controlled-open-select"
                                onChange={handleChange}
                                value={filtersAll.aircraft_id}
                                defaultValue=""
                                name="aircraft_id"
                                variant="outlined"
                            >
                                {data?.aircraft?.map((d, i) => (
                                    <MenuItem key={i} value={d.id}>
                                        {d.registration_number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> : null}
                    {showList?.instructor ? <Grid item xs={12} sm={12}>
                        <h2 style={{ margin: "0px" }}>Instructor</h2>
                        <FormControl className="form-control" fullWidth>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-controlled-open-select"
                                onChange={handleChange}
                                defaultValue=""
                                value={filtersAll.instructor_id}
                                name="instructor_id"
                                variant="outlined"
                            >
                                {data?.instructor?.map((d, i) => (
                                    <MenuItem key={i} value={d.id}>
                                        {d.profile?.first_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> : null}
                    {showList?.date ? <Grid item xs={12} sm={12}>
                        <h2 style={{ margin: "0px" }}> Duration </h2>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            className="filter-radio"
                            value={filtersAll.yearly || filtersAll.monthly || (customDate?'custom':'')}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                            <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                        </RadioGroup>
                        {customDate ? <Grid item xs={12} sm={12}>
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                            >
                                <Stack className="datefield" spacing={2}>
                                    <DesktopDatePicker
                                        label="FROM"
                                        fullWidth
                                        variant="outlined"
                                        inputFormat="MM/dd/yyyy"
                                        value={date.from_date}
                                        onChange={(val) =>
                                            onChangeDate(val, "from_date")
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </Stack>
                            </LocalizationProvider>

                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                            >
                                <Stack className="datefield" spacing={2}>
                                    <DesktopDatePicker
                                        label="To"
                                        fullWidth
                                        variant="outlined"
                                        inputFormat="MM/dd/yyyy"
                                        value={date.to_date}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                        onChange={(val) =>
                                            onChangeDate(val, "to_date")
                                        }
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>:null}
                    </Grid> : null}
                    <Grid item xs={12}>
                        <Button variant="contained" type="button" onClick={()=>{changeFilter(filtersAll);handleClose()}}>
                            Done
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </StyledMenu>
    </Grid>
}