"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createCourseOrderAction,
  verifyAndCompleteCoursePaymentAction,
} from "@/actions/payment";
import {
  ShieldCheck,
  Loader2,
  Sparkles,
  CheckCircle2,
  Calendar,
  CreditCard,
  QrCode,
  AlertCircle,
  X,
  Lock,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

import { useCurrency } from "@/context/CurrencyContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface SandboxOrderState {
  orderId: string;
  amount: number;
  currency: string;
  courseTitle: string;
  studentName: string;
  studentEmail: string;
}

export function RazorpayCheckoutButton({
  courseId,
  courseTitle,
  priceFormatted,
  priceMinorUnits,
  isAlreadyEnrolled = false,
}: {
  courseId: string;
  courseTitle: string;
  priceFormatted: string;
  priceMinorUnits?: number;
  isAlreadyEnrolled?: boolean;
}) {
  const router = useRouter();
  const { convertPrice, isInternational, currency } = useCurrency();
  const converted = priceMinorUnits ? convertPrice(priceMinorUnits) : null;
  const buttonPriceLabel = isInternational && converted
    ? `${converted.formatted} (~₹${(priceMinorUnits! / 100).toLocaleString("en-IN")})`
    : priceFormatted;
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sandbox simulation modal state when running without live Razorpay keys
  const [sandboxOrder, setSandboxOrder] = useState<SandboxOrderState | null>(null);
  const [isSimulatingVerification, setIsSimulatingVerification] = useState(false);

  if (isAlreadyEnrolled) {
    return (
      <div className="p-5 rounded-2xl bg-success-subtle border border-success/30 space-y-3">
        <div className="flex items-center gap-2 text-success font-bold text-sm">
          <CheckCircle2 className="w-5 h-5" />
          <span>You are actively enrolled in this course</span>
        </div>
        <p className="text-xs text-body leading-relaxed">
          All your curriculum lessons are scheduled and synchronized with your allotted faculty mentor. Access your timetable or join scheduled sessions straight from your portal.
        </p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          <Link
            href="/student/dashboard/calendar"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Open Student Calendar</span>
          </Link>
          <Link
            href="/student/dashboard/payments"
            className="px-4 py-2 rounded-xl bg-white border border-border-default text-heading text-xs font-bold hover:bg-neutral-50 transition-colors shadow-xs"
          >
            View Payment Receipts
          </Link>
        </div>
      </div>
    );
  }

  // Complete cryptographic payment verification and activation
  const handlePaymentVerification = async (
    orderId: string,
    paymentId: string,
    signature: string,
  ) => {
    setStatusMessage("Verifying cryptographic signature & provisioning enrollment...");
    try {
      const verifyRes = await verifyAndCompleteCoursePaymentAction({
        orderId,
        paymentId,
        signature,
        courseId,
      });

      if (!verifyRes.success) {
        setErrorMsg(verifyRes.error || "Payment verification failed. Please contact support.");
        setStatusMessage(null);
        return;
      }

      setSuccessMsg("Payment verified! Your syllabus has been scheduled and faculty assigned.");
      setStatusMessage(null);

      setTimeout(() => {
        router.push("/student/dashboard/calendar?enrolled=true");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "An unexpected error occurred during payment verification.");
      setStatusMessage(null);
    }
  };

  // Initiate Razorpay checkout order
  const handleCheckout = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setStatusMessage("Initializing secure order...");

    startTransition(async () => {
      try {
        const orderRes = await createCourseOrderAction(courseId);
        if (!orderRes.success || !orderRes.data) {
          setErrorMsg(orderRes.error || "Failed to initialize course purchase.");
          setStatusMessage(null);
          return;
        }

        const { orderId, amount, currency, keyId, student } = orderRes.data;

        // Check if running in Sandbox Simulation mode (placeholder credentials)
        const isMockMode =
          orderId.startsWith("order_test_") ||
          keyId === "rzp_test_placeholder";

        if (isMockMode) {
          setStatusMessage(null);
          setSandboxOrder({
            orderId,
            amount,
            currency,
            courseTitle,
            studentName: student.name || "Student",
            studentEmail: student.email || "student@example.com",
          });
          return;
        }

        // Live / Test Mode: Load Razorpay Standard Checkout SDK
        setStatusMessage("Opening Razorpay secure checkout...");
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          setErrorMsg("Could not load Razorpay payment gateway. Please check your internet connection.");
          setStatusMessage(null);
          return;
        }

        const options = {
          key: keyId,
          amount,
          currency,
          name: "Gandharva School of Music",
          description: `Enrollment: ${courseTitle}`,
          order_id: orderId,
          prefill: {
            name: student.name,
            email: student.email,
          },
          theme: {
            color: "#9810FA",
          },
          modal: {
            ondismiss: function () {
              setStatusMessage(null);
            },
          },
          handler: async function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            await handlePaymentVerification(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
            );
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response: any) {
          setErrorMsg(
            response.error?.description || "Payment was declined or cancelled by bank.",
          );
          setStatusMessage(null);
        });

        rzp.open();
        setStatusMessage(null);
      } catch (err: unknown) {
        const error = err as Error;
        setErrorMsg(error.message || "An unexpected error occurred during checkout initialization.");
        setStatusMessage(null);
      }
    });
  };

  // Sandbox simulation actions
  const handleSimulateSuccess = async () => {
    if (!sandboxOrder) return;
    setIsSimulatingVerification(true);
    const mockPaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const mockSignature = `mock_sig_${sandboxOrder.orderId}_${mockPaymentId}`;

    await handlePaymentVerification(sandboxOrder.orderId, mockPaymentId, mockSignature);
    setIsSimulatingVerification(false);
    setSandboxOrder(null);
  };

  const handleSimulateFailure = () => {
    setSandboxOrder(null);
    setErrorMsg("Simulated payment decline: Card was declined or transaction was cancelled.");
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Alerts */}
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-danger-muted border border-danger/25 text-xs text-danger-dark font-medium flex items-start gap-2.5 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-danger mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Payment Notification</p>
            <p className="mt-0.5">{errorMsg}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-body-muted hover:text-heading"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-success-subtle border border-success/30 text-xs text-success font-medium flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-success" />
          <div>
            <p className="font-bold">Purchase Successful!</p>
            <p className="text-[11px] opacity-90">{successMsg}</p>
          </div>
        </div>
      )}

      {/* Main Checkout Button */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isPending || isSimulatingVerification || !!successMsg}
        className="w-full py-4 px-6 rounded-2xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white font-bold text-base transition-all shadow-md shadow-cta/25 btn-tactile flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
      >
        {isPending || statusMessage ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{statusMessage || "Processing secure order..."}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Pay via Razorpay • {buttonPriceLabel}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </>
        )}
      </button>

      {/* Trust & Payment Method Badges */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-center gap-3 text-[11px] text-body-muted flex-wrap">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>256-bit SSL Encryption</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-accent" />
            <span>Razorpay Verified Gateway</span>
          </span>
          <span>•</span>
          <span>Instant Faculty Allotment</span>
        </div>

        {/* Payment Channels Pill Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-body font-medium">
          {isInternational ? (
            <>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent-subtle text-accent-dark font-bold border border-accent/30">
                🌐 International Cards Accepted (100+ Countries)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-alt/70 border border-border-subtle">
                <CreditCard className="w-3 h-3 text-cta" /> Visa, Mastercard, Amex
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-alt/70 border border-border-subtle">
                <QrCode className="w-3 h-3 text-primary" /> UPI (GPay, PhonePe, Paytm)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-alt/70 border border-border-subtle">
                <CreditCard className="w-3 h-3 text-cta" /> Debit & Credit Cards
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-alt/70 border border-border-subtle">
                NetBanking (50+ Banks)
              </span>
            </>
          )}
        </div>

        {isInternational && (
          <p className="text-[11px] text-center text-body-muted max-w-sm mx-auto leading-relaxed pt-1">
            International cards are automatically converted by your bank from {currency} to INR at official daily exchange rates.
          </p>
        )}
      </div>

      {/* Interactive Sandbox Test Simulation Modal */}
      {sandboxOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border border-border-default bg-white p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border-subtle pb-3">
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  <RefreshCw className="w-3 h-3 text-amber-600" />
                  Razorpay Sandbox Environment
                </div>
                <h3 className="font-serif text-lg font-bold text-heading">
                  Simulated Payment Checkout
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSandboxOrder(null)}
                className="p-1 rounded-lg text-body-muted hover:text-heading hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-2xl bg-bg-alt/50 border border-border-subtle space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-body">Course:</span>
                <span className="font-bold text-heading text-right truncate max-w-[200px]">
                  {sandboxOrder.courseTitle}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body">Student:</span>
                <span className="font-semibold text-heading">
                  {sandboxOrder.studentName} ({sandboxOrder.studentEmail})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body">Gateway Order ID:</span>
                <span className="font-mono text-[11px] text-primary font-semibold">
                  {sandboxOrder.orderId}
                </span>
              </div>
              <div className="pt-2 border-t border-border-subtle flex justify-between items-center">
                <span className="text-xs font-bold text-heading">Payable Amount:</span>
                <span className="font-serif text-base font-bold text-emerald-700">
                  ₹{(sandboxOrder.amount / 100).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-body leading-relaxed">
              This sandbox checkout tests the full end-to-end purchasing pipeline — including HMAC SHA256 cryptographic verification, atomic payment row locking, faculty scheduling, and calendar synchronization.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isSimulatingVerification}
                onClick={handleSimulateSuccess}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSimulatingVerification ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Cryptographic Signature...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Successful Payment (Test UPI / Card)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={isSimulatingVerification}
                onClick={handleSimulateFailure}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-border-default hover:bg-rose-50 text-rose-700 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
                <span>Simulate Payment Decline / Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
