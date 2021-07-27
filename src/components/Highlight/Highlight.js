import { Grid } from '@material-ui/core'
import React from 'react'
import HighlightCard from './HighlightCard';

export default function Highlight({ summary }) {
    console.log(summary)
    return (
        <Grid container spacing={3}>
            {
                summary.map(data => (
                    <Grid item sm={4} xs={12} key={data.type}>
                        <HighlightCard title={data.title} count={data.count} type={data.type}/>
                    </Grid>
                ))
            }
            
        </Grid>
    )
}
