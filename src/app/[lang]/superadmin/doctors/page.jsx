"use client";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbar,
} from "@mui/x-data-grid";
import Cookies from "js-cookie";
import ImageAction from "@/components/admin/ImageAction";
import axios from "axios";
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

const page = () => {
    const [doctorLists, setDoctorLists] = useState([]);
    const [rowCountState, setRowCountState] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [rowModesModel, setRowModesModel] = useState({});
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const token = Cookies.get("token");

    const getDoctorsList = async () => {
        try {
            await axios
                .get(
                    `http://127.0.0.1:8000/api/doctors?page=${paginationModel.page + 1
                    }&perPage=${paginationModel.pageSize}`,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((response) => {
                    setIsLoading(false);
                    setDoctorLists(response.data.data);
                    setRowCountState(response.data.meta.totalItems);
                    setIsSuccess(true);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDoctorsList();
    }, [paginationModel]);

    const handleSaveClick = async (id, row) => {
        try {
            const { department, experience, bio, duty_start_time, duty_end_time, license } = row;
            console.log({ department, experience, bio, id, duty_start_time, duty_end_time, license });
            await axios
                .put(
                    `http://127.0.0.1:8000/api/doctors/${id}`,
                    { department, experience, bio },
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((response) => {
                    toast.success("Doctor is updated successfully.");
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

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setDoctorLists(
            doctorLists.map((row) => {
                return row.id === newRow.id ? updatedRow : row;
            }),
        );
    };
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleDeleteClick = async (id, row) => {
        if (row.image?.url) {
            try {
                await axios.delete(
                    `http://127.0.0.1:8000/api/image-upload/${image.row?.image?.id}`,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    toast.error(error.response.data.errors);
                } else {
                    toast.error(error.message);
                }
            }
        }
        try {
            await axios.delete(`http://127.0.0.1:8000/api/doctors/${id}`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    toast.success("The doctor is deleted successfully.")
                })
        } catch (error) {
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

    const columns = useMemo(
        () => [
            {
                field: "image",
                headerName: "Profile",
                width: 60,
                sortable: false,
                type: "image",
                editable: false,
                renderCell: (params) => (
                    <ImageAction image={params} model="doctors" />
                ),
            },
            {
                field: "name",
                headerName: "Name",
                editable: false,
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
                field: "department",
                headerName: "Department",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "experience",
                headerName: "Experience",
                editable: true,
                flex: 0.5,
                sortable: false,
            },
            {
                field: "license",
                headerName: "License",
                width: 100,
                editable: true,
            },
            {
                field: "bio",
                headerName: "Bio",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "hospital",
                headerName: "Hospital",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "duty_start_time",
                headerName: "Start",
                width: 100,
                editable: true,
            },
            {
                field: "duty_end_time",
                headerName: "End",
                width: 100,
                editable: true,
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
                            onClick={() => handleDeleteClick(id, row)}
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
                    rows={doctorLists || []}
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
