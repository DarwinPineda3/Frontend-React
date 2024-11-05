import { Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import AssetList from "src/components/home/AssetList";
import AssetsCards from "src/components/home/AssetsCards";

const Assets = () => {
    return (
        <PageContainer title="Akila">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <AssetsCards/>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <AssetList/>
                </Grid>
            </Grid>
        </PageContainer>
        
    );
};

export default Assets;
