import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';

function MyForm() {
  const [formData, setFormData] = useState({
    hotelId: '',
    number: '',
    price: '',
    availability: '',
    roomType: '',
    roomOccupancy: '',
    amenity: ''
  });
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    // Fetch the room list from the API
    fetch('https://localhost:44395/api/Room')
      .then(response => response.json())
      .then(data => setRoomList(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the hotelId exists
    if (!formData.hotelId) {
      toast.error('Error: Hotel Not Found');
      return;
    }

    // Post the form data to the API
    fetch('https://localhost:44395/api/Room', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Handle successful API response
          toast.success('Room added Successfully');
          // Update the room list
          fetch('https://localhost:44395/api/Room')
            .then(response => response.json())
            .then(data => setRoomList(data))
            .catch(error => console.error('Error:', error));
        } else {
          // Handle API error response
          throw new Error('Error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Error: Failed to add room');
      });
  };

  return (
    <div className="container">
      <Card>
        <CardContent>
          <h2>Add Room</h2>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <TextField
                id="hotelId"
                name="hotelId"
                label="Hotel ID"
                value={formData.hotelId}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <TextField
                id="number"
                name="number"
                label="Number"
                value={formData.number}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <TextField
                id="price"
                name="price"
                label="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl component="fieldset" fullWidth sx={{ marginBottom: '1rem' }}>
              <FormLabel component="legend">Availability:</FormLabel>
              <RadioGroup
                row
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <TextField
                id="roomType"
                name="roomType"
                label="Room Type"
                value={formData.roomType}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <TextField
                id="roomOccupancy"
                name="roomOccupancy"
                label="Room Occupancy"
                value={formData.roomOccupancy}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <TextField
                id="amenity"
                name="amenity"
                label="Amenity"
                multiline
                rows={4}
                value={formData.amenity}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button type="submit" variant="contained" color="success">Submit</Button>
          </form>
        </CardContent>
      </Card>
      <h2>Room List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Hotel ID</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Room Occupancy</TableCell>
              <TableCell>Amenity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList.map(room => (
              <TableRow key={room.roomId}>
                
                <TableCell>{room.hotelId}</TableCell>
                <TableCell>{room.number}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.availability ? 'True' : 'False'}</TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{room.roomOccupancy}</TableCell>
                <TableCell>{room.amenity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
}

export default MyForm;
