import React from 'react'
import Card from '../../src/components/Card'
import AddCard from '../../src/components/AddUser'

import Grid from '@material-ui/core/Grid'
export default function Users() {
    return (
        <Grid container style={{margin:'30px',height: '100%'}}>
            <Grid item xs={12} sm={2} md={3}>
                <AddCard/>
            </Grid>
            <Grid item xs={12} sm={2} md={3}>
                <Card/>
            </Grid>
            <Grid item xs={12} sm={2} md={3}>
                <Card/>
            </Grid>
            <Grid item xs={12} sm={2} md={3}>
                <Card/>
            </Grid>
            
        </Grid>
    )
}

