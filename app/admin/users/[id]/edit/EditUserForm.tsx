"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type EditableUser = {
  id: number;
  name: string;
  email: string;
  role:
    | "ADMIN"
    | "DISCHARGE_COORDINATOR"
    | "NURSE"
    | "PATIENT_SAFETY_OFFICER";
  isActive: boolean;
};

type EditUserFormProps = {
  user: EditableUser;
};

export default function EditUserForm({
  user,
}: EditUserFormProps) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(user.isActive);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
          isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Failed to update user.");
        return;
      }

      toast.success("User updated successfully.");
      router.push("/admin/users");
      router.refresh();
    } catch {
      toast.error("Something went wrong while updating the user.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl bg-brand-navy px-8 py-10 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Edit User
          </h1>

          <p className="mt-3 text-white/75">
            Update the staff member&apos;s account information and CareGuardian
            access role.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border bg-surface p-8 shadow-sm"
        >
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-brand-navy"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy outline-none transition focus:border-brand-teal"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-brand-navy"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy outline-none transition focus:border-brand-teal"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="role"
              className="text-sm font-semibold text-brand-navy"
            >
              Role
            </label>

            <select
              id="role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as EditableUser["role"])
              }
              className="mt-2 w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy outline-none transition focus:border-brand-teal"
            >
              <option value="ADMIN">Administrator</option>

              <option value="DISCHARGE_COORDINATOR">
                Discharge Coordinator
              </option>

              <option value="NURSE">
                Nurse
              </option>

              <option value="PATIENT_SAFETY_OFFICER">
                Patient Safety Officer
              </option>
            </select>
          </div>
          <div className="mt-6">
  <label
    htmlFor="isActive"
    className="text-sm font-semibold text-brand-navy"
  >
    Account Status
  </label>

  <select
    id="isActive"
    value={isActive ? "ACTIVE" : "INACTIVE"}
    onChange={(event) =>
      setIsActive(event.target.value === "ACTIVE")
    }
    className="mt-2 w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy outline-none transition focus:border-brand-teal"
  >
    <option value="ACTIVE">Active</option>
    <option value="INACTIVE">Inactive</option>
  </select>

  <p className="mt-2 text-sm text-text-muted">
    Inactive users cannot sign in to CareGuardian.
  </p>
</div>

          <div className="mt-6">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-brand-navy"
            >
              New Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              className="mt-2 w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy outline-none transition focus:border-brand-teal"
            />

            <p className="mt-2 text-sm text-text-muted">
              Leave blank to keep the current password. New passwords must be
              at least 8 characters.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-brand-teal px-5 py-3 font-semibold text-white transition hover:bg-brand-teal-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/users")}
              className="rounded-lg border border-border-strong px-5 py-3 font-semibold text-brand-navy transition hover:bg-surface-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}