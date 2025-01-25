import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const SelectAccountType = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [role, setRole] = useState("musician"); // default

    // Parse query params from the URL
    const query = new URLSearchParams(location.search);
    const email = query.get("email") || "";
    const name = query.get("name") || "";
    const provider = query.get("provider") || "";

    useEffect(() => {
        // In a real flow, you might want to validate these
        // or show them on the page. For now, we assume they're correct.
    }, [email, name, provider]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Call the same /signup endpoint you use for local registration
            // but typically you won't send a password if it's OAuth-based.
            // Adjust based on your backend's requirements.
            const response = await newRequest.post("/signup", {
                email: email,
                fullName: name,
                password: "", // or any placeholder if your backend doesn't need it
                accountType: role,
                provider: provider,
            });

            if (response.status === 200) {
                // Store token
                localStorage.setItem("token", response.data.token);

                // Example of storing user data
                const userData = {
                    id: response.data.id,
                    fullName: response.data.fullName,
                    email: response.data.email,
                    accountType: response.data.accountType,
                    profilePicture: response.data.profilePicture,
                    token: response.data.token,
                };
                localStorage.setItem("currentUser", JSON.stringify(userData));

                // Dispatch event if you use that pattern
                window.dispatchEvent(new CustomEvent("userDataUpdated", { detail: userData }));

                // Navigate to home (or wherever)
                navigate("/");
            }
        } catch (err) {
            console.error("Error completing signup:", err);
            setError("Failed to complete registration. Please try again.");
        }
    };

    return (
        <div className="select-account-type">
            <h1>Finalize Your Sign Up</h1>
            <p>Email: {email}</p>
            <p>Full Name: {name}</p>
            <p>Provider: {provider}</p>

            <div>
                <p>Select Account Type:</p>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="musician"
                        checked={role === "musician"}
                        onChange={() => setRole("musician")}
                    />
                    Musician
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="organizer"
                        checked={role === "organizer"}
                        onChange={() => setRole("organizer")}
                    />
                    Organizer
                </label>
            </div>

            <button onClick={handleSubmit}>Continue</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default SelectAccountType;
