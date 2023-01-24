import { CircularProgress } from "@mui/material";
import {Button} from '@material-ui/core'
export default function ButtonLoader(props) {
    const { title, onClick, loader } = props
    return <Button
        {...props}
        onClick={onClick}
        disabled={loader}
    >
        {!loader ? title : <><CircularProgress color="inherit" className="mr-2" size={20}/> Submitting...</>}
    </Button>
}