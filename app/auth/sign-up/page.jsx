"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[^A-Za-z0-9]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim();

  const usernameValid = trimmedUsername.length >= 3;
  const emailValid = trimmedEmail.length > 0 && emailRegex.test(trimmedEmail);

  const passwordRules = {
    length: password.length >= 8,
    uppercase: uppercaseRegex.test(password),
    lowercase: lowercaseRegex.test(password),
    number: numberRegex.test(password),
    special: specialCharRegex.test(password),
  };

  const passwordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special;

  const confirmPasswordValid =
    confirmPassword.length > 0 && password === confirmPassword;

  async function handleSignUp(e) {
    e.preventDefault();

    setErrors({});
    setServerMessage("");

    const newErrors = {};

    if (!trimmedUsername) {
      newErrors.username = "Username is required";
    } else if (!usernameValid) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!emailValid) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRules.length) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRules.uppercase) {
      newErrors.password = "Password must include at least 1 uppercase letter";
    } else if (!passwordRules.lowercase) {
      newErrors.password = "Password must include at least 1 lowercase letter";
    } else if (!passwordRules.number) {
      newErrors.password = "Password must include at least 1 number";
    } else if (!passwordRules.special) {
      newErrors.password = "Password must include at least 1 special character";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!confirmPasswordValid) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMessage(data.message || "Sign up failed");
        return;
      }

      router.push("/auth/sign-in");
    } catch (error) {
      console.log("Sign up error:", error);
      setServerMessage("Something went wrong");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">Create your World Builder account</p>

        {serverMessage && <p className="auth-error">{serverMessage}</p>}

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              className={
                trimmedUsername
                  ? usernameValid
                    ? "input-valid"
                    : "input-invalid"
                  : ""
              }
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
                setServerMessage("");
              }}
            />
            {errors.username && (
              <p className="field-error">{errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              className={
                trimmedEmail
                  ? emailValid
                    ? "input-valid"
                    : "input-invalid"
                  : ""
              }
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
                setServerMessage("");
              }}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              className={
                password
                  ? passwordValid
                    ? "input-valid"
                    : "input-invalid"
                  : ""
              }
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
                setServerMessage("");
              }}
            />

            <div className="password-checklist">
              <p>
                <span className={passwordRules.length ? "check" : "cross"}>
                  {passwordRules.length ? "✓" : "✗"}
                </span>
                <span>8+ characters</span>
              </p>

              <p>
                <span className={passwordRules.uppercase ? "check" : "cross"}>
                  {passwordRules.uppercase ? "✓" : "✗"}
                </span>
                <span>1 uppercase letter</span>
              </p>

              <p>
                <span className={passwordRules.lowercase ? "check" : "cross"}>
                  {passwordRules.lowercase ? "✓" : "✗"}
                </span>
                <span>1 lowercase letter</span>
              </p>

              <p>
                <span className={passwordRules.number ? "check" : "cross"}>
                  {passwordRules.number ? "✓" : "✗"}
                </span>
                <span>1 number</span>
              </p>

              <p>
                <span className={passwordRules.special ? "check" : "cross"}>
                  {passwordRules.special ? "✓" : "✗"}
                </span>
                <span>1 special character</span>
              </p>
            </div>

            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              className={
                confirmPassword
                  ? confirmPasswordValid
                    ? "input-valid"
                    : "input-invalid"
                  : ""
              }
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                setServerMessage("");
              }}
            />
            {errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="auth-submit">
            Sign Up
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link href="/auth/sign-in">Log In</Link>
        </p>

        <Link href="/" className="auth-back">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default SignUp;
