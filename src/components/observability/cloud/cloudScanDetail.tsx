import { Box, CardContent, Chip, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchCloudInventoryById } from 'src/store/observability/cloud/CloudInventorySlice';
import { useDispatch, useSelector } from 'src/store/Store';
// aws
import awsGenericImg from '../../../assets/images/cloud_services/aws/aws_gen.svg';
import ec2Img from '../../../assets/images/cloud_services/aws/ec2.png';
import iamImg from '../../../assets/images/cloud_services/aws/iam.png';
import lambdaImg from '../../../assets/images/cloud_services/aws/lambda.png';
// azure
import azureGenericImg from 'src/assets/images/cloudscans/azure.png';
import disksImg from '../../../assets/images/cloud_services/azure/disks.svg';
import networkInterfacesImg from '../../../assets/images/cloud_services/azure/networkInterfaces.svg';
import networkSecurityGroupsImg from '../../../assets/images/cloud_services/azure/networkSecurityGroups.svg';
import networkWatchersImg from '../../../assets/images/cloud_services/azure/networkWatchers.svg';
import publicIPAddressesImg from '../../../assets/images/cloud_services/azure/publicIPAddresses.svg';
import virtualMachinesImg from '../../../assets/images/cloud_services/azure/virtualMachines.svg';
import virtualNetworksImg from '../../../assets/images/cloud_services/azure/virtualNetworks.svg';
//gcp
import gcpGenericImg from 'src/assets/images/cloudscans/gcp.png';
import attachedDiskImg from '../../../assets/images/cloud_services/gcp/attached_disk.svg';
import instanceImg from '../../../assets/images/cloud_services/gcp/compute_instance.svg';
import firewallImg from '../../../assets/images/cloud_services/gcp/firewall.svg';
import networkInterfaceImg from '../../../assets/images/cloud_services/gcp/network_interface.svg';
import storageBucketsImg from '../../../assets/images/cloud_services/gcp/storage_buckets.svg';



interface ResourceTypeTotals {
  [key: string]: number;
}

interface ServiceData {
  service: string;
  total: number;
  resource_type_totals: ResourceTypeTotals;
}

interface CloudScansDetailObsProps {
  scanId: string;
}

const CloudScansDetailObs = ({ scanId }: CloudScansDetailObsProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const primaryMain = theme.palette.primary.main;
  const secondarylight = theme.palette.secondary.light;
  const primarylight = theme.palette.primary.light;
  const borderColor = theme.palette.divider;

  const cloudInventoryDetail = useSelector((state: any) => state.cloudInventoryReducer.cloudInventoryDetails);
  useEffect(() => {
    dispatch(fetchCloudInventoryById(scanId));
  }, [dispatch]);

  if (!cloudInventoryDetail) {
    return <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Loader />
    </Box>
  }

  const serviceImageMap: {
    [provider: string]: {
      [service: string]: string;
      generic: string;
    };
  } = {
    aws: {
      generic: awsGenericImg, // Fallback for AWS
      ec2: ec2Img,
      iam: iamImg,
      lambda: lambdaImg
    },
    azure: {
      generic: azureGenericImg, // Fallback for Azure
      "Microsoft.Network/virtualNetworks": virtualNetworksImg,
      "Microsoft.Network/publicIPAddresses": publicIPAddressesImg,
      "Microsoft.Network/networkSecurityGroups": networkSecurityGroupsImg,
      "Microsoft.Network/networkWatchers": networkWatchersImg,
      "Microsoft.Network/networkInterfaces": networkInterfacesImg,
      "Microsoft.Compute/virtualMachines": virtualMachinesImg,
      "Microsoft.Compute/disks": disksImg,
    },
    gcp: {
      generic: gcpGenericImg, // Fallback for GCP
      "storage#buckets": storageBucketsImg,
      "compute#firewall": firewallImg,
      "compute#instance": instanceImg,
      "compute#attachedDisk": attachedDiskImg,
      "compute#networkInterface": networkInterfaceImg,
    },
  };

  const imageDispatcher = (provider: string, service: string) => {
    const providerMap = serviceImageMap[provider];
    if (providerMap) {
      return providerMap[service] || providerMap.generic; // Return service-specific or generic provider image
    }
    return null;
  };

  const backgroundColorDispatcher = () => {
    const provider = cloudInventoryDetail.inventory_data.provider;
    switch (provider) {
      case 'aws':
        return '#232f3d';
      case 'azure':
        return '#ecf3fb';
      case 'gcp':
        return '#d2e3fc';
      default:
        return primaryMain;
    };
  }

  const titleColorDispatcher = () => {
    const provider = cloudInventoryDetail.inventory_data.provider;
    switch (provider) {
      case 'aws':
        return '#fafafa';
      case 'azure':
        return '#19113d';
      case 'gcp':
        return 'black';
      default:
        return 'info.light';
    };
  }


  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="start">
      {cloudInventoryDetail.services.map((service, i) => (
        <Paper
          key={service.service}
          sx={{
            bgcolor: backgroundColorDispatcher,
            border: `1px solid ${borderColor}`,
            minHeight: '150px',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
          }}
          variant="outlined"
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" color={titleColorDispatcher} gutterBottom sx={{ wordBreak: 'break-word', textAlign: 'center' }}>
              {service.service.toUpperCase()}
            </Typography>
            <Typography variant="subtitle1" color={titleColorDispatcher} mb={2}>
              Total: {service.total}
            </Typography>

            <Box textAlign="center" mt={2} mb="-30px">
              <img
                src={
                  imageDispatcher(cloudInventoryDetail.inventory_data.provider, service.service) || undefined
                }
                alt={service.service}
                width="120"
                style={{ margin: '0px' }}
              />
            </Box>
          </CardContent>

          <Paper
            sx={{
              overflow: 'hidden',
              position: 'relative',
              margin: '10px',
              bgcolor: 'background.paper',
              p: 2,
              flex: 1, // Allow this section to take up remaining space
            }}
          >
            <Stack spacing={2}>
              {Object.entries(service.resource_type_totals).map(([type, count], index) => (
                <Stack
                  key={type}
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="textSecondary" gutterBottom sx={{ wordBreak: 'break-word', textAlign: 'left' }}>
                    {type}
                  </Typography>
                  <Chip
                    label={count}
                    size="small"
                    sx={{
                      bgcolor: i % 2 === 0 ? primarylight : secondarylight,
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Paper>
      ))}
    </Box>
  );
};

export default CloudScansDetailObs;
