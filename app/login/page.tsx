import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          CareGuardian
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Sign in
        </h1>

        <p className="mt-2 text-slate-600">
          Access the Patient Safety Intelligence Platform.
        </p>

        <LoginForm />
      </section>
    </main>
  );
}