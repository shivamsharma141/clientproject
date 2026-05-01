"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./login.module.css";

// ─────────────────────────────────────────────
// Tiny reusable primitives
// ─────────────────────────────────────────────

function Spinner() {
  return <span className={styles.spinner} aria-label="Loading" />;
}

function FieldInput({
  id, label, type = "text", value, onChange, error,
  placeholder, autoFocus, onKeyDown, rightSlot, disabled,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          type={type}
          className={`${styles.input} ${error ? styles.inputErr : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          disabled={disabled}
          aria-describedby={error ? `${id}-err` : undefined}
          autoComplete="off"
        />
        {rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
      </div>
      {error && (
        <p id={`${id}-err`} className={styles.fieldErr} role="alert">{error}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Validation helpers
// ─────────────────────────────────────────────
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(v) {
  if (!v.trim()) return "Email is required.";
  if (!emailRx.test(v.trim())) return "Enter a valid email address.";
  return "";
}

function validatePassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "At least 8 characters required.";
  return "";
}

function validateNewPassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "At least 8 characters.";
  if (!/[A-Z]/.test(v)) return "Add at least one uppercase letter.";
  if (!/[0-9]/.test(v)) return "Add at least one number.";
  if (!/[^A-Za-z0-9]/.test(v)) return "Add at least one special character.";
  return "";
}

function passwordStrength(v) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return s;
}

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", "#e53935", "#fb8c00", "#43a047", "#1b5e20"];

// ─────────────────────────────────────────────
// EyeIcon
// ─────────────────────────────────────────────
function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.39 1 12c.93-2.21 2.37-4.07 4.07-5.44"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c5 0 9.27 3.61 11 8a10.09 10.09 0 01-2.17 3.37"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12C2.73 7.61 7 4 12 4s9.27 3.61 11 8c-1.73 4.39-6 8-11 8S2.73 16.39 1 12z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

// ─────────────────────────────────────────────
// OTP Input component
// ─────────────────────────────────────────────
function OTPInput({ value, onChange }) {
  const refs = Array.from({ length: 6 }, () => useRef(null));

  // Auto-focus first on mount
  useEffect(() => { refs[0].current?.focus(); }, []);

  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  const update = (arr) => onChange(arr.join(""));

  const handleKey = (e, i) => {
    if (e.key === "Backspace") {
      const arr = [...digits];
      if (arr[i]) {
        arr[i] = "";
        update(arr);
      } else if (i > 0) {
        arr[i - 1] = "";
        update(arr);
        refs[i - 1].current?.focus();
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs[i - 1].current?.focus();
    } else if (e.key === "ArrowRight" && i < 5) {
      refs[i + 1].current?.focus();
    }
  };

  const handleChange = (e, i) => {
    const ch = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = [...digits];
    arr[i] = ch;
    update(arr);
    if (ch && i < 5) refs[i + 1].current?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const arr = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    update(arr);
    const focusIdx = Math.min(pasted.length, 5);
    refs[focusIdx].current?.focus();
  };

  return (
    <div className={styles.otpRow}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={`${styles.otpBox} ${d ? styles.otpFilled : ""}`}
          value={d}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKey(e, i)}
          onPaste={handlePaste}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN AUTH PAGE
// ─────────────────────────────────────────────
/*
  MODES:
    "login"         → normal login form
    "forgot_email"  → enter email for OTP
    "forgot_otp"    → 6-digit OTP verify
    "forgot_reset"  → new password
    "forgot_done"   → success
*/

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [animKey, setAnimKey] = useState(0); // triggers re-mount animation

  // ── Login state ──────────────────────────────
  const [loginEmail, setLoginEmail]       = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors]     = useState({});
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading]   = useState(false);

  // ── Forgot state ─────────────────────────────
  const [forgotEmail, setForgotEmail]   = useState("");
  const [forgotEmailErr, setForgotEmailErr] = useState("");
  const [forgotLoading, setForgotLoading]   = useState(false);
  const [otpSentMsg, setOtpSentMsg]         = useState("");

  const [otp, setOtp]             = useState("");
  const [otpErr, setOtpErr]       = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer]         = useState(30);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  const [newPass, setNewPass]         = useState("");
  const [confPass, setConfPass]       = useState("");
  const [newPassErr, setNewPassErr]   = useState("");
  const [confPassErr, setConfPassErr] = useState("");
  const [showNew, setShowNew]         = useState(false);
  const [showConf, setShowConf]       = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // ── Mode switcher with animation ─────────────
  const switchMode = (next) => {
    setMode(next);
    setAnimKey((k) => k + 1);
  };

  // ── Timer for OTP ─────────────────────────────
  const startTimer = useCallback(() => {
    setTimer(30);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  // ─────────────────────────────────────────────
  // LOGIN handlers
  // ─────────────────────────────────────────────
  const handleLoginChange = (field, val) => {
    if (field === "email") setLoginEmail(val);
    else setLoginPassword(val);
    setLoginErrors((e) => ({ ...e, [field]: "" }));
  };

  const loginValid =
    !validateEmail(loginEmail) && !validatePassword(loginPassword);

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    const errs = {
      email:    validateEmail(loginEmail),
      password: validatePassword(loginPassword),
    };
    setLoginErrors(errs);
    if (errs.email || errs.password) return;

    setLoginLoading(true);

try {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setLoginErrors({ email: data.message || "Login failed" });
    return;
  }

  // ✅ success
  window.location.href = "/home"; // change to your page

} catch (error) {
  setLoginErrors({ email: "Server error" });
} finally {
  setLoginLoading(false);
}
  };

  // ─────────────────────────────────────────────
  // FORGOT — Step 1: Email
  // ─────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e?.preventDefault?.();
    const err = validateEmail(forgotEmail);
    setForgotEmailErr(err);
    if (err) return;

    setForgotLoading(true);

try {
  const res = await fetch("/api/auth/sendotp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: forgotEmail }),
  });

  const data = await res.json();

  if (!res.ok) {
    setForgotEmailErr(data.message || "Error sending OTP");
    return;
  }

  setOtpSentMsg(`OTP sent to ${forgotEmail}`);
  startTimer();
  switchMode("forgot_otp");

} catch (error) {
  setForgotEmailErr("Server error");
} finally {
  setForgotLoading(false);
}




    setForgotLoading(false);
    setOtpSentMsg(`OTP sent to ${forgotEmail}`);
    startTimer();
    switchMode("forgot_otp");
  };

  // ─────────────────────────────────────────────
  // FORGOT — Step 2: OTP
  // ─────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e?.preventDefault?.();
    if (otp.length !== 6) { setOtpErr("Enter all 6 digits."); return; }
    if (!/^\d{6}$/.test(otp)) { setOtpErr("OTP must be digits only."); return; }
    setOtpErr("");

    setOtpLoading(true);
try {
  const res = await fetch("/api/auth/verifyotp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: forgotEmail,
      otp,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setOtpErr(data.message || "Invalid OTP");
    return;
  }

  switchMode("forgot_reset");

} catch (error) {
  setOtpErr("Server error");
} finally {
  setOtpLoading(false);
}
  };



  const handleResend = async () => {
    if (!canResend) return;
    setForgotLoading(true);
    try {
  const res = await fetch("/api/auth/sendotp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: forgotEmail }),
  });

  if (!res.ok) return;

  setOtp("");
  setOtpErr("");
  startTimer();
  setOtpSentMsg(`OTP resent to ${forgotEmail}`);

} catch (error) {
  console.log(error);
}
    setForgotLoading(false);
    setOtp("");
    setOtpErr("");
    startTimer();
    setOtpSentMsg(`OTP resent to ${forgotEmail}`);
  };

  // ─────────────────────────────────────────────
  // FORGOT — Step 3: Reset Password
  // ─────────────────────────────────────────────
  const strength = passwordStrength(newPass);
  const strengthLabel = STRENGTH_LABEL[strength];
  const strengthColor = STRENGTH_COLOR[strength];

  const handleReset = async (e) => {
    e?.preventDefault?.();
    const ne = validateNewPassword(newPass);
    const ce = newPass !== confPass ? "Passwords do not match." : "";
    setNewPassErr(ne);
    setConfPassErr(ce);
    if (ne || ce) return;

    setResetLoading(true);
    setResetLoading(true);

try {
  const res = await fetch("/api/auth/resetpassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: forgotEmail,
      newPassword: newPass,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setNewPassErr(data.message || "Error resetting password");
    return;
  }

  switchMode("forgot_done");

} catch (error) {
  setNewPassErr("Server error");
} finally {
  setResetLoading(false);
}
  };

  // ─────────────────────────────────────────────
  // Step label
  // ─────────────────────────────────────────────
  const stepInfo = {
    forgot_email: { step: 1, of: 3, label: "Enter Email" },
    forgot_otp:   { step: 2, of: 3, label: "Verify OTP"  },
    forgot_reset: { step: 3, of: 3, label: "New Password" },
  }[mode];

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div className={styles.page}>
      {/* Ambient background shapes */}
      <div className={styles.bg}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.leaf1}>🌿</div>
        <div className={styles.leaf2}>🍃</div>
      </div>

      <div className={styles.card} key={animKey}>

        {/* ── Brand header ── */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>🐄</div>
          <div>
            <div className={styles.brandName}>GAAV</div>
            <div className={styles.brandSub}>by Yashoda Dairy Farm</div>
          </div>
        </div>

        {/* ── Forgot password step progress ── */}
        {stepInfo && (
          <div className={styles.stepBar}>
            {[1, 2, 3].map((n) => (
              <div key={n} className={`${styles.stepDot} ${n <= stepInfo.step ? styles.stepActive : ""}`} />
            ))}
            <span className={styles.stepLabel}>{stepInfo.label}</span>
          </div>
        )}

        {/* ════════════════════════════════════════
            MODE: LOGIN
        ════════════════════════════════════════ */}
        {mode === "login" && (
          <form onSubmit={handleLogin} noValidate className={styles.form}>
            <div className={styles.formHead}>
              <h1 className={styles.title}>Welcome back</h1>
              <p className={styles.sub}> login into your account</p>
            </div>

            <FieldInput
              id="lemail"
              label="Email Address"
              type="email"
              value={loginEmail}
              onChange={(e) => handleLoginChange("email", e.target.value)}
              error={loginErrors.email}
              placeholder="you@example.com"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
              disabled={loginLoading}
            />

            <FieldInput
              id="lpassword"
              label="Password"
              type={showLoginPass ? "text" : "password"}
              value={loginPassword}
              onChange={(e) => handleLoginChange("password", e.target.value)}
              error={loginErrors.password}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
              disabled={loginLoading}
              rightSlot={
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowLoginPass((p) => !p)}
                  aria-label={showLoginPass ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showLoginPass} />
                </button>
              }
            />

            <div className={styles.forgotRow}>
              <button
                type="button"
                className={styles.forgotBtn}
                onClick={() => {
                  setForgotEmail(loginEmail); // pre-fill if they typed it
                  switchMode("forgot_email");
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={!loginValid || loginLoading}
            >
              {loginLoading ? <Spinner /> : "Login →"}
            </button>

            <p className={styles.switchRow}>
              Don't have an account?{" "}
              <a href="/signingup" className={styles.switchLink}>Create one</a>
            </p>
          </form>
        )}

        {/* ════════════════════════════════════════
            MODE: FORGOT — Step 1 (Email)
        ════════════════════════════════════════ */}
        {mode === "forgot_email" && (
          <form onSubmit={handleSendOtp} noValidate className={styles.form}>
            <div className={styles.formHead}>
              <h1 className={styles.title}>Reset Password</h1>
              <p className={styles.sub}>We'll send a 6-digit OTP to your email.</p>
            </div>

            <FieldInput
              id="femail"
              label="Registered Email"
              type="email"
              value={forgotEmail}
              onChange={(e) => { setForgotEmail(e.target.value); setForgotEmailErr(""); }}
              error={forgotEmailErr}
              placeholder="you@example.com"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSendOtp(e)}
              disabled={forgotLoading}
            />

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={forgotLoading}
            >
              {forgotLoading ? <Spinner /> : "Send OTP →"}
            </button>

            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => switchMode("login")}
            >
              ← Back to Login
            </button>
          </form>
        )}

        {/* ════════════════════════════════════════
            MODE: FORGOT — Step 2 (OTP)
        ════════════════════════════════════════ */}
        {mode === "forgot_otp" && (
          <form onSubmit={handleVerifyOtp} noValidate className={styles.form}>
            <div className={styles.formHead}>
              <h1 className={styles.title}>Enter OTP</h1>
              {otpSentMsg && <p className={styles.successNote}>✓ {otpSentMsg}</p>}
              <p className={styles.sub}>Check your inbox for the 6-digit code.</p>
            </div>

            <OTPInput value={otp} onChange={(v) => { setOtp(v); setOtpErr(""); }} />
            {otpErr && <p className={styles.fieldErr} role="alert">{otpErr}</p>}

            {/* Timer & Resend */}
            <div className={styles.timerRow}>
              {!canResend ? (
                <span className={styles.timerText}>
                  Resend OTP in{" "}
                  <span className={styles.timerCount}>0:{String(timer).padStart(2, "0")}</span>
                </span>
              ) : (
                <button
                  type="button"
                  className={styles.resendBtn}
                  onClick={handleResend}
                  disabled={forgotLoading}
                >
                  {forgotLoading ? <Spinner /> : "↺ Resend OTP"}
                </button>
              )}
            </div>

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={otp.length !== 6 || otpLoading}
            >
              {otpLoading ? <Spinner /> : "Verify OTP →"}
            </button>

            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => switchMode("forgot_email")}
            >
              ← Change Email
            </button>
          </form>
        )}

        {/* ════════════════════════════════════════
            MODE: FORGOT — Step 3 (Reset)
        ════════════════════════════════════════ */}
        {mode === "forgot_reset" && (
          <form onSubmit={handleReset} noValidate className={styles.form}>
            <div className={styles.formHead}>
              <h1 className={styles.title}>New Password</h1>
              <p className={styles.sub}>Choose a strong password for your account.</p>
            </div>

            <FieldInput
              id="newpass"
              label="New Password"
              type={showNew ? "text" : "password"}
              value={newPass}
              onChange={(e) => { setNewPass(e.target.value); setNewPassErr(""); }}
              error={newPassErr}
              placeholder="Min 8 chars"
              autoFocus
              disabled={resetLoading}
              rightSlot={
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowNew((p) => !p)}
                  aria-label="Toggle password"
                >
                  <EyeIcon open={showNew} />
                </button>
              }
            />

            {/* Strength bar */}
            {newPass && (
              <div className={styles.strengthWrap}>
                <div className={styles.strengthBar}>
                  {[1,2,3,4].map((i) => (
                    <div
                      key={i}
                      className={styles.strengthSeg}
                      style={{ background: i <= strength ? strengthColor : "#c8e6c9" }}
                    />
                  ))}
                </div>
                <span className={styles.strengthLbl} style={{ color: strengthColor }}>
                  {strengthLabel}
                </span>
              </div>
            )}

            <FieldInput
              id="confpass"
              label="Confirm Password"
              type={showConf ? "text" : "password"}
              value={confPass}
              onChange={(e) => { setConfPass(e.target.value); setConfPassErr(""); }}
              error={confPassErr}
              placeholder="Repeat password"
              disabled={resetLoading}
              rightSlot={
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowConf((p) => !p)}
                  aria-label="Toggle password"
                >
                  <EyeIcon open={showConf} />
                </button>
              }
            />
            {confPass && !confPassErr && confPass === newPass && (
              <p className={styles.matchOk}>✓ Passwords match</p>
            )}

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={resetLoading}
            >
              {resetLoading ? <Spinner /> : "Reset Password →"}
            </button>
          </form>
        )}

        {/* ════════════════════════════════════════
            MODE: FORGOT — Step 4 (Success)
        ════════════════════════════════════════ */}
        {mode === "forgot_done" && (
          <div className={styles.form}>
            <div className={styles.successScene}>
              <div className={styles.successRing}>
                <span className={styles.successCheck}>✓</span>
              </div>
              <h1 className={styles.title}>Password Reset!</h1>
              <p className={styles.sub}>
                Your password has been changed successfully.<br />
                You can now sign in with your new password.
              </p>
              <button
                className={styles.primaryBtn}
                onClick={() => {
                  setLoginPassword("");
                  setNewPass(""); setConfPass("");
                  setOtp(""); setForgotEmail("");
                  switchMode("login");
                }}
              >
                Go to Login →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}