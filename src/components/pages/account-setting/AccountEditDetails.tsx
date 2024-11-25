import { CardContent, Typography, Box, Avatar, Stack, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import BlankCard from "src/components/shared/BlankCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import React from "react";
import Loader from "src/components/shared/Loader/Loader";
import { fetchUser } from "src/store/apps/userProfile/UserProfileSlice";
import { useDispatch, useSelector } from "src/store/Store";

const EditDetails = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userProfile = useSelector((state: any) => state.userprofileReducer.userProfile);

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!userProfile || !userProfile.data) {
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Loader />
    </Box>
  }
  
    return (
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              {t('account_settings.personal_details')}
            </Typography>
            <Typography color="textSecondary" mb={3}>{t('account_settings.edit_details_instructions')}</Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    {t('account_settings.first_name')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value={userProfile?.first_name || ''}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-lastname"
                  >
                    {t('account_settings.last_name')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-lastname"
                    value={userProfile?.last_name || ''}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    Store Name
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-store-name"
                    value="Maxima Studio"
                    variant="outlined"
                    fullWidth
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    Location
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={location}
                    onChange={handleChange1}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                  
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-currency"
                  >
                    Currency
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-currency"
                    variant="outlined"
                    value={currency}
                    onChange={handleChange2}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    {t('account_settings.email')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value={userProfile?.email || ''}
                    variant="outlined"
                    fullWidth
                    disable
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    Phone
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value="+91 12345 65478"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    Address
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value="814 Howard Street, 120065, India"
                    variant="outlined"
                    fullWidth
                  />
                </Grid> */}
              </Grid>
            </form>
          </CardContent>
          {/* <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">
            {t('account_settings.save')}
          </Button>
          <Button size="large" variant="text" color="error">
            {t('account_settings.cancel')}
          </Button>
        </Stack> */}
        </BlankCard>
        
    );
  };
  
  export default EditDetails;
  