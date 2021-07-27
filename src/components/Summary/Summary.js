import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import LineChart from '../Charts/LineChart/LineChart'
import {getMapDataByCountryId} from '../../apis';
import HighMap from '../Charts/HighMap/HighMap';
export default function Summary({countryId, report}) {
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        if(countryId) {
            getMapDataByCountryId(countryId)
                .then(res => {
                    setMapData(res);
                })
                .catch(err => console.error(err));
        }
    }, [countryId]);
    return (
        <div style={{ height: '500px', marginTop: 10}}>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report}/>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMap mapData={mapData}/>
                </Grid>
            </Grid>
        </div>
    );
}

