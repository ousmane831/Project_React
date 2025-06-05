import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // pour détecter l'élément actif

  const menuItems = [
    { text: 'Accueil', icon: <HomeIcon />, path: '/' },
    { text: 'Propriétaires', icon: <PeopleIcon />, path: '/owners' },
    { text: 'Patients', icon: <PetsIcon />, path: '/patients' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#000', // Fond noir
          color: '#fff', // Texte blanc
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem
              button
              key={text}
              onClick={() => navigate(path)}
              sx={{
                backgroundColor: isActive ? '#333' : 'transparent',
                '&:hover': {
                  backgroundColor: '#1e1e1e',
                },
                color: '#fff',
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
