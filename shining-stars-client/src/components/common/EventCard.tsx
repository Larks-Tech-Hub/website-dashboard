import Place from "@mui/icons-material/Place";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import type { EventCardProps } from "interfaces/event";

const EventCard = ({
  id,
  activity,
  description,
  date,
  place,
  photo,
}: EventCardProps) => {
  return (
    <Card
      component={Link}
      to={`/events/show/${id}`}
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
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#808191">
            {activity.toUpperCase()}
          </Typography>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <Stack direction="row" gap={0.5} alignItems="flex-start">
              <Place
                sx={{
                  fontSize: 18,
                  color: "#808191",
                  marginTop: 0.5,
                }}
              />
              <Typography fontSize={14} color="#808191">
                {place}
              </Typography>
            </Stack>

            <Stack direction="row" gap={0.5} alignItems="flex-start">
              <CalendarMonthOutlined
                sx={{
                  fontSize: 18,
                  color: "#808191",
                  marginTop: 0.5,
                }}
              />
              <Typography fontSize={14} color="#808191">
                {date}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Typography fontSize={12} fontWeight={600} color="#808191">
              DESCRIPTION
            </Typography>
            <Typography fontSize={12} fontWeight={600} color="#808191">
              {description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventCard;
