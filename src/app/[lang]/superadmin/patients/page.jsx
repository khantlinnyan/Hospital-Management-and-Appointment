"use client";
import React, { useMemo, useState, useEffect } from "react";
import Layout from "../Layout";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import ImageAction from "@/components/admin/ImageAction";
import MuiTable from "@/components/admin/MuiTable";
import axios from "axios";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useToast } from "@/components/ErrorHandlingToast/useToaster";

const page = () => {
    const token = Cookies.get("token");

    const [isLoading, setIsLoading] = useState(true);
    const [patientLists, setPatientLists] = useState([]);
    const [rowCountState, setRowCountState] = useState();
    const [rowModesModel, setRowModesModel] = useState({});
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const {toastError} = useToast()
    const getPatientLists = async () => {
        try {
            await axios
                .get(
                    `http://127.0.0.1:8000/api/patients?page=${
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
                    console.log(response.data.data);
                    setIsLoading(false);
                    setPatientLists(response.data.data);
                    setRowCountState(response.data.meta.totalItems);
                });
        } catch (err) {
            console.log(err);
            toastError(err.message)
        }
    };

    useEffect(() => {
        getPatientLists();
    }, [paginationModel]);

    console.log(patientLists);

    const handleEditClick = (id) => () => {
      setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.Edit },
      });
  };

  const handleSaveClick = async (id, row) => {
      // try {
      //     const { name, email, phone, address, bio } = row;
      //     await axios
      //         .put(
      //             `http://127.0.0.1:8000/api/hospitals/${id}`,
      //             { name, email, phone, address, bio },
      //             {
      //                 headers: {
      //                     Accept: "application/json",
      //                     Authorization: `Bearer ${token}`,
      //                 },
      //             },
      //         )
      //         .then((response) => {
      //             toast.success("Updated successfully");
      //             setRowModesModel({
      //                 ...rowModesModel,
      //                 [id]: { mode: GridRowModes.View },
      //             });
      //         });
      // } catch (error) {
      //     if (error.response && error.response.status === 422) {
      //         toast.error(error.response.data.errors);
      //     } else {
      //         toast.error(error.message);
      //     }
      // }
  };

  const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setPatientLists(
          patientLists.map((row) => {
              return row.id === newRow.id ? updatedRow : row;
          }),
      );
  };

  const handleDeleteClick = async (id) => {
      try{
          await axios.delete(`http://127.0.0.1:8000/api/patients/${id}`,
          {
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
              },
          }).then((response)=> {
              console.log(response)
              toast.success("The patient is deleted successfully.")
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
                flex: 1,
                sortable: false,
            },
            {
                field: "email",
                headerName: "Email",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "phone",
                headerName: "Phone",
                editable: true,
                flex: 1,
                sortable: false,
            },
            {
                field: "hospital",
                headerName: "Hospital",
                editable: false,
                flex: 1,
                sortable: false,
            },
            {
                field: "date",
                headerName: "Created_At",
                flex: 1,
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
                            onClick={()=>handleDeleteClick(id , row)}
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
                <MuiTable
                    data={patientLists}
                    columns={columns}
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
