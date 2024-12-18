import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { setToken, setUsername } from "../utils/storage";
import OtpInput from "react-otp-input";

export const Login: React.FC = () => {
  const [username, setUsernameInput] = useState("");
  const [otp, setOtp] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const navigate = useNavigate();

  // Update `isMobile` on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, otp);
      setToken(response.data.token);
      setUsername(username);
      navigate("/quotes");
    } catch (error) {
      alert(`Login failed: ${error}`);
    }
  };

  return (
    <div  style={{
      ...styles.container,
      flexDirection: isMobile ? "column" : "row", 
    }}>
      {isMobile && (
      <div style={styles.mobileWelcomeText}>
        <p>Welcome to QUOTES</p>
      </div>
    )}
      <div style={styles.outerContainer}>
        <div style={{ ...styles.welcomeContainer, display: isMobile ? "none" : "flex" }}>
          <div style={styles.welcomeText}>
            <p style={styles.welcomeTitle}>Welcome to QUOTES</p>
            <p style={styles.welcomeSubtitle}>Secure your access with OTP</p>
          </div>
        </div>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>LOGIN</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              style={styles.input}
              required
            />
            <div style={styles.otpContainer}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span style={styles.otpSeparator}>-</span>}
                inputStyle={styles.otpInput}
                renderInput={(props) => (
                  <input {...props} type="tel" inputMode="numeric" pattern="[0-9]*" />
                )}
              />
            </div>
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    minWidth: "100vw",
    background: "linear-gradient(to bottom, #e0f2fe, #ffffff)",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    boxSizing: "border-box" as const,
  },
  outerContainer: {
    display: "flex",
    flexDirection: "row" as const,
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  mobileWelcomeText: {
    textAlign: "center" as const,
    fontSize: "1.25rem",
    fontWeight: "bold" as const,
    color: "#1e3a8a",
    marginBottom: "1rem",
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  welcomeText: {
    textAlign: "center" as const,
    color: "#1e3a8a",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  welcomeTitle: {
    marginBottom: "1rem",
  },
  welcomeSubtitle: {
    fontWeight: "normal" as const,
  },
  formContainer: {
    flex: 1,
    padding: "2rem",
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1e3a8a",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box" as const,
  },
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
  },
  otpInput: {
    width: "3rem",
    height: "3rem",
    fontSize: "1.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    textAlign: "center" as const,
    outline: "none",
  },
  otpSeparator: {
    margin: "0 0.25rem",
  },
  loginButton: {
    backgroundColor: "#1e40af",
    color: "#ffffff",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    textAlign: "center" as const,
    transition: "background-color 0.3s ease",
  },
};

export default Login;
