import React, { useEffect, useRef, useState } from 'react';
import {auth,database} from'../../../firebaseconf';

//importaciones material-ui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
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
import { DialogContentText, Modal } from '@material-ui/core';

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

const MetasPlanes = () => {
    const classes = useStyles();
    const [iduser, setuser] = useState("");
    const [openMetas, setOpenMetas] = useState(false);
    //const [openPlan, setOpenPlan] = useState(false);
    const [datosMetas, setDatosMetas] = useState([]);
    const [dataCategoria, setDataCategoria] = useState([]);
    const [datosCuentas, setCuentas] = useState([]);

    const idUsuario = localStorage.getItem("Session_id");

    const [nameMeta, setNameMeta] = useState('Prueba');
    const inputMeta = useRef(null)

    const [descripcionMeta, setDescripcionMeta] = useState("");
    const [date_init, setDateInit] = useState("");
    const [date_final, setDateFinal] = useState("");
    const [montoMeta, setMontoMeta] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState(0);
    const [tipoCategoria, setTipoCategoria] = useState(0);

    const handleSubmitMetas = async (e) => {
        const json_data = {
            name_meta : nameMeta,
            descripcion_meta: descripcionMeta,
            date_inicio: date_init,
            date_final: date_final,
            monto_meta: montoMeta,
            categorie: tipoCategoria,
        }; 
        try{
            await auth.onAuthStateChanged((usuario)=>{if(usuario){
                setuser(usuario.uid)
            }})
                
                    const data=await database.ref().child(iduser).child('Metas').push(json_data);
                    window.location='/metas-planes';
                   
                }catch(e){
                        alert("intente enviar de nuevo, se perdio la conexion");
                    }
    };

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

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

    const obtenerMetas = async () => {
        await auth.onAuthStateChanged((z)=>{if(z){
            const data= async()=>{
                await database.ref().child(z.uid).child('Metas').on('value',(e)=>{
                const todo=[];
                const da= e.forEach(element => {
                    todo.push(element.val())
                });
                if(todo.length>0){
                    setDatosMetas(todo);
                  }   
            })}
            data();
        }else{
            alert("error")
        }})
            }
    const informacionCategoria = async () => {
        const res = await fetch(`${API}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(),
        });
        const data = await res.json();
        if (data) {
            setDataCategoria(data);
        }
    }
    const obtenerCuentas = async () => {
        const json_data = {
            //verificar que el valor entre comillas sea igual al de la base por favor
            'id_user': idUsuario
        };
        const res = await fetch(`${API}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json_data),
        });
        const data = await res.json();
        if (data) {
            setCuentas(data);
        }
    }
    const handleCloseMetas = () => {
        setOpenMetas(false);
    }
    const handleOpenMetas = () => {
        setOpenMetas(true);
    }
    useEffect(() => {
        obtenerMetas();
        informacionCategoria();
        obtenerCuentas();
    }, [])

    const [errorLlenado, handleError] = useState(false);

    const EliminarMeta = async (e) => {
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
            console.log("==========================Meta eliminada ==============================");
        };
    };

    const body = (
        <div >
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    );

    return (
        <div className={classes.root}>
            <Menu>
                {/**Barra Lateral y Barra Horizontal */}
            </Menu>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="content">
                        <div className="row-perfil">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="title">Metas</h5>
                                    </div>
                                    <div className="card-body">

                                        <TableContainer component={Paper}>
                                            <Table className={styles.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell color="primary" align="right">#</TableCell>
                                                        <TableCell color="primary" align="right">Nombre Meta</TableCell>
                                                        <TableCell color="primary" align="right">Fecha Inicio</TableCell>
                                                        <TableCell color="primary" align="right">Fecha Final</TableCell>
                                                        <TableCell color="primary" align="right">Monto</TableCell>
                                                        <TableCell color="primary" align="right">Categoria</TableCell>
                                                        <TableCell color="primary" align="right">Descripcion Meta</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {
                                                    datosMetas.length>0 ?
                                                    (datosMetas.map((row, key) => (
                                                        <TableRow key={key}>
                                                            <TableCell component="rigth" scope="row">{key++}</TableCell>
                                                            <TableCell align="right">{row.name_meta}</TableCell>
                                                            <TableCell align="right">{row.date_inicio}</TableCell>
                                                            <TableCell align="right">{row.date_final}</TableCell>
                                                            <TableCell align="right">{row.monto_meta}</TableCell>
                                                            <TableCell align="right">{row.categorie}</TableCell>
                                                            <TableCell align="right">{row.descripcion_meta}</TableCell>
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
                                    <br></br>
                                    <Button size="small" variant="contained" className="m-3" color="primary" onClick={handleOpenMetas} >
                                        Agregar
                                    </Button>
                                    <br></br>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>


            { /* MODAL METAS */}

            <Dialog onClose={handleCloseMetas} open={openMetas}>
                <DialogTitle onClose={handleCloseMetas}>
                    Registro metas
                </DialogTitle>
                <DialogContentText className="m-4" >

                    <TextField
                        label="Nombre meta"
                        style={{ width: '100%' }}
                        placeholder="Ingrese el nombre de meta"
                        fullWidth
                        onChange={event => setNameMeta(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label=" Descripcion Meta"
                        style={{ marginTop: 8, width: '100%' }}
                        placeholder="Ingrese una breve descripcion"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setDescripcionMeta(e.target.value)}
                    />
                    <TextField
                        id="datetime-local"
                        label="Fecha Inicio"
                        type="date"
                        style={{ marginTop: 8, width: '100%' }}
                        defaultValue="2017-05-24T10:30"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setDateInit(e.target.value)}
                    />
                    <TextField
                        id="datetime-local"
                        label="Fecha Final"
                        type="date"
                        style={{ marginTop: 8, width: '100%' }}
                        defaultValue="2017-05-24T10:30"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setDateFinal(e.target.value)}
                    />
                    <TextField
                        label="Monto de la Meta"
                        style={{ marginTop: 8, width: '100%' }}
                        placeholder="Ingrese el monto de la meta"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setMontoMeta(e.target.value)}
                    />
                    <TextField
                        select
                        label="Seleccione una categoria"
                        style={{ width: '100%' }}
                        defaultValue="0"
                        onChange={(e) => setTipoCategoria(e.target.value)}
                    >
                        <MenuItem key={0} value={"Null"}>Seleccione una categoria</MenuItem>
                        <MenuItem key={1} value={"Medico"}>Medicina</MenuItem>
                        <MenuItem key={2} value={"Servicios Publicos"}>Servicios Publicos</MenuItem>
                        <MenuItem key={3} value={"Servicios Publicos"}>Otros</MenuItem>
                    </TextField>


                    {errorLlenado ? (
                        <Typography gutterBottom>
                            Todos los campos deben ser llenados
                        </Typography>
                    ) : null}

                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleSubmitMetas} color="primary">
                        Guardar
                    </Button>
                    <Button onClick={handleCloseMetas} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            { /* FIN MODAL METAS */}
        </div>
    )
}

export default MetasPlanes;
