import React, { useState } from 'react';
import { List, ListItem, Popover, ClickAwayListener } from '@material-ui/core';
import { Language } from '@material-ui/icons'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useModalState } from '../../../utils/custom-hooks';

const useStyles = makeStyles((theme) => ({
  container: {
    cursor: "pointer"
  },
  icon: {
    color: "#FFFFFF"
  },
}));

const LanguageSelectItem = ({value, label, onChangeLanguage, active}) => {
  const onClick = (e) => {
    e.stopPropagation()
    onChangeLanguage(value)
  }

  return (
    <ListItem selected={active} onClick={onClick}>{label}</ListItem>
  )
}

const ToggleLanguage = () => {
  const {i18n: {language, changeLanguage}} = useTranslation()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onChangeLanguage = (value) => {
    localStorage.setItem("lang", value)
    setAnchorEl(null)
    changeLanguage(value)
  }

  const options = React.useMemo(() => ([
    {
      value: 'en',
      label: 'English',
      active: language === 'en'
    },
    {
      value: 'vi',
      label: 'Tiếng Việt',
      active: language === 'vi'
    }
  ]), [language])

  return (
    <div className={`flex align-center ${classes.container}`} onClick={handleClick}>
      <Language className={classes.icon} fontSize="small" />
      <span className="ml-8">{language.toUpperCase()}</span>
        <Popover anchorEl={anchorEl} open={Boolean(anchorEl)}>
          <ClickAwayListener onClickAway={handleClose}>
            <List>
              {options.map(option => (
                <LanguageSelectItem
                  {...option}
                  onChangeLanguage={onChangeLanguage}
                />
              ))}
            </List>
          </ClickAwayListener>
        </Popover>
    </div>
  )
}

export default ToggleLanguage
