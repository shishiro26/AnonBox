import { LoginForm } from "@/components/shared/auth/login-form";

export const generateMetadata = () => {
  return {
    title: "Login | AnonBox",
    description: "Login to AnonBox",
  };
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
