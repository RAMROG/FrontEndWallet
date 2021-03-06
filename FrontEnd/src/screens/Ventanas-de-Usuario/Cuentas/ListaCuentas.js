import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {database,auth} from '../../../firebaseconf'
//importaciones material-ui
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Menu from '../../../Components/Menu/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cuentas from './Cuentas';

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

const ListaCuentas = () => {
    const classes = useStyles();
    const [iduser, setuser] = useState("");
    /**llenado de tablas */
    const [datosCuentas, setCuentas] = useState({});
    // localStorage.getItem(1)
    const idUsuario = localStorage.getItem("Session_id");

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400,
        },
        table: {
            minWidth: 650,
        },
    });

let cuen={};
   /*const obtenerCuentas = async () => {

        const data=await database.ref().child('user').child('metas')
        data.on('value',(e)=>{
            cuen= e.val();
            alert(cuen);
            setCuentas(cuen);
            alert(datosCuentas) 
        })
        }*/
    const obtenerCuentas = async () => {
        await auth.onAuthStateChanged((z)=>{if(z){
            const data= async()=>{
                await database.ref().child(z.uid).child('cuentas').on('value',(e)=>{
                const todo=[];
                const da= e.forEach(element => {
                    todo.push(element.val())
                });
                if(todo.length>0){
                    setCuentas(todo);
                  }   
            })}
            data();
        }else{
            alert("error")
        }})
            }

    /*
    const eliminarCuentas = async (e) => {
        const json_data = {
            'id_user': idUsuario
        };

        const res = await fetch(`${API}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json_data),
        });

        if (res.status) {
            //const data = await res.json();
            console.log("==========================Ahorro eliminado ==============================");
        };
    }*/
    useEffect(() => {
        obtenerCuentas();
    }, [])

    return (
        <div className={classes.root}>
            <Menu>
                {/**Barra Lateral y Barra Horizontal */}
            </Menu>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="content mt-2">
                        <div className="row-perfil">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="title">Cuentas creadas</h5>
                                    </div>
                                    <div className="card-body ">

                                        <TableContainer component={Paper}>
                                            <Table className={styles.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell color="primary" align="right">#</TableCell>
                                                        <TableCell color="primary" align="right">Nombre del banco</TableCell>
                                                        <TableCell color="primary" align="right">Numero Cuenta</TableCell>
                                                        <TableCell color="primary" align="right">Tipo cuenta</TableCell>
                                                        <TableCell color="primary" align="right">Monto</TableCell>
                                                        <TableCell color="primary" align="right">Eliminar</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                    datosCuentas.length>0 ?
                                                    (datosCuentas.map((row, key) => (
                                                        <TableRow key={key}>
                                                            <TableCell component="rigth" scope="row">{key++}</TableCell>
                                                            <TableCell align="right">{row.name_bank_account}</TableCell>
                                                            <TableCell align="right">{row.number_account}</TableCell>
                                                            <TableCell align="right">{row.type_bank}</TableCell>
                                                            <TableCell align="right">{row.mount}</TableCell>
                                                            <TableCell align="right">
                                                            <Button size="small" style={{ backgroundColor: '#e53935', color: '#fff' }} >Eliminar</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                     ))):
                                                    (console.log(' no existe data'))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to='/cuentas'>
                               <Button  variant="contained" size="small" color="primary">Regresar</Button>
                        </Link>
                    </div>
                </Container>
            </main>
        </div>
    )
}

export default ListaCuentas;
