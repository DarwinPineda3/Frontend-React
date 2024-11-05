const DemoBrand = () => {
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
              src="https://akila-dev-proxy.octapus.io/s/admin-soc/app/dashboards#/view/56d735be-1ffe-40f2-b18c-a207087a8024?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-30d%2Fd,to:now))&_a=()"
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
  
  export default DemoBrand;
  