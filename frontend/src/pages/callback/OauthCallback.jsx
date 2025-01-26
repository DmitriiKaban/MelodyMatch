import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            const state = urlParams.get("state"); // Optional, in case you are handling state
            const provider = urlParams.get("provider"); // Optionally pass the provider in query params

            console.log("OAuth Code:", code);
            console.log("OAuth State:", state);
            console.log("OAuth Provider:", provider || "google"); // Default to Google if provider not passed

            if (code) {
                try {
                    const response = await fetch(
                        `http://localhost:8081/login/oauth2/${provider || "google"}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ code, state }),
                        }
                    );

                    if (!response.ok) {
                        const errorBody = await response.text();
                        console.error("Backend Error Response:", errorBody);
                        throw new Error(`Authentication failed: ${response.status}`);
                    }

                    const { token } = await response.json();
                    localStorage.setItem("authToken", token);

                    // Fetch and save user data
                    const userResponse = await fetch("http://localhost:8081/account/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!userResponse.ok) {
                        throw new Error("Failed to fetch user data.");
                    }

                    const userData = await userResponse.json();
                    localStorage.setItem("currentUser", JSON.stringify(userData));

                    // Dispatch event to notify other components
                    const event = new CustomEvent("userDataUpdated", { detail: userData });
                    window.dispatchEvent(event);

                    console.log("User data successfully fetched and saved:", userData);

                    // Redirect to the home page or dashboard
                    navigate("/");
                } catch (err) {
                    console.error("Error during OAuth callback:", err);
                    alert("Authentication failed. Please try again.");
                    navigate("/auth/login");
                }
            } else {
                console.warn("No authorization code found.");
                alert("No authorization code found. Redirecting to login.");
                navigate("/auth/login");
            }
        };

        handleOAuthCallback();
    }, [navigate]);

    return <p>Processing authentication...</p>;
};

export default OAuthCallback;
