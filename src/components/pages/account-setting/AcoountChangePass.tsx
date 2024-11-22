import { CardContent, Typography, Box, Avatar, Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import BlankCard from "src/components/shared/BlankCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";

const ChangePass = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
  
    return (
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              {t('account_settings.change_password')}
            </Typography>
            <Typography color="textSecondary" mb={3}>{t('account_settings.password_instructions')}</Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                {t('account_settings.current_password')}
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">{t('account_settings.new_password')}</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">{t('account_settings.confirm_password')}</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
            </form>
          </CardContent>
        </BlankCard>
    );
  };
  
  export default ChangePass;
  