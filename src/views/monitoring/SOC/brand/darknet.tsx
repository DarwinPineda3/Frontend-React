const DarkNet = () => {
  return (
    <div
      style={{
        height: 'calc(100svh - 70px)',
        width: 'calc(100% + 40px)',
        marginLeft: '-20px',
      }}
    >
      <iframe
        id="full-screen-me"
        src="https://akila-dev-proxy.octapus.io/s/admin-soc/app/dashboards#/view/ecaa3eae-0c60-470e-9e17-995d07184053?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-1y%2Fd,to:now))&_a=()"
        style={{
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          border: 'none',
          display: 'block',
          position: 'relative',
        }}
        allow="fullscreen"
        seamless={true}
      />
    </div>
  );
};

export default DarkNet;
