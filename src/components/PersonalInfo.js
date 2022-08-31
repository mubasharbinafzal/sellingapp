import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import {
    Button,
    Grid,
    Box,
    TextField,

} from '@material-ui/core';
import _ from "lodash";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Actions from "../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
const useStyles = makeStyles((theme) => ({

    footerBottom: {
        position: "fixed",
        bottom: "0",
        right: "0",
        width: "85%",
        borderTop: "1px solid #DCDDDE",
        backgroundColor: '#fff',
        paddingRight: "46px",
        paddingTop: "15px",
        paddingBottom: "15px",
        "& button": {
            marginRight: 5
        }
    },
    formControl: {
        marginTop: 20,
        width: "30%",
        ['@media (max-width:780px)']: {
            width: '80%'
        }
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginBottom: "10px",
    },
    input: {
        display: 'none',
    },

}));
export default function PersonalInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [maxValue, setMaxValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [files, setFile] = useState([]);

    const fileSelectedHandler = (e) => {
        if (files && files.length < maxValue) {
            setFile(files => [...files, URL.createObjectURL(e.target.files[0])]);
        }

    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const onSubmit = async (values) => {

        try {
            const res = await fetch(process.env.PERSONALINFO, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.userName,
                    email: values.userPassword,
                    phonerNumber: values.phonerNumber,
                    maxNumberOfPics: maxValue,
                    picturesURLs: files
                })
            });
            const data = await res.json();
            if (data.success) {
                alert("data is uploaded successfully");
            } else {
                alert("some thing went wrong");
            }
        } catch (err) {

            dispatch(
                Actions.notistack.enqueueSnackbar(
                    Actions.notistack.snackbar(err.message, "error"),
                ),
            );
        }



    }
    return (
        <Formik
            initialValues={{ name: '', email: '', PhonerNumber: '', maxValue: '' }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .min(3, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                email: Yup.string().email('Invalid email').required('Required'),
                PhonerNumber: Yup.string()
                    .min(11, 'number is Incomplete')
                    .required('Required'),
            })}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({
                values,
                handleChange,
                setFieldValue,
                handleSubmit,
                errors
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Box pl={5} pt={5}>
                        <Grid container className={classes.root} spacing={2} mt={5}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={2} alignItems="end">
                                    <TextField
                                        id="outlined-name"
                                        label="Name"
                                        className={classes.formControl}
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}

                                    />
                                </Grid>
                                {errors && errors.name && <div style={{
                                    color: "red", display: "flex",
                                    "justify-content": "center",
                                    "margin-top": "13px"
                                }}>{errors.name}</div>}
                                <Grid container justifyContent="center" alignItems="end">
                                    <TextField
                                        id="outlined-name"
                                        label="email"
                                        type="email"
                                        className={classes.formControl}
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                {errors && errors.email && <div style={{
                                    color: "red", display: "flex",
                                    "justify-content": "center",
                                    "margin-top": "13px"
                                }}>{errors.email}</div>}
                                <Grid container justifyContent="center">
                                    <TextField
                                        id="outlined-name"
                                        label="PhoneNumber"
                                        type="text"
                                        className={classes.formControl}
                                        name="PhonerNumber"
                                        value={values.PhonerNumber}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                {errors && errors.PhonerNumber && <div style={{
                                    color: "red", display: "flex",
                                    "justify-content": "center",
                                    "margin-top": "13px"
                                }}>{errors.PhonerNumber}</div>}
                                <Grid container justifyContent="center">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-controlled-open-select-label">max number</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={maxValue}
                                            onChange={(e) => { setMaxValue(e.target.value) }}
                                        >
                                            <MenuItem value="1">one</MenuItem>
                                            <MenuItem value="2">Two</MenuItem>
                                            <MenuItem value="3">Three</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                                    <div>
                                        {
                                            _.times(maxValue, (i) => (
                                                <Grid mt={5}>
                                                    <div className={classes.root}>
                                                        <input
                                                            accept="image/*"
                                                            className={classes.input}
                                                            id="contained-button-file"
                                                            multiple
                                                            type="file"
                                                            key={i}
                                                            name={files}
                                                            onChange={fileSelectedHandler}
                                                        />
                                                        <label htmlFor="contained-button-file">
                                                            <Button variant="contained" color="primary" component="span">
                                                                Upload
                                                            </Button>
                                                        </label>
                                                    </div>
                                                </Grid>
                                            ))

                                        }
                                    </div>
                                    <div>
                                        {files && files.map((key, index) => {
                                            return (<Grid>
                                                <img src={key} width="50" height="30" style={{ marginBottom: "17px" }} />
                                            </Grid>)

                                        })}

                                    </div>

                                </div>
                                <Grid container justifyContent="center">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        style={{ marginTop: "20px" }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </form >
            )
            }
        </Formik >
    );

}
