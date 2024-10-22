import { useEffect, useRef, useState } from "react";
import { useLogin } from "@refinedev/core";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import logo from "../assets/logo.jpeg";

import type { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>({
    v3LegacyAuthProviderCompatible: true,
  });

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  const [passcode, setPasscode] = useState("");
  const [isPasscodeValid, setIsPasscodeValid] = useState(false);
  const [isPasscodeSubmitted, setIsPasscodeSubmitted] = useState(false);
  const passCode = "123456";

  const handlePasscodeSubmit = () => {
    if (passcode === passCode) {
      setIsPasscodeValid(true);
      setIsPasscodeSubmitted(true);
    } else {
      alert("Invalid passcode. Please try again.");
    }
  };

  return (
    <Box component="div" sx={{ backgroundColor: "" }}
>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={logo} alt="Shining Stars Logo" width="200px" />
          </div>
          {!isPasscodeSubmitted && (
            <Box mt={4} sx={{ width: "100%" }}>
              <TextField
                label="Enter Passcode"
                variant="outlined"
                fullWidth
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handlePasscodeSubmit}
              >
                Submit Passcode
              </Button>
            </Box>
          )}
          {isPasscodeValid && (
            <Box mt={4}>
              <GoogleButton />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
