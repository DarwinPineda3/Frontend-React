import { Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import TechInventoryList from "src/components/monitoring/cti/techinventory/TechInventoryList";

const TechInventory = () => {
    return (
        <PageContainer title="Akila">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <TechInventoryList/>
                </Grid>
            </Grid>
        </PageContainer>
        
    );
};

export default TechInventory;
