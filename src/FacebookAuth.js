import React, { useEffect } from "react";

const FACEBOOK_APP_ID = "585663833820989"; // Replace with your Facebook App ID
const FacebookLoginButton = () => {

  useEffect(() => {
    // Asynchronously load Facebook SDK
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        // Initialize the SDK
        window.FB.init({
          appId: FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v12.0", // Replace with the latest Facebook API version
        });

        // Optional: Log page views to Facebook analytics
        window.FB.AppEvents.logPageView();
      };

      // Load the Facebook SDK script
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    loadFacebookSDK();
  }, []);

  const handleFacebookLogin = () => {
    // Ensure window.FB.init() has been called before calling window.FB.login()
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Facebook login successful", response);
          const accessToken = response.authResponse.accessToken;
          
          // You can now send the token to your backend to authenticate the user
          fetch("http://127.0.0.1:8000/api/auth/social_auth/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              provider: "facebook",
              access_token: accessToken,
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
        } else {
          console.log("Facebook login failed", response);
        }
      },
      { scope: "public_profile,email" } // Optional: request additional permissions
    );
  };

  return (
    <div>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLoginButton;
