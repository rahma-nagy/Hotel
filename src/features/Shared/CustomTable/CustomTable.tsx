
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  //   CircularProgress,
} from "@mui/material";
import { red } from "@mui/material/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CustomTableProps<DataType> {
  data: DataType[];
  onView: (id: string) => void;
  onUpdate: (item: DataType) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  modelName: string;
  // columns: string[];
  columns: { label: string; key: string }[]; // Utiliser un tableau d'objets pour définir les colonnes
}
//   interface Room {
//     _id: string;
//     roomNumber: number;
//     images: string[];
//     price: number;
//     discount: number;
//     capacity: number;
//     // ... autres propriétés
//   }
const CustomTable: React.FC<CustomTableProps<DataType>> = ({
  data,
  onView,
  onUpdate,
  onDelete,
  isLoading,
  modelName,
  columns,
}) => {
 
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>{modelName} Number</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Capacity</TableCell> */}
            {columns.map((column, index) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 &&
            data.map((item) => (
              <TableRow key={item?._id}>
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    {column.key.toLowerCase() === "image" ? (
                      item?.images?.length > 0 ? (
                        <img
                          src={item?.images?.[0]}
                          alt={`${modelName} ${item?.name || ""}`}
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : null
                    ) : column.key.includes(".") ? (
                      // Gestion des clés avec un point (.)
                      column.key.split(".").reduce((acc, current) => acc?.[current], item) || ""
                    ) : (
                      // Cas général
                      column.key === "createdAt" || column.key === "updatedAt"
                ? new Date(item[column.key]).toLocaleString()
                : item?.[column.key.toLowerCase()] || ""
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onView(item?._id)}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => onUpdate(item)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => onDelete(item?._id)}
                  >
                    <DeleteIcon sx={{ color: red[500] }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;

















