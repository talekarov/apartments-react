import React, { Fragment, useState } from 'react';
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apartmentImage from '../images/apartment.jpg';

const useStyles = makeStyles({
  card: {
    width: 345,
    marginTop: 30,
    marginLeft: 20
  },
  root: {
    flexGrow: 1
  },
});

export default function Apartment({ apartment }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedFromDate, handleFromDateChange] = useState(new Date());
  const [selectedToDate, handleToDateChange] = useState(new Date());
  const [days, changeDays] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDaysChange = (dateOne, dateTwo) => {
  let one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  let date1_ms = dateOne.getTime();
  let date2_ms = dateTwo.getTime();

  // Calculate the difference in milliseconds
  let difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
    changeDays( Math.round(difference_ms/one_day) + 1);
  }
  const changeFromDate = (e) => {
    handleFromDateChange(e);
    handleDaysChange(e, selectedToDate);
  }

  const changeToDate = (e) => {
    handleToDateChange(e);
    handleDaysChange(selectedFromDate, e);
  }

  const handleBook = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Apartment"
            height="250"
            width="100"
            image={apartmentImage}
            title="Apartment"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {apartment.apartmentName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Number of Guests: {apartment.numGuests} <br />
              Price per Night :  {apartment.pricePerNight} $
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Book
        </Button>
        </CardActions>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Book this Apartment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose the dates :
            </DialogContentText>
            <Fragment>
              <DatePicker
                label="From :"
                value={selectedFromDate}
                onChange={e => changeFromDate(e)}
                animateYearScrolling
              />
              <DatePicker
                label="To :"
                value={selectedToDate}
                onChange={e => changeToDate(e)}
                minDate={selectedFromDate}
                animateYearScrolling
              />
            </Fragment>
            <DialogContentText>
              Total price : {days * apartment.pricePerNight} $
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
</Button>
            <Button onClick={handleBook} color="primary">
              Book
</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
