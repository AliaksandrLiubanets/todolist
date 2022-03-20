import React from 'react'
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {setAppErrorAC} from '../../app/app-reducer'

// import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
// }));

export function ErrorSnackbar() {
    // const classes = useStyles();
    // const [open, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const open = error !== null
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(setAppErrorAC(null))
    }

    return (
        // <div className={''}>
        //     <Button variant="outlined" onClick={handleClick}>
        //         Open success snackbar
        //     </Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
        // </div>
    )
}
