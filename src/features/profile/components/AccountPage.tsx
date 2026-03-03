import Link from "next/link";
import { BiChevronRight, BiUser, BiMapPin, BiPhone, BiEnvelope } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import type { UserProfile } from "../types/ProfileTypes";

function Field({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | null | undefined;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const display = value?.trim() || "—";
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-500 min-w-28 flex items-center gap-2">
        <Icon className="w-4 h-4 text-orange-500" />
        {label}
      </span>
      <span className="text-gray-800">{display}</span>
    </div>
  );
}

interface AccountPageProps {
  profile: UserProfile | null;
}

export default function AccountPage({ profile }: AccountPageProps) {
  if (!profile) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className=" container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-sm text-center">
            <p className="text-gray-600 mb-4">You need to sign in to view your account.</p>
            <Link
              href="/login"
              className="inline-block text-orange-600 hover:text-orange-700 font-medium"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <BiChevronRight className="w-4 h-4" />
          <span className="text-gray-700">Account</span>
        </div>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-400">My Account</h1>
          <p className="text-gray-600 mt-1">View and manage your profile</p>
        </div>

        {/* Profile Info */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-5 py-4 sm:px-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Profile Info</h2>
            <p className="text-sm text-gray-500 mt-0.5">Your basic information</p>
          </div>
          <div className="px-5 py-4 sm:px-6">
            <Field label="Name" value={profile.name} icon={BiUser} />
            <Field label="Role" value={profile.role} icon={BiUser} />
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-5 py-4 sm:px-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <p className="text-sm text-gray-500 mt-0.5">Your shipping and contact address</p>
          </div>
          <div className="px-5 py-4 sm:px-6">
            <Field label="Name" value={profile.name} icon={BiUser} />
            <Field label="Email" value={profile.email ?? undefined} icon={BiEnvelope} />
            <Field label="Phone" value={profile.phone ?? undefined} icon={BiPhone} />
            <Field label="Address" value={profile.address ?? undefined} icon={BiMapPin} />
            <Field label="City" value={profile.city ?? undefined} icon={BiMapPin} />
            <Field label="Country" value={profile.country ?? undefined} icon={BiMapPin} />
          </div>
        </div>

        {/* Placeholder for future edit – no layout or styling change */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 sm:px-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
            <p className="text-sm text-gray-500 mt-0.5">Update your information</p>
          </div>
          <div className="px-5 py-6 sm:px-6 flex items-center gap-3">
            <BsPencilSquare className="w-5 h-5 text-gray-400" />
            <p className="text-sm text-gray-500">Edit functionality will be available here.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
