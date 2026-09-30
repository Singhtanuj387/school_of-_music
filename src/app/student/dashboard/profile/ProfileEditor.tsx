"use client";

import { useState, useTransition } from "react";
import { updateProfileAction, changePasswordAction } from "@/actions/profile";
import { POPULAR_TIMEZONES } from "@/lib/timezone";
import { User, Lock, Bell, Check, Loader2, ShieldCheck } from "lucide-react";
import { AvatarUpload } from "@/components/profile/AvatarUpload";

export function ProfileEditor({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    timezone: string;
    emailVerified: boolean;
    image?: string | null;
  };
}) {
  const [name, setName] = useState(user.name);
  const [timezone, setTimezone] = useState(user.timezone || "UTC");

  const [isPendingProfile, startProfileTransition] = useTransition();
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPendingPassword, startPasswordTransition] = useTransition();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Notification toggles
  const [notifyBookings, setNotifyBookings] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(true);
  const [notifyCerts, setNotifyCerts] = useState(true);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(false);

    startProfileTransition(async () => {
      const res = await updateProfileAction({ name, timezone });
      if (res.success) {
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
      } else {
        setProfileError(res.error || "Failed to update profile.");
      }
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    startPasswordTransition(async () => {
      const res = await changePasswordAction({ currentPassword, newPassword });
      if (res.success) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(res.error || "Failed to change password.");
      }
    });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Profile Details Card */}
      <div className="p-6 rounded-3xl border border-border-default bg-white shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
          <div className="p-2 rounded-xl bg-accent-subtle text-accent-dark">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-heading">
              Personal Information
            </h2>
            <p className="text-xs text-body-muted">
              Manage your display name, email, and preferred local time calculation.
            </p>
          </div>
        </div>

        {/* Profile Avatar Upload Section */}
        <div className="pb-3 border-b border-border-subtle">
          <AvatarUpload currentImage={user.image} userName={name} />
        </div>

        {profileSuccess && (
          <div className="p-3 rounded-xl bg-success-muted border border-success/30 text-xs text-success font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-success" /> Profile updated successfully!
          </div>
        )}
        {profileError && (
          <div className="p-3 rounded-xl bg-danger-muted border border-danger/25 text-xs text-danger-dark font-medium">
            {profileError}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-heading mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-heading mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-alt/30 border border-border-subtle text-xs text-body-muted cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-heading mb-1">
              Timezone (used for all lesson countdowns and calendar slots)
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            >
              {POPULAR_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label} ({tz.value})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPendingProfile}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold transition-all shadow-sm shadow-primary/20 disabled:opacity-50 flex items-center gap-2 btn-tactile cursor-pointer"
            >
              {isPendingProfile && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Card */}
      <div className="p-6 rounded-3xl border border-border-default bg-white shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
          <div className="p-2 rounded-xl bg-primary-subtle text-primary">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-heading">
              Security & Password
            </h2>
            <p className="text-xs text-body-muted">
              Ensure your account is protected with a strong, unique password.
            </p>
          </div>
        </div>

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-success-muted border border-success/30 text-xs text-success font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-success" /> Password updated successfully!
          </div>
        )}
        {passwordError && (
          <div className="p-3 rounded-xl bg-danger-muted border border-danger/25 text-xs text-danger-dark font-medium">
            {passwordError}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-heading mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-heading mb-1">
                New Password (min. 8 characters)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-heading mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPendingPassword || !currentPassword || !newPassword}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold transition-all shadow-sm shadow-primary/20 disabled:opacity-50 flex items-center gap-2 btn-tactile cursor-pointer"
            >
              {isPendingPassword && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-3xl border border-border-default bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
          <div className="p-2 rounded-xl bg-bg-alt text-cta">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-heading">
              Notification Preferences
            </h2>
            <p className="text-xs text-body-muted">
              Control the transactional email updates you receive from the academy.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-bg-alt/25 border border-border-subtle cursor-pointer hover:bg-bg-alt/40 transition-colors">
            <div>
              <div className="text-xs font-bold text-heading">
                Lesson Booking Confirmations and Calendar Invites
              </div>
              <div className="text-[11px] text-body">
                Receive instant emails with calendar attachments when you reserve a slot.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyBookings}
              onChange={(e) => setNotifyBookings(e.target.checked)}
              className="w-4 h-4 accent-cta rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-bg-alt/25 border border-border-subtle cursor-pointer hover:bg-bg-alt/40 transition-colors">
            <div>
              <div className="text-xs font-bold text-heading">
                Lesson Countdown and Reminders
              </div>
              <div className="text-[11px] text-body">
                Get notified 24h and 1h before your live video session starts.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyReminders}
              onChange={(e) => setNotifyReminders(e.target.checked)}
              className="w-4 h-4 accent-cta rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-bg-alt/25 border border-border-subtle cursor-pointer hover:bg-bg-alt/40 transition-colors">
            <div>
              <div className="text-xs font-bold text-heading">
                Graduation Certificate Issuance
              </div>
              <div className="text-[11px] text-body">
                Receive celebratory notifications when an official diploma is issued.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyCerts}
              onChange={(e) => setNotifyCerts(e.target.checked)}
              className="w-4 h-4 accent-cta rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
