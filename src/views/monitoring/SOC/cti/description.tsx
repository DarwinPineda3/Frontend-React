const DescriptionThreat = () => {
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
              src="https://akila-dev-proxy.octapus.io/s/admin-soc/app/dashboards#/view/3b8bc292-a1c0-4064-8023-125d4601b048?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=()"
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
  
  export default DescriptionThreat;
  