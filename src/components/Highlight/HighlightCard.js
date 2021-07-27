import React from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import CountUp from 'react-countup';
const useStyles = makeStyles({
    wrapper: (props) => {
        if (props.type === 'confirmed') return {backgroundColor: '#E22A29'};
        if (props.type === 'recovered') return {backgroundColor: '#59B259'};
        else return {backgroundColor: 'gray'};
    },
    title: {
        fontSize: 18,
        marginBottom: 5
    },
    count: {
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default function HighlightCard({ title, count, type }) {
    const classes = useStyles ({type});
    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2" style={{color: '#FFC6A3'}} className={classes.title}>{title}</Typography>
                <Typography component="span" variant="body2" style={{color: '#FFC6A3'}} className={classes.count}>
                    <CountUp end={count} separator="" duration={2} />
                </Typography>
            </CardContent>
        </Card>
    )
}
