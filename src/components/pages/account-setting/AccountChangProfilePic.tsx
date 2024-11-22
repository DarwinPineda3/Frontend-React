import { CardContent, Typography, Box, Avatar, Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import BlankCard from "src/components/shared/BlankCard";
import user1 from 'src/assets/images/profile/user-1.jpg';

const ChangeProfilePic = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
  
    return (
        <BlankCard>
        <CardContent>
          <Typography variant="h5" mb={1}>
            {t('account_settings.change_profile')}
          </Typography>
          {/* <Typography color="textSecondary" mb={3}>{t('account_settings.change_profile_picture')}</Typography> */}
          <Box textAlign="center" display="flex" justifyContent="center">
            <Box>
              <Avatar
                src={user1}
                alt={user1}
                sx={{ width: 120, height: 120, margin: '0 auto' }}
              />
              <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                {/* <Button variant="contained" color="primary" component="label">
                  {t('account_settings.upload')}
                  <input hidden accept="image/*" multiple type="file" />
                </Button> */}
                {/* <Button variant="outlined" color="error">
                  {t('account_settings.reset')}
                </Button> */}
              </Stack>
              {/* <Typography variant="subtitle1" color="textSecondary" mb={4}>
                {t('account_settings.allowed_file_types')}
              </Typography> */}
            </Box>
          </Box>
        </CardContent>
      </BlankCard>
    );
  };
  
  export default ChangeProfilePic;
  