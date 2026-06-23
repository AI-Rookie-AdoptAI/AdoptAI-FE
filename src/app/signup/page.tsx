import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = { title: "회원가입 — AdoptAI" };

export default function SignupPage() {
  return (
    <AuthLayout title="처음 오셨나요?" subtitle="계정을 만들고 입양 공고 작성을 시작하세요">
      <SignupForm />
    </AuthLayout>
  );
}
