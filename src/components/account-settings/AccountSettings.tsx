import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Avatar,
} from '@mui/material';
import NotificationSettings from './NotificationSettings';
import BillingSettings from './BillingSettings';
import SecuritySettings from './SecuritySettings';

const ProfileSettings: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="profile settings tabs">
          <Tab label="Cuenta" />
          <Tab label="Notificaciones" />
          <Tab label="Facturas" />
          <Tab label="Seguridad" />
        </Tabs>
        <CardContent>
          {value === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Cambiar Perfil</Typography>
                    <Typography variant="body1">Cambia tu foto de perfil aquí</Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                      <Avatar alt="user1" src="/images/profile/user-1.jpg" />
                      <Box ml={2}>
                        <Button variant="contained" component="label">
                          Subir
                          <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>Resetear</Button>
                      </Box>
                    </Box>
                    <Typography variant="subtitle1" mt={2}>
                      Permitidos JPG, GIF o PNG. Tamaño máximo de 800K
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Cambiar Contraseña</Typography>
                    <form>
                      <Box mb={2}>
                        <TextField label="Contraseña Actual" type="password" fullWidth />
                      </Box>
                      <Box mb={2}>
                        <TextField label="Nueva Contraseña" type="password" fullWidth />
                      </Box>
                      <Box mb={2}>
                        <TextField label="Confirmar Contraseña" type="password" fullWidth />
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Detalles Personales</Typography>
                    <form>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Box mb={2}>
                            <TextField label="Tu Nombre" fullWidth />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box mb={2}>
                            <TextField label="Nombre de la Tienda" fullWidth />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box mb={2}>
                            <TextField label="Ubicación" fullWidth />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box mb={2}>
                            <TextField label="Moneda" fullWidth />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box mb={2}>
                            <TextField label="Email" fullWidth />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box mb={2}>
                            <TextField label="Teléfono" fullWidth />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box mb={2}>
                            <TextField label="Dirección" fullWidth />
                          </Box>
                        </Grid>
                      </Grid>
                      <Box mt={2}>
                        <Button variant="contained" color="primary">Guardar</Button>
                        <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>Cancelar</Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          {value === 1 && <NotificationSettings />}
          {value === 2 && <BillingSettings />} 
          {value === 3 && <SecuritySettings />}
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProfileSettings;
