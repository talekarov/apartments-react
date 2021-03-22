import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Apartment from '../apartment/Apartment';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const axios = require('axios');

const filters = [
    {
        value: 'all',
        label: 'All',
    },
    {
        value: 'byPrice',
        label: 'By price',
    },
    {
        value: 'byGuests',
        label: 'By Guests',
    }
];

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    fab: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    menu: {
        width: 200,
    }
}));

export default function Home() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [visibleNumGuests, setVisibleNumGuests] = React.useState(false);
    const [filterNumGuests, setfilterNumGuests] = React.useState(0);
    const [visiblePricePerNight, setVisiblePricePerNight] = React.useState(false);
    const [filterPricePerNight, setfilterPricePerNight] = React.useState(0);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setFilter(event.target.value);
        if (event.target.value === 'byPrice') {
            setVisiblePricePerNight(true);
            setVisibleNumGuests(false);
        } else if (event.target.value === 'byGuests') {
            setVisibleNumGuests(true);
            setVisiblePricePerNight(false);
        } else {
            setVisibleNumGuests(false);
            setVisiblePricePerNight(false);
            getAllApartmets();
        }
    };

    const handleFilterPricePerNight = event => {
        setfilterPricePerNight(event.target.value);
        axios.get('http://localhost:8080/apartments/byPrice=' + event.target.value)
            .then(function (response) {
                // handle success
                console.log(response);
                setListAparments(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    const handleFilterNumGuests = event => {
        setfilterNumGuests(event.target.value);
        axios.get('http://localhost:8080/apartments/byGuests=' + event.target.value)
            .then(function (response) {
                // handle success
                console.log(response);
                setListAparments(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    const handleAdd = () => {
        axios.post('http://localhost:8080/apartments/add?apartmentId=' + listAparments.length + 1 + '&apartmentName=' + apartmentName + '&pricePerNight=' + pricePerNight + '&numGuests=' + numGuests)
            .then(function (response) {
                // handle success
                setOpen(false);
                window.location.reload(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };
    const [apartmentName, setApartmentName] = useState("");
    const [numGuests, setNumGuests] = useState("");
    const [pricePerNight, setPricePerNight] = useState(0);
    const [listAparments, setListAparments] = useState([]);
    const [filter, setFilter] = React.useState('');

    useEffect(() => {
        getAllApartmets();
    }, []);


    const getAllApartmets = () => {
        axios.get('http://localhost:8080/apartments/')
            .then(function (response) {
                // handle success
                console.log(response);
                setListAparments(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Apartments
          </Typography>
                </Toolbar>
            </AppBar>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <TextField
                    id="standard-select-filters"
                    select
                    label="Filter"
                    className={classes.textField}
                    value={filter}
                    onChange={handleChange}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select your filter"
                    margin="normal"
                >
                    {filters.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                {visibleNumGuests ?
                    <TextField
                        margin="normal"
                        id="filter1"
                        label="Filter by number of Guests"
                        type="number"
                        value={filterNumGuests}
                        onChange={handleFilterNumGuests}
                    /> : null}
                <br />
                {visiblePricePerNight ?
                    <TextField
                        margin="normal"
                        id="filter2"
                        label="Filter by price per Night"
                        type="number"
                        value={filterPricePerNight}
                        onChange={handleFilterPricePerNight}
                    /> : null}
            </Grid>


            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                {listAparments.map(apartment => (
                    <Apartment key={apartment.apartmentId} apartment={apartment} />
                ))}
            </Grid>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Apartment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add details about the new apartment.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="apartmentName"
                        label="Apartment Name"
                        type="text"
                        value={apartmentName}
                        onChange={e => setApartmentName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="numGuests"
                        label="Number of Guests"
                        value={numGuests}
                        onChange={e => setNumGuests(e.target.value)}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="pricePerNight"
                        label="Price Per Night"
                        value={pricePerNight}
                        onChange={e => setPricePerNight(e.target.value)}
                        type="number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
