import React, { useEffect } from "react";

const GoogleLoginButton = () => {
  const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Replace with your Google Client ID
  
  useEffect(() => {
    // Load the Google Sign-In library
    console.log(process.env);
    console.log("REACT_APP_GOOGLE_CLIENT_ID ===>", REACT_APP_GOOGLE_CLIENT_ID);
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        /* Initialize Google Sign-In */
        window.google?.accounts.id.initialize({
          client_id: REACT_APP_GOOGLE_CLIENT_ID,
          callback: onGoogleSignIn,
        });

        /* Render the button */
        window.google?.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline", // Button style: "outline" or "filled"
            size: "large",    // Button size: "small", "medium", or "large"
          }
        );
      };
    };

    loadGoogleScript();
  }, []);

  const onGoogleSignIn = (response) => {
    const idToken = response.credential; // This is the Google ID token
    console.log("Google ID Token:", idToken);

    // Send the token to your backend for validation
    fetch("http://127.0.0.1:8000/api/accounts/v1/auth/social_auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider: "google",
        access_token: idToken, // Token sent to backend
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login Successful:", data);
        // Handle successful login, e.g., save tokens in local storage
      })
      .catch((error) => {
        console.error("Login Failed:", error);
      });
  };

  return (
    <div>
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleLoginButton;
