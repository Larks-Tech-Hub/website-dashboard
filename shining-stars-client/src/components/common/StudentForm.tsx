import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import type { StudentFormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const StudentForm = ({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
}: StudentFormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Student
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Student name
            </FormHelperText>
            <TextareaAutosize
              minRows={1}
              required
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("name", { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Student ID
            </FormHelperText>
            <TextareaAutosize
              minRows={1}
              required
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("stid", { required: true })}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select Class
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                sx={{
                  flex: 1,
                  "& .MuiSelect-select": {
                    color: "#919191",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#919191",
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "#919191",
                  },
                }}
                {...register("gender", {
                  required: true,
                })}
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="baby-class"
                {...register("grade", {
                  required: true,
                })}
              >
                <MenuItem value="baby-class">Baby-Class</MenuItem>
                <MenuItem value="middle-class">Middle-Class</MenuItem>
                <MenuItem value="top-class">Top-Class</MenuItem>
                <MenuItem value="primary-one">Primary-One</MenuItem>
                <MenuItem value="primary-two">Primary-Two</MenuItem>
                <MenuItem value="primary-three">Primary-Three</MenuItem>
                <MenuItem value="primary-four">Primary-Four</MenuItem>
                <MenuItem value="primary-five">Primary-Five</MenuItem>
                <MenuItem value="primary-six">Primary-Six</MenuItem>
                <MenuItem value="primary-seven">Primary-Seven</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select Residence
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                sx={{
                  flex: 1,
                  "& .MuiSelect-select": {
                    color: "#919191",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#919191",
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "#919191",
                  },
                }}
                {...register("gender", {
                  required: true,
                })}
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="boarding"
                {...register("residence", {
                  required: true,
                })}
              >
                <MenuItem value="boarding">Boarding</MenuItem>
                <MenuItem value="day">Day</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Enter Student Payment Code
              </FormHelperText>
              <TextareaAutosize
                minRows={1}
                required
                color="info"
                style={{
                  width: "100%",
                  background: "transparent",
                  fontSize: "16px",
                  borderColor: "rgba(0,0,0,0.23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("paymentCode", { required: true })}
              />
            </FormControl>
          </Stack>

          <FormControl sx={{ flex: 1 }}>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Select Gender
            </FormHelperText>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              sx={{
                flex: 1,
                "& .MuiSelect-select": {
                  color: "#919191",
                },
                "& .MuiFormLabel-root": {
                  color: "#919191",
                },
                "& .MuiInputLabel-outlined": {
                  color: "#919191",
                },
              }}
              {...register("gender", {
                required: true,
              })}
              inputProps={{ "aria-label": "Without label" }}
              defaultValue="male"
              {...register("gender", {
                required: true,
              })}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Student Prent Name
            </FormHelperText>
            <TextareaAutosize
              minRows={1}
              required
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("parent_name", { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Student Parent Email
            </FormHelperText>
            <TextareaAutosize
              minRows={1}
              required
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("parent_email", { required: true })}
            />
          </FormControl>

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default StudentForm;
