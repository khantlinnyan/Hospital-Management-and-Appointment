"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "../Layout";
import {
    DataGrid,
    GridActionsCellItem,
    GridCellEditStartReasons,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbar,
} from "@mui/x-data-grid";

// Icons import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import Link from "next/link";
import { Avatar } from "@mui/material";
import ImageAction from "@/components/admin/ImageAction";

const page = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(20);
    const [hospitalLists, setHospitalLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [rowCountState, setRowCountState] = useState();
    const [rowId, setRowId] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    const [queryOptions, setQueryOptions] = useState({});

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const token = Cookies.get("token");
    const getHospitalList = async () => {
        try {
            await axios
                .get(
                    `http://127.0.0.1:8000/api/hospitals?page=${
                        paginationModel.page + 1
                    }&perPage=${paginationModel.pageSize}`,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((response) => {
                    console.log(response.data.data)
                    setIsLoading(false);
                    setHospitalLists(response.data.data);
                    setRowCountState(response.data.meta.totalItems);
                    setIsSuccess(true);
                })
                .then((error) => console.log(error));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getHospitalList();
    }, [paginationModel]);
    console.log(hospitalLists)

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = async (id, row) => {
        try {
            const { name, email, phone, address, location, bio } = row;
            await axios
                .put(
                    `http://127.0.0.1:8000/api/hospitals/${id}`,
                    { name, email, phone, address, location, bio },
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((response) => {
                    toast.success("Updated successfully");
                    setRowModesModel({
                        ...rowModesModel,
                        [id]: { mode: GridRowModes.View },
                    });
                });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                toast.error(error.response.data.errors);
            } else {
                toast.error(error.message);
            }
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setHospitalLists(
            hospitalLists.map((row) => {
                return row.id === newRow.id ? updatedRow : row;
            }),
        );
    };

    // const handleRowModesModelChange = (newRowModesModel)=> {
    //     setRowModesModel(newRowModesModel)
    // }

    const handleDeleteClick = async(id) => {
        try{
            await axios.delete(`http://127.0.0.1:8000/api/hospitals/${id}`, 
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((response)=> {
                console.log(response)
                toast.success("The hospital is deleted successfully.")
            })
        }catch (error){
            if (error.response && error.response.status === 422) {
                toast.error(error.response.data.errors);
            } else {
                toast.error(error.message);
            }
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                editable: false,
                width: 60,
                sortable: false,
            },
            {
                field: "name",
                headerName: "Name",
                editable: true,
                flex: 0.6,
                sortable: false,
            },
            {
                field: "email",
                headerName: "Email",
                editable: true,
                flex: 0.8,
                sortable: false,
            },
            {
                field: "phone",
                headerName: "Phone",
                editable: true,
                width: 120,
                sortable: false,
            },
            {
                field: "address",
                headerName: "Address",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "department",
                headerName: "Department",
                editable: false,
                flex: 1,
                sortable: false,
            },
            {
                field: "bio",
                headerName: "Bio",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "createdAt",
                headerName: "created_at",
                editable: false,
                flex: 1,
                sortable: false,
            },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 80,
                cellClassName: "actions",
                getActions: ({ id, row }) => {
                    const isInEditMode =
                        rowModesModel[id]?.mode === GridRowModes.Edit;

                    if (isInEditMode) {
                        return [
                            <GridActionsCellItem
                                icon={<SaveIcon />}
                                label="Save"
                                sx={{ color: "primary.main" }}
                                onClick={() => handleSaveClick(id, row)}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="inherit"
                            />,
                        ];
                    }

                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={()=>handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                },
            },
        ],
        [rowModesModel],
    );

    return (
        <Layout>
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
                    rows={hospitalLists || []}
                    rowCount={rowCountState}
                    loading={isLoading}
                    pageSizeOptions={[10, 15, 20]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    editMode="row"
                    disableColumnFilter
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={(mode) => setRowModesModel(mode)}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => console.log(error)}
                    slots={{ toolbar: GridToolbar }}
                />
            </div>
        </Layout>
    );
};

export default page;
