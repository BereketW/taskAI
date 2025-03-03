import React from "react";

export default function EmailTemplate({ url }) {
  return (
    <table>
      <tr>
        <td align="center" style={{ padding: 0 }}>
          <table
            role="presentation"
            style={{
              width: "100%",
              maxWidth: "600px",
              border: "none",
              borderSpacing: 0,
              textAlign: "left",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <tr>
              <td style={{ padding: "40px 40px 20px 40px" }}>
                <table
                  role="presentation"
                  style={{ width: "100%", border: "none", borderSpacing: 0 }}
                >
                  <tr>
                    <td style={{ width: "100%", textAlign: "center" }}>
                      <div
                        style={{
                          backgroundColor: "#2563eb",
                          display: "inline-block",
                          padding: "12px",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src="https://your-domain.com/logo.png"
                          alt="TaskAI Logo"
                          style={{
                            display: "block",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0 40px 40px 40px" }}>
                <table
                  role="presentation"
                  style={{ width: "100%", border: "none", borderSpacing: 0 }}
                >
                  <tr>
                    <td>
                      <h1
                        style={{
                          margin: "0 0 20px 0",
                          fontSize: "24px",
                          lineHeight: "32px",
                          fontWeight: "bold",
                          letterSpacing: "-0.02em",
                          textAlign: "center",
                          color: "#111827",
                        }}
                      >
                        Verify your email address
                      </h1>
                      <p
                        style={{
                          margin: "0 0 24px 0",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#4b5563",
                          textAlign: "center",
                        }}
                      >
                        Thanks for signing up for TaskAI! Please click the
                        button below to verify your email address.
                      </p>
                      <p style={{ textAlign: "center", margin: "40px 0" }}>
                        <a
                          href={url}
                          style={{
                            display: "inline-block",
                            padding: "12px 24px",
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            textDecoration: "none",
                            borderRadius: "6px",
                            fontWeight: "500",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          Verify Email Address
                        </a>
                      </p>
                      <p
                        style={{
                          margin: "0 0 24px 0",
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#6b7280",
                          textAlign: "center",
                        }}
                      >
                        If the button doesn't work, copy and paste this link
                        into your browser:
                      </p>
                      <p
                        style={{
                          margin: "0 0 24px 0",
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#2563eb",
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        {url}
                      </p>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#6b7280",
                          textAlign: "center",
                          borderTop: "1px solid #e5e7eb",
                          paddingTop: "24px",
                        }}
                      >
                        If you didn't sign up for TaskAI, you can safely ignore
                        this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "24px 40px",
                  backgroundColor: "#f8fafc",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                <table
                  role="presentation"
                  style={{ width: "100%", border: "none", borderSpacing: 0 }}
                >
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#6b7280",
                        }}
                      >
                        TaskAI, Inc. &copy; 2024
                        <br />
                        Need help?{" "}
                        <a
                          href="mailto:support@taskai.com"
                          style={{ color: "#2563eb", textDecoration: "none" }}
                        >
                          Contact our support team
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
}
