import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Eventify
      </Typography>
      <List
      >
        {activities.map((activity: any) => (
            <ListItem key={activity.id}>
              <ListItemText primary={activity.title}/>
            </ListItem>
          ))}
        </List>
    </div>
  );
}

export default App;