interface BrandMonitoringDetailProps {
  id: string;
}
const BrandMonitoringDetail: React.FC<BrandMonitoringDetailProps> = ({ id }) => {
  return <h1>Brand Monitoring Detail {id}</h1>;
};

export default BrandMonitoringDetail;
