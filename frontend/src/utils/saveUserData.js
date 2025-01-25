export const saveUserData = (data) => {
    const userData = {
      fullName: data.userDetails.fullName,
      email: data.userDetails.email,
      accountType: data.userDetails.accountType,
      profilePicture: data.userDetails.profilePicture,
      token: data.token,
      expiresIn: data.expiresIn,
      userRole: data.userDetails.userRole,
      createdAt: data.userDetails.createdAt,
      updatedAt: data.userDetails.updatedAt,
      authProvider: data.userDetails.authProvider,
    };
  
    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  
    const mfaStates = JSON.parse(localStorage.getItem("mfaStates")) || {};
    mfaStates[userData.email] = true; 
    localStorage.setItem("mfaStates", JSON.stringify(mfaStates));
  
    window.dispatchEvent(
      new CustomEvent("userDataUpdated", {
        detail: userData,
      })
    );
    console.log("Saving user data to localStorage:", userData);

  };
  