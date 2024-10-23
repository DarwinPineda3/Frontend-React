const DarkNet = () => {
    return (
      <div
      style={{
          height: 'calc(100svh - 130px)',
          width: 'calc(100% + 40px)',
          marginLeft: '-20px',
      }}
      >
      <iframe
              id="full-screen-me"
              src="https://akila-dev-proxy.octapus.io/s/admin-soc/app/dashboards#/view/35d9ee48-2d83-4730-8510-0bdf7a34b76e?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-3y,to:now))&_a=()"
              style={{ 
                  overflow: 'hidden', 
                  height: '100%',
                  width: '100%', 
                  border: 'none', 
                  display: 'block',
                  position: 'relative',
              }}
              allow="fullscreen"
              seamless= {true}
      />
      </div>    
    );
  };
  
  export default DarkNet;
  