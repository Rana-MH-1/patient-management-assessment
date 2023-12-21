"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  SelectChangeEvent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { createNewPatient } from "@/API/Patients";

const CreatePatient = () => {
  const router = useRouter();

  const [newPatient, setNewPatient] = useState({
    Gender: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorValidations , setErrorValidation] = useState([])

  const HandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]:
        e.target?.type === "number" ? +e.target.value : e.target.value,
    });
  };

  const HandleSelectChangeGender = (e: SelectChangeEvent<string>) => {
    setNewPatient({ ...newPatient, Gender: e.target.value });
  };

  const HandleSelectChangeStatus = (e: SelectChangeEvent<string>) => {
    setNewPatient({ ...newPatient, status: e.target.value });
  };

  const AddNewPatient = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await createNewPatient(newPatient);
      if (resp) {
        setIsLoading(false);
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.response?.data?.errors
      );
      error?.response?.data?.message === "Input data validation failed" && setErrorValidation(error.response?.data?.errors)
    }
  };


  return (
    <Box sx={{ ml: 3, mr: 3 }}>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary" }}>
          <PersonAddAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a new Patient
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={HandleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={HandleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={HandleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="BirthDate"
                label="BirthDate"
                onChange={HandleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="PhoneNumber"
                label="Phone Number"
                type="number"
                onChange={HandleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="Address"
                label="Address"
                onChange={HandleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="Gender"
                  label="Gender"
                  onChange={HandleSelectChangeGender}
                >
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-multiline-flexible"
                multiline
                name="MedicalInformation"
                label="Medical Information"
                maxRows={4}
                fullWidth
                onChange={HandleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                name="InsurranceInformation"
                label="Insurrance Information"
                maxRows={4}
                fullWidth
                onChange={HandleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="status"
                  onChange={HandleSelectChangeStatus}
                >
                  <MenuItem value={"On hold"}>On hold</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Discharged"}>Discharged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={AddNewPatient}
          >
            {isLoading && (
              <>
                <Box sx={{ display: "flex" }}>
                  <CircularProgress color="secondary" />
                </Box>
              </>
            )}{" "}
            create
          </Button>
          {error && <Box sx={{ m: 3 }}>
            <Alert severity="error">
              {error}
            </Alert>
          </Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePatient;
