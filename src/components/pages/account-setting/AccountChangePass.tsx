import { CardContent, Typography, Button, Stack, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import BlankCard from "src/components/shared/BlankCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { changePassword, resetMessages } from "src/store/apps/userProfile/ChangePassWordSlice";
import { store } from "src/store/Store";
import React from "react";

const ChangePass = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { successMessage, error } = useSelector((state: store) => state.ChangePasswordUser);
  
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(t('account_settings.current_password_required') || ''),
      newPassword: Yup.string().min(8, t('account_settings.password_minimum') || '').required(t('account_settings.new_password_required') || ''),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], t('account_settings.passwords_must_match') || '')
        .required(t('account_settings.confirm_password_required') || ''),
    }),
    onSubmit: async (values) => {
      const passwordData = {
        currentPass: values.currentPassword,
        newPass: values.newPassword,
        confirmPass: values.confirmPassword,
      };
      dispatch(changePassword(passwordData));
    },
  });

  React.useEffect(() => {
    return () => {
      dispatch(resetMessages());
    };
  }, [dispatch]);

  return (
    <BlankCard>
      <CardContent>
        <Typography variant="h5" mb={1}>
          {t('account_settings.change_password')}
        </Typography>
        <Typography color="textSecondary" mb={3}>
          {t('account_settings.password_instructions')}
        </Typography>

        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={formik.handleSubmit}>
          {/* Current Password */}
          <CustomFormLabel htmlFor="currentPassword">{t('account_settings.current_password')}</CustomFormLabel>
          <CustomTextField
            id="currentPassword"
            name="currentPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          />

          {/* New Password */}
          <CustomFormLabel htmlFor="newPassword">{t('account_settings.new_password')}</CustomFormLabel>
          <CustomTextField
            id="newPassword"
            name="newPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />

          {/* Confirm New Password */}
          <CustomFormLabel htmlFor="confirmPassword">{t('account_settings.confirm_password')}</CustomFormLabel>
          <CustomTextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          {/* Action buttons */}
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
            <Button type="submit" size="large" variant="contained" color="primary">
              {t('account_settings.save')}
            </Button>
            <Button size="large" variant="text" color="error" onClick={() => formik.resetForm()}>
              {t('account_settings.cancel')}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </BlankCard>
  );
};

export default ChangePass;
