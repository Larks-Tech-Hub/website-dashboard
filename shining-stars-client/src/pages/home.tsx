import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { PieChart, StudentReferrals, TotalFees, StudentCard } from "components";
import { studentReferralsInfo } from "constants/index";


const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "students",
    config: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const adminsData = useList({
    resource: "admins",
    config: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const staffsData = useList({
    resource: "staffs",
    config: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const prefectsData = useList({
    resource: "prefects",
    config: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const latestStudents = data?.data ?? [];

  const noOfStudents = latestStudents.length;
  const noOfAdmins = adminsData?.data?.data?.length;
  const noOfStaffs = staffsData?.data?.data?.length;
  const noOfPrefects = prefectsData?.data?.data?.length;

  // Male students filter
  const maleStudents = latestStudents.filter(
    (student) => student.gender === "male"
  );
  const numberOfMaleStudents = maleStudents.length;
  const malePercentage = Math.round(
    (numberOfMaleStudents / noOfStudents) * 100
  );

  // Female students filter
  const femaleStudents = latestStudents.filter(
    (student) => student.gender === "female"
  );
  const numberOfFemaleStudents = femaleStudents.length;
  const femalePercentage = Math.round(
    (numberOfFemaleStudents / noOfStudents) * 100
  );

  // Day students filter
  const dayStudents = latestStudents.filter(
    (student) => student.residence === "day"
  );
  const numberOfDayStudents = dayStudents.length;
  const dayPercentage = Math.round((numberOfDayStudents / noOfStudents) * 100);

  // Boarding students filter
  const boardingStudents = latestStudents.filter(
    (student) => student.residence === "boarding"
  );
  const numberOfBoardingStudents = boardingStudents.length;
  const boardingPercentage = Math.round(
    (numberOfBoardingStudents / noOfStudents) * 100
  );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  interface ProgressBarProps {
    title: string;
    percentage: number;
    color: string;
  }

  const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
    <Box width="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontSize={16} fontWeight={500} color="#11142d">
          {title}
        </Typography>
        <Typography fontSize={16} fontWeight={500} color="#11142d">
          {percentage}%
        </Typography>
      </Stack>
      <Box
        mt={2}
        position="relative"
        width="100%"
        height="8px"
        borderRadius={1}
        bgcolor="#e4e8ef"
      >
        <Box
          width={`${percentage}%`}
          bgcolor={color}
          position="absolute"
          height="100%"
          borderRadius={1}
        />
      </Box>
    </Box>
  );

  const percentages = [malePercentage, femalePercentage, dayPercentage, boardingPercentage];

  const renderProgressBars = () => {
    return percentages.map((percentage, index) => {
      const barData = studentReferralsInfo[index]; 
      return (
        <Stack key={barData.title} my="20px" direction="column" gap={4}>
          <ProgressBar
            title={barData.title}
            percentage={percentage}
            color={barData.color}
          />
        </Stack>
      );
    });
  };

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Total Administrators"
          value={noOfAdmins!}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Staffs"
          value={noOfStaffs!}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Students"
          value={noOfStudents!}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Prefects"
          value={noOfPrefects!}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      <Stack mt="25px" width="100%">
        {/* <StudentReferrals /> */}
        <Box
          p={4}
          bgcolor="#fcfcfc"
          id="chart"
          minWidth={490}
          display="flex"
          flexDirection="column"
          borderRadius="15px"
        >
          <Typography fontSize={18} fontWeight={600} color="#11142d">
            Student Referrals
          </Typography>

          <Box>
            {renderProgressBars()}
          </Box>

        </Box>

      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Students
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestStudents.map((student) => (
            <StudentCard
              key={student._id}
              id={student._id}
              name={student.name}
              stid={student.stid}
              grade={student.grade}
              paymentCode={student.paymentCode}
              parent_name={student.parent_name}
              parent_email={student.parent_email}
              gender={student.gender}
              residence={student.residence}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
