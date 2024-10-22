import Place from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import type { AdmissionCardProps } from "interfaces/admission";

const AdmissionCard = ({
  id,
  name,
    admission_no,
    date_of_birth,
    age,
    gender,
    grade,
    residence,
    term,
    emis_no,
    parent_name,
    parent_email,
    parent_telephone,
    parent_relationship_with_pupil,
    parent_address,
    parent_village,
    parent_lc,
    parent_nin,
    next_of_kin_name,
    next_of_kin_gender,
    next_of_kin_telephone,
    next_of_kin_relationship_with_pupil,
    next_of_kin_address,
    next_of_kin_village,
    next_of_kin_lc,
    child_medical_info,
}: AdmissionCardProps) => {
  return (
    <Card
      component={Link}
      to={`/admins/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      {/* <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: "10px" }}
      /> */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography
            fontSize={20}
            fontWeight={500}
            color="#808191"
            height="fit-content"
          >
            {name.toUpperCase()}
          </Typography>
          <Stack
            direction="row"
            gap={0.5}
            alignItems="flex-start"
            height="fit-content"
          >
            {/* <Typography fontSize={16} fontWeight={600} color="#808191">
              {title}
            </Typography> */}
          </Stack>
        </Stack>
        <Box
          height="fit-content"
        >
          <Typography fontSize={12} fontWeight={600} color="#808191" style={{textDecoration: "underline"}}>
            MESSAGE           
          </Typography>
          {/* <Typography fontSize={12} fontWeight={600} color="#808191">
            {message}
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdmissionCard;
