import React from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { usePage } from '../../utils/page';
import NavigationButtons from '../NavigationFrame/NavigationButtons';
import { useStyles } from './styles';
import {usePagesMenu} from "../NavigationFrame";

const MobileNavMenu = ({ open, onClose }) => {
  const [, setPage] = usePage();
  const classes = useStyles();
  const pages = usePagesMenu()

  const handleMenuPageClick = (pageValue) => {
    onClose();
    setPage(pageValue);
  };

  const className = open
    ? `${classes.container} ${classes.active}`
    : `${classes.container}`;

  return (
    <div className={className}>
      <Container>
        <div>
          <List id="menu-appbar" keepMounted>
            {pages.map((page) => (
              <ListItem
                key={page.value}
                onClick={() => handleMenuPageClick(page.value)}
              >
                <ListItemIcon>
                  <page.icon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText>{page.label}</ListItemText>
              </ListItem>
            ))}
          </List>
          <div className={classes.navigateButtons}>
            <NavigationButtons />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNavMenu;
