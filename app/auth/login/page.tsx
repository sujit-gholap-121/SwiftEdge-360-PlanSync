import LoginButton from "@/app/components/LoginButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginButton />
      </div>
    </div>
  );
}
