"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/home");
    }
  }, [session?.status, router]);

  const socialAction = (action: string) => {
    signIn(action, { redirect: false }).then((callback) => {
      console.log(callback);
      if (callback?.error) {
        toast.error("Invalid credentials!");
      }

      if (callback?.ok) {
        router.push("/home");
      }
    });
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-4 shadow sm:rounded-lg sm:px-10">
        <div className="mt-6">
          <div className="mt-6 flex flex-col gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            {/* <AuthSocialButton
              icon={BsFacebook}
              onClick={() => socialAction("facebook")}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
