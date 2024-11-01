const EmergingRisks = () => {
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
                src="https://akila-dev-proxy.octapus.io/s/admin-soc/app/dashboards#/view/cisa_kevs-dcb4dd40-d17a-11ee-b159-799470efb549?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-90d%2Fd,to:now))&_a=()"
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

export default EmergingRisks;
