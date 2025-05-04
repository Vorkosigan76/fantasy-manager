import { signIn, signUp } from "@/actions/authentication";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  async function signInClickHandler() {
    "use server";
    try {
      await signIn();
    } catch (error) {
      console.error("Sign In Error:", error);
    }
  }
  async function signUpClickHandler() {
    "use server";
    try {
      await signUp();
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {!session ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-2">Not Authenticated</h1>
          <button onClick={signInClickHandler}>Sign In</button>
          <button onClick={signUpClickHandler}>Sign Up</button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1>Welcome, {session.user.name}</h1>
          <p>Email: {session.user.email}</p>
        </div>
      )}
    </div>
  );
}
