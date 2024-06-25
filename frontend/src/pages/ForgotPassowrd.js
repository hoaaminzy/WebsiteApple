import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import axios from "axios";

const ForgotPassword = ({ onClose, inforUser }) => {
  const [email, setEmail] = useState(""); // Added email state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/forgetPassword",
        {
          email,
          oldPassword,
          newPassword,
        }
      );

      setSuccessMessage(response.data.message);
      setEmail(""); // Clear email field
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setError("");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Đổi mật khẩu</h2>
          <div style={styles.closeButton} onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 style={styles.subTitle}>Thay đổi mật khẩu</h2>
          {error && <p style={styles.error}>{error}</p>}
          {successMessage && <p style={styles.success}>{successMessage}</p>}
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="oldPassword" style={styles.label}>
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="newPassword" style={styles.label}>
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="confirmNewPassword" style={styles.label}>
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#ffffff",
    padding: "1rem",
    borderRadius: "0.5rem",
    width: "50rem",
    maxHeight: "80%",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "0.75rem",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.125rem",
  },
  closeButton: {
    marginLeft: "auto",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#000000",
    transition: "color 0.3s ease",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: "1.125rem",
    marginTop: "1rem",
  },
  inputContainer: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.25rem",
    border: "1px solid #cccccc",
    borderRadius: "0.25rem",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "0.75rem 1rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    marginTop: "1rem",
    fontSize: "1rem",
  },
  error: {
    color: "#dc2626",
    marginTop: "0.5rem",
  },
  success: {
    color: "#059669",
    marginTop: "0.5rem",
  },
};

export default ForgotPassword;
