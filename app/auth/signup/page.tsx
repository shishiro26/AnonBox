import RegisterForm from "@/components/shared/auth/register-form";
import React from "react";

export const generateMetadata = () => {
  return {
    title: "Signup | AnonBox",
    description: "Signup to AnonBox",
  };
};

const page = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default page;
