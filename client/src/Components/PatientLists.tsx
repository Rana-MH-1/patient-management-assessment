"use client";

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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FetchAllPatients } from "@/API/Patients";
import { useEffect, useState } from "react";
import OnePatientDetails from "./OnePatientDetails";
import { PatientType } from "@/Utils/Types";

const PatientLists = () => {
  const [patients, setPatients] = useState([]);
  const [Error, setError] = useState(null);

  const GetAllPatients = async () => {
    try {
      const Patients = await FetchAllPatients();
      if (Patients) {
        setPatients(Patients);
      }
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    GetAllPatients();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><h4>fistname</h4></TableCell>
            <TableCell align="right"><h4>lastname</h4></TableCell>
            <TableCell align="right"><h4>email</h4></TableCell>
            <TableCell align="right"><h4>Phone Number</h4></TableCell>
            <TableCell align="right"><h4>Status</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients?.map((patient : PatientType) => (
            <OnePatientDetails key={patient.id} item={patient} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientLists;
