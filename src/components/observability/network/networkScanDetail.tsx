import { Box, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardCard from "src/components/shared/DashboardCard";
import Loader from "src/components/shared/Loader/Loader";
import Breadcrumb from "src/components/shared/breadcrumb/Breadcrumb";
import { AppState, useDispatch, useSelector } from "src/store/Store";
import { fetchNetworkObservabilityById } from "src/store/observability/ObservabilityNetworkSlice";
import NetworkGraph from "./networkGraph";
import NetworkScanCards from "./networkScanCards";
import PortTable from "./portTable";

const NetworkScanDetail: React.FC<{ scanId: string }> = ({ scanId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { networkScansDetail } = useSelector((state: AppState) => state.NetworkObservabilityReducer);

  const [selectedGraph, setSelectedGraph] = useState(networkScansDetail?.graphs?.[0]);

  useEffect(() => {
    if (networkScansDetail?.graphs?.length) {
      setSelectedGraph(networkScansDetail.graphs[0]);
    }
  }, [networkScansDetail]);

  useEffect(() => {
    dispatch(fetchNetworkObservabilityById(scanId));
  }, [dispatch]);


  const handleRowClick = (graph: any) => {
    setSelectedGraph(graph);
  };

  if (!networkScansDetail) {
    return <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Loader />
    </Box>
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NetworkScanCards cardData={networkScansDetail["scan"]["hosts"]} />
      </Grid>
      <Grid item xs={12}>
        <Breadcrumb title={t('observability.scan_details')}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`${t('observability.settings')}: ${networkScansDetail["scan"]["scan_type"]}`} color="primary" variant="outlined" />
            <Chip label={`${t('observability.objective')}: ${networkScansDetail["scan"]["name"]}`} color="info" variant="outlined" />
          </Box>
        </Breadcrumb>
      </Grid>
      <Grid item xs={12}>
        <DashboardCard title={t('observability.host')!}>
          <PortTable hostData={networkScansDetail["scan"]["hosts_list"]} />
        </DashboardCard>
      </Grid>
      <Grid item xs={12}>
        {
          networkScansDetail["dataneo"] &&
          <DashboardCard title={t('observability.network_graph')!}>
            <Grid container spacing={2}>
              {/* Network Graph */}
              {selectedGraph != null &&
                <Grid item xs={12} lg={8}>
                  <NetworkGraph data={selectedGraph.graph} />
                </Grid>
              }
              <Grid item xs={12} lg={4}>
                <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('observability.ip')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {networkScansDetail["graphs"].map((node) => (
                        <TableRow
                          key={node.host}
                          onClick={() => handleRowClick(node)}
                        >
                          <TableCell>{node.host || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </DashboardCard>
        }
      </Grid>
    </Grid >
  );
};

export default NetworkScanDetail;
