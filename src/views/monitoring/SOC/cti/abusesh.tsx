const AbuseCH = () => {
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
        src="https://akila-dev-proxy.octapus.io/s/admin-soc/app/dashboards#/view/ti_abusech-c0d8d1f0-3b20-11ec-ae50-2fdf1e96c6a6?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now%2Fd,to:now%2Fd))&_a=()"
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

export default AbuseCH;
