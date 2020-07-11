import * as React from 'react';
import GoogleMap, { MapMarker } from "../../../../../third-party/GoogleMap";
import { connect, ConnectedProps } from "react-redux";
import EditUserModalMapCenterer from './EditUserModalMapCenterer';
import type { RootState } from '../../../../../store/configure-store'

import '../edit-user-modal-body.css';

const mapStateToProps = (state: RootState) => {
    return { 
        displayLocation: state.editUser.displayLocation
    };
};

const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


const EditUserModalMap: React.FunctionComponent<PropsFromRedux> 
= (props: PropsFromRedux) => {
    const { displayLocation } = props;

    let markerElement = null;
    if (displayLocation !== null) {
        markerElement = (
            <MapMarker position={displayLocation}/>
        );
    }

    return (
        <div className="modal-body-container">
            <div className="modal-map-container" style={{
                    padding: '4px 20px 0 4px'
                }}>
                <div className="modal-map-container-inner">
                    <GoogleMap>
                        {markerElement}
                        <EditUserModalMapCenterer location={displayLocation}/>
                    </GoogleMap>
                </div>
            </div>
        </div>
    );
}

const EditUserModalMapComponent = connector(EditUserModalMap);
export default EditUserModalMapComponent;