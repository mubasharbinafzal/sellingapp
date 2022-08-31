import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import {
    Button,
    Grid,
    Box,
    TextField

} from '@material-ui/core';
import Actions from "../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
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

}));
export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            const res = await fetch(process.env.REACT_APP_API_END_POINT + "user", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: values.userName,
                    userPassword: values.userPassword
                })
            });
            const data = await res.json();

            if (data.success) {
                navigate("/PersonalInfo");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err);
        }



    }
    return (
        <Formik
            initialValues={{ userName: '', userPassword: '' }}

            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({
                values,
                handleChange,
                setFieldValue,
                handleSubmit,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Box pl={5} pt={5}>
                        <Grid container className={classes.root} spacing={2} mt={5}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={2}>
                                    <TextField
                                        id="outlined-name"
                                        label="Name"
                                        className={classes.formControl}
                                        name="userName"
                                        value={values.userName}
                                        onChange={handleChange}

                                    />
                                </Grid>
                                <Grid container justifyContent="center">
                                    <TextField
                                        id="outlined-name"
                                        label="password"
                                        type="password"
                                        className={classes.formControl}
                                        name="userPassword"
                                        value={values.userPassword}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        style={{ marginTop: "20px" }}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            )}
        </Formik>
    );

}