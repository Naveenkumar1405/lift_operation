import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './Lift.css';



// Component for the lift
function Lift() {
  const [selectedFloors, setSelectedFloors] = React.useState([]);
  const [currentFloor, setCurrentFloor] = React.useState(0);
  const [floorsToMove, setFloorsToMove] = React.useState([]);

  React.useEffect(() => {
    if (selectedFloors.length > 0) {
      const nextFloor = selectedFloors[0];
      const newFloorsToMove = [];
      let increment;
      if (currentFloor < nextFloor) {
        increment = 1; // Move up
        for (let i = currentFloor; i <= nextFloor; i++) {
          newFloorsToMove.push(i);
        }
      } else if (currentFloor > nextFloor) {
        increment = -1; // Move down
        for (let i = currentFloor; i >= nextFloor; i--) {
          newFloorsToMove.push(i);
        }
      } else {
        setSelectedFloors(prevFloors => prevFloors.slice(1)); // Remove the current floor from the selected floors
        return; // Do nothing if already at the selected floor
      }
      setFloorsToMove(newFloorsToMove);
      const interval = setInterval(() => {
        if (newFloorsToMove.length > 0) {
          setCurrentFloor(prevFloor => prevFloor + increment); // Move to the next floor in the sequence
          newFloorsToMove.shift();
        }
        if (newFloorsToMove.length === 0) {
          setSelectedFloors(prevFloors => prevFloors.slice(1)); // Remove the current floor from the selected floors
        }
      }, 2000); // Simulate movement every 2 seconds
      return () => clearInterval(interval);
    }
  }, [selectedFloors, currentFloor]);

  const handleAddStop = (floor) => {
    setSelectedFloors(prevFloors => [...prevFloors, floor]);
  };

  return (
    <div className="centered-container">
      <div>
        <Typography variant="h3">Lift</Typography>
        {/* <Typography variant="body1">Current Floor: {currentFloor}</Typography> */}
        <div className="lift-container">
          <div className={`lift ${'floor-' + currentFloor}`}>
            <Typography variant="h5" className="floor-number">
              {currentFloor}
            </Typography>
          </div>
        </div>
        <Grid container spacing={1} justifyContent="center">
          {[...Array(5).keys()].map(floor => (
            <Grid item key={floor}>
              <Button
                variant="contained"
                color="primary"
                disabled={selectedFloors.includes(floor) || currentFloor === floor}
                onClick={() => handleAddStop(floor)}
              >
                Floor {floor}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Lift;

