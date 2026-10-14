import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Refund Policy | Gandharva School Of Music",
  description:
    "At Gandharva School of Music, we offer a 100% refund for unused classes or credits. Refunds are processed within 3 business days (India) or 7–10 days (International).",
  alternates: {
    canonical: "/policy/refund-policy",
  },
};

function RefundPolicy() {
  return (
    <div>
      <section className="bg-[url(/teach-us.webp)] w-full h-[50vh] md:h-[75vh] bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[67%]">
          <h1
            className="text-[26px] w-full md:w-2/3 text-left md:text-[55px] text-white mb-6 mt-12 md:mt-28 "
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Refund Policy
          </h1>
          <div className="mt-8">
            <span
              className="text-[16px] md:text-[17px] text-white"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Your Satisfaction is Important To Us…
            </span>
          </div>
        </div>
      </section>
      <section className="md:px-[10%] py-5 md:p-[10%] px-3">
        <div className="mx-auto" style={{ fontFamily: "var(--font-dm-sans)" }}>
          <h1
            className="text-[25px] md:text-[30px] mb-6"
            style={{ fontWeight: 600 }}
          >
            Refund Policy
          </h1>

          <p className="mb-4" style={{ fontWeight: 300 }}>
            We sincerely appreciate your purchase with us and are dedicated to
            providing an exceptional learning experience through innovative
            techniques. If, at any time, you feel that your experience does not
            meet your expectations, please reach out to us at{" "}
            <a
              href="mailto:refund@gandharvaschoolofmusic.com"
              className="text-blue-600 underline"
            >
              refund@gandharvaschoolofmusic.com
            </a>
            .
          </p>

          <p className="mb-4" style={{ fontWeight: 300 }}>
            Upon receiving a refund request, we will conduct a thorough
            investigation into your concerns. We are committed to understanding
            the issues raised by both students and their parents or guardians,
            and we will make every effort to mediate before processing a refund
            based on a pro-rata calculation.
          </p>

          <p className="mb-4" style={{ fontWeight: 300 }}>
            Please carefully review this policy, as it outlines important
            information regarding your rights and obligations concerning any
            purchases made through our platform. The refund process will adhere
            to the following guidelines:
          </p>

          <ol
            className="list-decimal pl-6 mb-4 space-y-4"
            style={{ fontWeight: 300 }}
          >
            <li>
              <strong style={{ fontWeight: 600 }}>Refund Eligibility:</strong>{" "}
              We offer a 100% refund for any unused class credits. All refund
              requests will be processed promptly.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>Processing Charges:</strong> A
              5% Bank Refund Processing Charge (subject to change based on
              payment methods) will be deducted from the refundable amount.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>Pro-rata Calculation:</strong>{" "}
              Refunds will be calculated on a pro-rata basis, considering the
              total number of classes attended from the payment date to the date
              of the refund request, relative to the total number of classes
              purchased.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>Exclusions:</strong> This
              refund policy only applies to paid class credits. It does not
              cover class credits earned through referrals or those gifted by
              Gandharva.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>Refund Method:</strong> All
              refunds will be processed back to the original payment source. In
              case of discrepancies, we may issue the refund via PayPal or bank
              transfer as per the user’s preference.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>Processing Time:</strong>{" "}
              Refund requests will be acted upon immediately, and refunds will
              be credited within 5 business days for customers in India, and
              within 10-15 business days for international customers.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>Liability:</strong> Gandharva
              School of Music is not responsible for any delays in the refund
              process arising from circumstances beyond our control, such as
              banking or payment gateway delays. Students or parents shall not
              claim any interest, penalties, or compensation for such delays.
            </li>

            <li>
              To claim a refund,{" "}
              <a
                href="http://wa.me/918092621301"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                WhatsApp us
              </a>{" "}
              or email us at{" "}
              <a
                href="mailto:info@gandharvaschoolofmusic.com"
                className="text-blue-600 underline"
              >
                info@gandharvaschoolofmusic.com
              </a>
              .
            </li>

            <li style={{ fontWeight: 300 }}>
              All refunds will be processed in 3 business days.
            </li>
          </ol>
        </div>
      </section>
      <div>
        <p
          className="bg-[#FF9E00]  py-5 rounded-lg text-white text-[19px] md:text-[24px] text-center "
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
        >
          24/7 Dedicated Customer Support
        </p>
      </div>
    </div>
  );
}

export default RefundPolicy;
