"use client";
import React, { useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const UserActions = ({ params, rowId, setRowId }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const token = Cookies.get("token");
    const handleSubmit = async () => {
        setLoading(true);
        const { name, role, id, phone, email, address } = params.row;
        axios
            .put(
                `http://127.0.0.1:8000/api/users/${id}`,
                { name, role, id, phone, email, address },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((response) => {
                setLoading(false)
                setRowId(null);
                setSuccess(true)
            })
            .catch((error) => console.log(error));
    };
    return (
        <Box sx={{ m: 1, position: "relative" }}>
            {success ? (
                <Fab
                    color="primary"
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#17b978",
                        "&:hover": "#17b978",
                    }}
                >
                    <Check />
                </Fab>
            ) : (
                <Fab
                    color="primary"
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#ffcdab",
                    }}
                    disabled={params.id !== rowId || loading}
                    onClick={handleSubmit}
                >
                    <Save />
                </Fab>
            )}
            {loading && (
                <CircularProgress
                    size={52}
                    sx={{
                        color: "#21e6c1",
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1,
                    }}
                />
            )}
        </Box>
    );
};

export default UserActions;
