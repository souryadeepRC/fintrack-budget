import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import styles from "./Login.module.scss";
import { Button } from "@/components/common";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/service/Auth";
import { toast } from "sonner";

const Login: React.FC = () => {
  const { mutate } = useMutation({
    mutationFn: (data: any) => AuthService.login(data),
    onSuccess: function () {
      toast.success(`Logged In successfully`);
    },
    onError: function () {
      toast.error(`Failed to Login`);
    },
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    mutate(formData);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.inputGroup}>
          <FaUserAlt className={styles.icon} />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" className={styles.button}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
