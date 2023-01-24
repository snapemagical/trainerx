import {
  Grid,
  Paper,
  Container,
  TextField,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Button,
  OutlinedInput,
  MenuItem,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import Fetch from '../common/fetch'
import { onKeyPress } from '../common/validation'
function NewProfileAdd({ onChange, formType, formValid, state,instructor }) {
  const [allAirCraft, setAllAirCraft] = useState({})
  useEffect(() => {
    Fetch('flight/schedule/get_user_list/').then(d => {
      if (d?.status) {
        setAllAirCraft(d?.data)
      }
    })
  }, [])
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} className="basic">
        <TextField
          className="textfield"
          id="outlined-basic"
          label="First Name"
          inputProps={{ maxLength: 50 }}
          error={Boolean(formValid.errors.first_name && formValid.errors.first_name)}
          margin="normal"
          fullWidth
          defaultValue={state.first_name}
          helperText={formValid.errors.first_name && formValid.errors.first_name}
          name="first_name"
          onBlur={formValid.handleBlur}
          onChange={formValid.handleChange}
          onKeyUp={onChange}
          autoComplete="first_name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="basic">
        <TextField
          className="textfield"
          id="outlined-basic"
          label="Last Name"
          inputProps={{ maxLength: 50 }}
          error={Boolean(formValid.errors.last_name && formValid.errors.last_name)}
          margin="normal"
          defaultValue={state.last_name}
          fullWidth
          helperText={formValid.errors.last_name && formValid.errors.last_name}
          name="last_name"
          onBlur={formValid.handleBlur}
          onChange={formValid.handleChange}
          onKeyUp={onChange}
          autoComplete="last_name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="basic field-mb">
        <FormControl
          className="form-control"
          fullWidth
          error={formValid.errors.designation?.length}
        >
          <InputLabel id="demo-simple-select-label">
            {!instructor ? 'Position' : 'Designation'}
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-controlled-open-select"
            input={<OutlinedInput label={!instructor ? 'Position' : 'Designation'} />}
            value={state.designation}
            label={!instructor ? 'Position' : 'Designation'}
            onChange={(e) => onChange(e)}
            defaultValue=""
            name="designation"
            variant="outlined"
          >
            {allAirCraft?.position?.map((d, i) => (
              <MenuItem key={i + d.id} value={d.id}>
                {d?.designation_name}
              </MenuItem>
            ))}
          </Select>
          {formValid.errors?.designation?.length && (
            <FormHelperText className="Mui-error">
              {formValid.errors.designation}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="basic">
        <TextField
          className="textfield"
          id="outlined-basic"
          label="Email id"
          inputProps={{ maxLength: 100 }}
          error={Boolean(formValid.errors.email && formValid.errors.email)}
          margin="normal"
          disabled={formType !== 'add'}
          defaultValue={state.email}
          fullWidth
          helperText={formValid.errors.email && formValid.errors.email}
          name="email"
          onBlur={formValid.handleBlur}
          onChange={formValid.handleChange}
          onKeyUp={onChange}
          autoComplete="email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="basic">
        <TextField
          className="textfield"
          id="outlined-basic"
          label="Phone Number"
          inputProps={{ maxLength: 10 }}
          error={Boolean(formValid.errors.phone_no && formValid.errors.phone_no)}
          margin="normal"
          defaultValue={state.phone_no}
          fullWidth
          helperText={formValid.errors.phone_no && formValid.errors.phone_no}
          name="phone_no"
          onKeyPress={onKeyPress}
          onBlur={formValid.handleBlur}
          onChange={formValid.handleChange}
          onKeyUp={onChange}
          autoComplete="phone_no"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="basic">
        <TextField
          className="textfield"
          id="outlined-basic"
          label="Password"
          inputProps={{ maxLength: 50 }}
          error={Boolean(formValid.errors.password && formValid.errors.password)}
          margin="normal"
          fullWidth
          helperText={formValid.errors.password && formValid.errors.password}
          name="password"
          onBlur={formValid.handleBlur}
          onChange={formValid.handleChange}
          onKeyUp={onChange}
          autoComplete="password"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="basic">
        <TextField
          className="textfield"
          id="outlined-basic"
          label="Confirm Password"
          inputProps={{ maxLength: 50 }}
          error={Boolean(formValid.errors.confirm_password && formValid.errors.confirm_password)}
          margin="normal"
          fullWidth
          helperText={formValid.errors.confirm_password && formValid.errors.confirm_password}
          name="confirm_password"
          // onBlur={formValid.handleBlur}
          // onChange={formValid.handleChange}
          onChange={onChange}
          autoComplete="confirm_password"
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
}
export default NewProfileAdd
