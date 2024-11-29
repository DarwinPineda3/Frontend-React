
import { Avatar, Box, Button, CardContent, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

// components
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import BlankCard from '../../shared/BlankCard';

// images
import { useTranslation } from 'react-i18next';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import ChangeProfilePic from './AccountChangeProfilePic';
import ChangePass from './AccountChangePass';
import EditDetails from './AccountEditDetails';


const AccountTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={12}>
        <ChangeProfilePic />
      </Grid>
      {/*  Change Password */}
      <Grid item xs={12} lg={6}>
        <ChangePass />
      </Grid>
      {/* Edit Details */}
      <Grid item xs={12} lg={6}>
        <EditDetails />
      </Grid>
    </Grid>
  );
};

export default AccountTab;
