"use client";
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../Layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import MuiTable from "@/components/admin/MuiTable";
import ImageAction from "@/components/admin/ImageAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import toast from "react-hot-toast";

const page = () => {
    const router = useRouter();
    const token = Cookies.get("token");
    const [isLoading, setIsLoading] = useState(true);
    const [departmentLists, setDepartmentLists] = useState([]);
    const [rowCountState, setRowCountState] = useState();
    const [rowModesModel, setRowModesModel] = useState({});
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const getDepartmentLists = async () => {
        await axios
            .get(
                `http://127.0.0.1:8000/api/departments?page=${paginationModel.page + 1
                }&perPage=${paginationModel.pageSize}`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((response) => {
                setDepartmentLists(response.data.data);
                setRowCountState(response.data.meta.totalItems);
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
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
                    <ImageAction image={params} model="departments" />
                ),
            },
            {
                field: "name",
                headerName: "Name",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "createdAt",
                headerName: "Created_At",
                flex: 1,
                editable: false,
                sortable: false,
            },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 130,
                cellClassName: "actions",
                getActions: ({ id, row }) => {
                    const isInEditMode =
                        rowModesModel[id]?.mode === GridRowModes.Edit;

                    if (isInEditMode) {
                        return [
                            <GridActionsCellItem
                                key={id}
                                icon={<SaveIcon />}
                                label="Save"
                                sx={{ color: "primary.main" }}
                                onClick={() => handleSaveClick(id, row)}
                            />,
                            <GridActionsCellItem
                                key={id}
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
                            key={id}
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            key={id}
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

    useEffect(() => {
        getDepartmentLists();
    }, [paginationModel]);

    console.log(departmentLists);

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setDepartmentLists(
            departmentLists.map((row) => {
                return row.id === newRow.id ? updatedRow : row;
            }),
        );
    };
    const handleSaveClick = async (id, row) => {
        try {
            const { name } = row;
            await axios
                .put(
                    `http://127.0.0.1:8000/api/departments/${id}`,
                    { name },
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
    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/departments/${id}`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    console.log(response)
                    toast.success("The patient is deleted successfully.")
                })
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
    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

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
                <MuiTable
                    columns={columns}
                    data={departmentLists}
                    isLoading={isLoading}
                    rowCountState={rowCountState}
                    rowModesModel={rowModesModel}
                    setRowModesModel={setRowModesModel}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                    processRowUpdate={processRowUpdate}
                />
            </div>
        </Layout>
    );
};

export default page;
