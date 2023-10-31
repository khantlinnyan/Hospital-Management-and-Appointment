"use client";
import { DataGrid, GridRowEditStopReasons, GridRowModes, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";

const MuiTable = ({
    data,
    columns,
    isLoading,
    rowCountState,
    rowModesModel,
    setRowModesModel,
    paginationModel,
    setPaginationModel,
    processRowUpdate
}) => {
    

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    return (
        <DataGrid
            sx={{ width: "100%" }}
            columns={columns}
            rows={data || []}
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
            // onProcessRowUpdateError={(error) => console.log(error)}
            slots={{ toolbar: GridToolbar }}
        />
    );
};

export default MuiTable;
