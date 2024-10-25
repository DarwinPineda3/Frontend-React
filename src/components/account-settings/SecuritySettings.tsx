import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Divider,
} from '@mui/material';

const SecuritySettings: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Card>
          <CardContent>
            <Typography variant="h4">Autenticación de dos factores</Typography>
            <Typography variant="subtitle1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente sunt earum officiis laboriosam ut.
            </Typography>
            <Button variant="contained" color="primary">Habilitar</Button>
            <Divider sx={{ my: 2 }} />
            
            <Box mb={2}>
              <Typography variant="h6">Aplicación de Autenticación</Typography>
              <Typography variant="subtitle1">Google auth app</Typography>
              <Button variant="outlined" color="primary">Configurar</Button>
            </Box>
            <Divider />
            
            <Box mb={2}>
              <Typography variant="h6">Otro correo electrónico</Typography>
              <Typography variant="subtitle1">Correo electrónico para enviar el enlace de verificación</Typography>
              <Button variant="outlined" color="primary">Configurar</Button>
            </Box>
            <Divider />
            
            <Box mb={2}>
              <Typography variant="h6">Recuperación por SMS</Typography>
              <Typography variant="subtitle1">Tu número de teléfono o algo similar</Typography>
              <Button variant="outlined" color="primary">Configurar</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Dispositivos</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
            </Typography>
            <Button variant="contained" color="primary">Cerrar sesión en todos los dispositivos</Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">iPhone 14</Typography>
            <Typography variant="subtitle1">Londres, UK, 23 de octubre a la 1:15 AM</Typography>
            <Button variant="outlined" color="primary">Más opciones</Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Macbook Air</Typography>
            <Typography variant="subtitle1">Gujarat, India, 24 de octubre a las 3:15 AM</Typography>
            <Button variant="outlined" color="primary">Más opciones</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary">Guardar</Button>
          <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>Cancelar</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SecuritySettings;
