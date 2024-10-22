import { useList } from "@refinedev/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AgentCard } from "components";

const Agents = () => {
  const { data, isLoading, isError } = useList({ resource: "users" });

  const allAgents = data?.data ?? [];

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agents List
      </Typography>

      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          backgroundColor: "#fcfcfc",
        }}
      >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfStudents={agent.allStudents.length}
            noOfPrefects={agent.allPrefects.length}
            noOfAdmins={agent.allAdmins.length}
            noOfStaffs={agent.allStaffs.length}
            noOfSliders={agent.allSliders.length}
            noOfEvents={agent.allEvents.length}
            noOfNews={agent.allNews.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
