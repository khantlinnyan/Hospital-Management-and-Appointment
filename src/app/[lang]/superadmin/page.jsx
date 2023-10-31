"use client";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import Cookies from "js-cookie";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import UserActions from "@/components/actions/UserActions";

const page = () => {
    const token = Cookies.get("token");

    const [users, setUsers] = useState([]);
    const [rowId , setRowId] = useState(null)

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/users?page=1&perPage=15", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setUsers(response.data.data))
            .catch((error) => console.log(error));
    }, []);

    const columns = useMemo(()=>[
        {
            field: "id",
            headerName: "ID",
            editable: false,
        },
        {
            field: "name",
            headerName: "Name",
            editable: true,
        },
        {
            field: "email",
            headerName: "Email",
            editable: true,
        },
        {
            field: "phone",
            headerName: "Phone",
            editable: true,
        },
        {
            field: "role",
            headerName: "Role",
            editable: true,
            sortable: false,
            type: "singleSelect",
            valueOptions: ["superAdmin", "admin", "patient", "doctor", "guest"],
        },
        {
            field: "address",
            headerName: "Address",
            editable: true,
        },
        {
            field: "createdAt",
            headerName: "created_at",
            editable: false,
        },
        {
            field: "action",
            headerName: "Action", type:"action",
            renderCell: (params) => <UserActions {...{params , rowId , setRowId}} />
        }
        ],[rowId])

    return (
        <Layout>
            <test/>
            <div
                className="p-5 !w-full min-w-full"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#fff",
                        color: "#000",
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#fff",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#fff",
                        color: "#000",
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `#000 !important`,
                    },
                }}
            >
                <DataGrid
                    sx={{ width: "100%" }}
                    columns={columns}
                    rows={users || []}
                    // editMode="row"
                    getRowId={(row)=>row.id}
                    // onRowEditCommit={(params)=> {
                    //     console.log(params)
                    //     setRowId(params.id)
                    // }}
                    onCellEditStart={(params)=>{
                        console.log(params)
                        setRowId(params.id)
                    }}
                />
            </div>
        </Layout>
    );
};

export default page;
