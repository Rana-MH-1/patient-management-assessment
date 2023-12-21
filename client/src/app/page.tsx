import Image from "next/image";
import Container from "@mui/material/Container";
import PatientLists from "@/Components/PatientLists";
import Title from "@/Components/Title";

export default function Home() {
  return (
    <Container>
     <Title/>
      <PatientLists />
    </Container>
  );
}
