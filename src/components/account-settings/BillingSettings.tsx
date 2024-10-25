// BillingSettings.tsx
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
} from '@mui/material';

const BillingSettings: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Información de Facturación</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre del Negocio*"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sector del Negocio*"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección del Negocio*"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="País*"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre*"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido*"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Plan Actual */}
        <Box mt={4}>
          <Typography variant="h4">Plan Actual:</Typography>
          <Typography variant="h4">Executive</Typography>
          <Typography variant="body1">
            Gracias por ser un miembro premium y apoyar nuestro desarrollo.
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                  <path d="M12 12l8 -4.5"></path>
                  <path d="M12 12l0 9"></path>
                  <path d="M12 12l-8 -4.5"></path>
                  <path d="M16 5.25l-8 4.5"></path>
                </svg>
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">Plan Actual</Typography>
              <Typography variant="h6">750.000 Visitas Mensuales</Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">Agregar</Button>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="contained" color="primary">Cambiar Plan</Button>
            <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>Restablecer Plan</Button>
          </Box>
        </Box>

        {/* Método de Pago */}
        <Box mt={4}>
          <Typography variant="h4">Método de Pago</Typography>
          <Typography variant="body1">El 26 de diciembre de 2025</Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                  <path d="M3 10l18 0"></path>
                  <path d="M7 15l.01 0"></path>
                  <path d="M11 15l2 0"></path>
                </svg>
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h6">Visa</Typography>
              <Typography variant="subtitle1">*****2102</Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">Editar</Button>
            </Grid>
          </Grid>
          <Typography variant="body1" mt={1}>
            Si actualizaste tu método de pago, solo se mostrará aquí después de tu próximo ciclo de facturación.
          </Typography>
          <Button variant="outlined" color="error" style={{ marginTop: '8px' }}>Cancelar Suscripción</Button>
        </Box>

        {/* Botones de guardar/cancelar */}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary">Guardar</Button>
          <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>Cancelar</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BillingSettings;
