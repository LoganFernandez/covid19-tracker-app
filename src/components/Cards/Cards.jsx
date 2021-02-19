import React from 'react';
import styles from './Cards.module.css';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

function Cards ({ confirmed, recovered, deaths, lastUpdate, country }) {
    // at the start, the app will render a component with empty/undefined values
    if (!confirmed) {
        return "Loading data...";
    } else {
        const active = confirmed.value - recovered.value - deaths.value;
        let cardDetails = [
            {
                style: styles.infected,
                text: "Infected",
                value: confirmed.value,
                bottomText: "Number of infected cases from COVID-19"
            },
            {
                style: styles.recovered,
                text: "Recovered",
                value: recovered.value,
                bottomText: "Number of recovered cases from COVID-19"
            },
            {
                style: styles.active,
                text: "Active",
                value: active,
                bottomText: "Number of active cases of COVID-19"
            },
            {
                style: styles.deaths,
                text: "Deaths",
                value: deaths.value,
                bottomText: "Number of deaths from COVID-19"
            } 
        ];

        return (
            <div className={styles.container}>
                <Grid container spacing={3} justify="center">
                    {cardDetails.map((cardDetail, idx) => (
                        <Grid
                        item
                        component={Card}
                        xs={12}
                        md={2}
                        className={cardDetail.style}
                        style={{ margin: "0px 23.675px", padding: "12px" }}
                        key={idx}
                      >
                          <CardContent>
                            <Typography color="textPrimary" className={styles.font} gutterBottom>
                                <b>{cardDetail.text}</b>
                            </Typography>
                            <Typography variant="h5" className={styles.font}>
                                <CountUp
                                start={0}
                                end={cardDetail.value}
                                duration={2}
                                separator=","
                                />
                            </Typography>
                            <Typography color="textPrimary" className={styles.font}>Last Updated at : </Typography>
                            <Typography color="textSecondary" variant="body2" className={styles.font}>
                                {new Date(lastUpdate).toDateString()}
                            </Typography>
                            <Typography color="textSecondary" variant="body2" className={styles.font}>
                                {new Date(lastUpdate).toLocaleTimeString()}
                            </Typography>
                            <Typography variant="body2" className={styles.font}>{cardDetail.bottomText}</Typography>
                            <Typography color="textPrimary" className={styles.font}> {country} </Typography>
                          </CardContent>
                      </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
};

export default Cards;