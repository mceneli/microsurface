import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'publisher', headerName: 'Publisher', width: 300 },
  { field: 'cost', headerName: 'Cost', width: 100 },
];

const initialRows = [
  //{ id: 1, name: 'Doe', publisher: 'John', cost: 35 }
  // Other rows...
];

const MyDataGrid = () => {
  const [rows, setRows] = useState(initialRows);

  const bindData = async () => {
    // Perform data binding logic here
    if(localStorage.getItem('token')!=null){
    const rows = await getPlatforms();

    const updatedRows = rows.map((row) => ({
      ...row,
      lastName: `${row.lastName}`,

    }));
    

    setRows(updatedRows);
  }else{
    console.log("Unauthorized");
  }
  };

  const getPlatforms = () => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:5000/api/Platforms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error while getting platforms');
          }
        })
        .then(responseData => {
          console.log(responseData);
          resolve(responseData);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      <button onClick={bindData}>Bind Data</button>
    </div>
  );
};

export default MyDataGrid;
