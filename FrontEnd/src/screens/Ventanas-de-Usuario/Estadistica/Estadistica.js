import React, { useEffect, useState } from 'react';
import {auth,database} from '../../../firebaseconf'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../../../Components/Menu/Menu';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Chart from '../../../Components/Chart/chart';

const API = process.env.REACT_APP_API;
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

const Estadistica = () => {
    const classes = useStyles();
    const idUsuario = localStorage.getItem("Session_id");
    const [cuentas,setCuentas]=useState([])
    const [data, setData] = useState([]);
    const [datosPagos, setPagos] = useState({});

    const obtenerPagos = async () => {
      await auth.onAuthStateChanged((z)=>{if(z){
          const data= async()=>{
              await database.ref().child(z.uid).child('Pagos').on('value',(e)=>{
              const todo=[];
              const da= e.forEach(element => {
                  todo.push(element.val())
              });
              if(todo.length>0){
                  setPagos(todo);
                }   
          })}
          data();
      }else{
          alert("error")
      }})
          }

  
 
    useEffect(() => {
      obtenerPagos();
    }, []);

    return (
        <div className={classes.root}>
        <Menu>
          {/**Barra Lateral y Barra Horizontal */}
        </Menu>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          {datosPagos.length>0 ? 
          (<Grid item xs={12} md={8} lg={12}>
                <Paper className={classes.fixedHeightPaper}>
                  <Chart data={datosPagos} title="Pagos Realizados"/>
                </Paper>
            </Grid>):
            (<Grid item xs={12} md={8} lg={12}>
              <Paper >
                <p style={{color:"red"}}>Lo sentimos no se puede acceder a la informacion, recargue la pagina</p>
              </Paper>
          </Grid>)}
            
              {/*cuentas.length>0 ?
              (<Grid item xs={12} md={8} lg={12}>
                <Paper className={classes.fixedHeightPaper}>
                  <Chart data={cuentas} title="Cuentas"/>
                </Paper>
              </Grid>):
              (<Grid item xs={12} md={8} lg={12}>
                <Paper >
                  <p style={{color:"red"}}>Lo sentimos no se puede acceder a la informacion, recargue la pagina</p>
                </Paper>
              </Grid>)*/}
            </Grid> 
        </Container>
      </main>
    </div>
    )
}

export default Estadistica;
