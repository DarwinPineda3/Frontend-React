// NotificationSettings.tsx
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Avatar,
  Switch,
  Button,
} from '@mui/material';

const NotificationSettings: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Preferencias de Notificación</Typography>
        <Typography variant="body1">
          Selecciona las notificaciones que te gustaría recibir por correo electrónico. 
          Ten en cuenta que no puedes optar por no recibir mensajes de servicio, como 
          notificaciones de pago, seguridad o legales.
        </Typography>
        
        <Box mt={2}>
          <TextField label="Dirección de Correo Electrónico*" fullWidth />
          <Typography variant="subtitle1" mt={1}>
            Requerido para las notificaciones.
          </Typography>
        </Box>

        {/* Opciones de notificación */}
        {[
          { label: "Nuestro boletín", description: "Siempre te informaremos sobre cambios importantes" },
          { label: "Confirmación de pedido", description: "Te notificaremos cuando el cliente ordene un producto" },
          { label: "Estado del pedido cambiado", description: "Te notificaremos cuando el cliente haga cambios en el pedido" },
          { label: "Pedido entregado", description: "Te notificaremos una vez que se entregue el pedido" },
          { label: "Notificación por correo electrónico", description: "Activa las notificaciones por correo electrónico para recibir actualizaciones" },
        ].map((notification, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <Avatar>
              {/* Icono de ejemplo */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                <path d="M3 7l9 6l9 -6"></path>
              </svg>
            </Avatar>
            <Box ml={2} flexGrow={1}>
              <Typography variant="h6">{notification.label}</Typography>
              <Typography variant="subtitle1">{notification.description}</Typography>
            </Box>
            <Switch />
          </Box>
        ))}

        {/* Sección de Date & Time */}
        <Typography variant="h4" mt={4}>Date & Time</Typography>
        <Typography variant="body1">
          Time zones and calendar display settings.
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
              <path d="M12 7v5l3 3"></path>
            </svg>
          </Avatar>
          <Box ml={2} flexGrow={1}>
            <Typography variant="h6">Time zone</Typography>
            <Typography variant="subtitle1">(UTC + 02:00) Athens, Bucharest</Typography>
          </Box>
          <Button variant="outlined" color="primary" aria-label="Download">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
              <path d="M7 11l5 5l5 -5"></path>
              <path d="M12 4l0 12"></path>
            </svg>
          </Button>
        </Box>

        {/* Sección de Ignore Tracking */}
        <Typography variant="h4" mt={4}>Ignore Tracking</Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
              <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
            </svg>
          </Avatar>
          <Box ml={2} flexGrow={1}>
            <Typography variant="h6">Ignore Browser Tracking</Typography>
            <Typography variant="subtitle1">Browser Cookie</Typography>
          </Box>
          <Switch />
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary">Guardar</Button>
          <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>Cancelar</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
