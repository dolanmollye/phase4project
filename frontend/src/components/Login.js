import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from 'react-router-dom'
const Login=()=>{

    let paperStyle={padding :20,height:'50vh',width:280, margin:"200px auto", border: '2px solid black', borderRadius: '15px'}
    let avatarStyle={backgroundColor:'rgb(17, 105, 79)'}
    let btnstyle={margin:'8px 0', backgroundColor:'rgb(17, 105, 79)', color: 'white'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Welcome to Notes</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <Link to='/notes' style={{ textDecoration: 'none', color: 'white'}}>
                    <Button type='submit' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </Link>
                {/* <Button type='submit' variant="contained" style={btnstyle} fullWidth>Sign in</Button> */}
                <Typography >
                     {/* <Link href="#" > */}
                        Forgot password ?
                     {/* </Link> */}
                </Typography>
                <Typography> Don't have an account?
                     {/* <Link href="#" style={{marginLeft: '8px'}} > */}
                        Sign Up 
                {/* </Link> */}
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login