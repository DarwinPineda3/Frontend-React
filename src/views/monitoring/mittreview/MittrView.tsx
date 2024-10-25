import React from 'react';

const MittrView: React.FC = () => {
    const mittrUrl = 'https://akila-dev-proxy.octapus.io/s/admin-soc/app/dashboards#/view/935ee8a7-77c6-4687-8857-920f4556de56?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-30d%2Fd,to:now))&_a=()'; 

    return (
        <div
            style={{
                height: 'calc(100svh - 130px)', 
                width: 'calc(100% + 40px)', 
                marginLeft: '-20px', 
            }}
        >
            <iframe
                src={mittrUrl}
                style={{ 
                    overflow: 'hidden', 
                    height: '100%', 
                    width: '100%', 
                    border: 'none', 
                    display: 'block', 
                    position: 'relative' 
                }}
                allow="fullscreen"
                seamless={true}
            />
        </div>
    );
};

export default MittrView;
