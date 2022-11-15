import React from "react";
import { useSelector, useDispatch } from "react-redux";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




const InfoNode = () => {
  const Item = useSelector(state => state.State.selector.item);

  // console.log(Item);
  if (Item !== null) {
    return (


    <Paper sx={{background: "#edf7ee"}} elevation={1}>
      <Table sx={{ width: "100%" }}>
        <TableHead  >
          <TableRow >
            <TableCell sx={{ py:0.5}}> <strong>Nombre</strong> </TableCell>
            <TableCell sx={{ py:0.5}} align="right"><strong>Tipo</strong></TableCell>
            <TableCell sx={{ py:0.5}} align="right"> <strong>ID</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Item.name}
              </TableCell>
              <TableCell align="right">{Item.type}</TableCell>
              <TableCell align="right">{Item.id}</TableCell>
            
            </TableRow>
      
        </TableBody>
      </Table>
    </Paper>
    );
  }
};

export default InfoNode;
