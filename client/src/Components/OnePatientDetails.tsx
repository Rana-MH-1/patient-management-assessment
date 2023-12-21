import React from "react";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { PatientType } from "@/Utils/Types";

function OnePatientDetails(props: { item: PatientType }) {
  const [open, setOpen] = React.useState(false);

  const getChipColor = () => {
    switch (props.item.status) {
      case "On hold":
        return "warning";

      case "Discharged":
        return "primary";

      case "Active":
        return "success";

      default:
        return "primary";
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.item.firstName}
        </TableCell>
        <TableCell align="right">{props.item.lastName}</TableCell>
        <TableCell align="right">{props.item.email}</TableCell>
        <TableCell align="right">{props.item.PhoneNumber}</TableCell>
        <TableCell align="right">
          <Chip label={props.item.status} color={getChipColor()} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Patient Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Date of birth</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Medical Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={props.item.id}>
                    <TableCell component="th" scope="row">
                      {props.item.Address}
                    </TableCell>
                    <TableCell>{props.item.BirthDate}</TableCell>
                    <TableCell align="right">{props.item.Gender}</TableCell>
                    <TableCell align="right">
                      {props.item.MedicalInformation}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {props.item.InsurranceInformation && (
                <Typography gutterBottom component="div" style={{margin:"10px"}}>
                  InsurranceInformation : {props.item.InsurranceInformation}
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default OnePatientDetails;
