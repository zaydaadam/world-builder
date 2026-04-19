export async function logout(router) {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
  } catch (error) {
    console.log("Logout error: test run", error);
  }

  localStorage.removeItem("user");
  router.push("/");
}
