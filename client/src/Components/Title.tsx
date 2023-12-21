"use client";

import { Stack, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));
const Title = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{mb: 2}}
    >
      {" "}
      <h2>Liste de données de patients</h2>
      <Link href="/createpatient">
        <Button variant="outlined">Add a patient</Button>
      </Link>
    </Stack>
  );
};

export default Title;
