import Place from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import type { NewCardProps } from "interfaces/new";

const NewCard = ({ id, title, description, photo, type }: NewCardProps) => {
  return (
    <Card
      component={Link}
      to={`/${type}/show/${id}`}
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
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: "10px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#808191">
            TITLE: {title.toUpperCase()}
          </Typography>
        </Stack>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}>
          <Typography fontSize={12} fontWeight={600} color="#808191">
            DESCRIPTION
          </Typography>
          <Typography fontSize={12} fontWeight={600} color="#808191">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewCard;
