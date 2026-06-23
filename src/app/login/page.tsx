import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "로그인 — AdoptAI" };

export default function LoginPage() {
  return (
    <AuthLayout title="다시 오셨군요!" subtitle="이메일과 비밀번호로 로그인해 주세요">
      <LoginForm />
    </AuthLayout>
  );
}
