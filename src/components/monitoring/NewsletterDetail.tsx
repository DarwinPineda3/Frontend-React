import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useDispatch } from 'src/store/Store';
import { useTranslation } from 'react-i18next';

const mittrUrl = 'https://pdfobject.com/pdf/sample.pdf'; 
const NewsletterDetail: React.FC<{ newsletterId: string }> = ({ newsletterId }) => {
    const { t } = useTranslation();
    const objFile = {
        "id": "1bdc9tg6Q8VrikR98p92WFM5udZ00Di43",
        "name": "Boletin de Ciberseguridad 13 de junio 2024 (1).pdf",
        "mimeType": "application/pdf",
        "modifiedTime": "2024-07-29T14:36:24",
        "size": 703711
    }
    console.log('NewsletterDetail', newsletterId);
    const dispatch = useDispatch();

    return (
        <Grid container spacing={1}>        
            <Grid item xs={12} xl={12}>
                <iframe
                    src={mittrUrl}
                    style={{ 
                        overflow: 'hidden', 
                        height: 'calc(100vh - 20px)',
                        width: '100%', 
                        border: 'none', 
                        display: 'block', 
                        position: 'relative' 
                    }}
                    allow="fullscreen"
                    seamless={true}
                />
            </Grid>
    
            <DashboardCard 
                title={t("newsletter.details")} 
                subtitle={t("newsletter.newsletter_details")}>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {t("dashboard.name")}
                        </Typography>
                        <Typography variant="body2">{objFile.name}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {t("newsletter.mime_type")}
                        </Typography>
                        <Typography variant="body2">{objFile.mimeType}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {t("newsletter.size")}
                        </Typography>
                        <Typography variant="body2">{objFile.size}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                            {t("newsletter.last_modification")}
                        </Typography>
                        <Typography variant="body2">{objFile.modifiedTime}</Typography>
                    </Box>

                </Box>            
            </DashboardCard>
        </Grid>
        
    );
};

export default NewsletterDetail;