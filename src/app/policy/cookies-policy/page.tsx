import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cookies Policy | Gandharva School Of Music",
  description: "Cookies Policy of Gandharva School Of Music",
  alternates: {
    canonical: "/policy/cookies-policy",
  },
};

function CookiesPolicy() {
  return (
    <div>
      {/* Hero Section */}
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
            Cookies Policy
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
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Cookies Policy
          </h1>
          <p className="mb-6" style={{ fontWeight: 300 }}>
            Cookies are small text files that store information on web browsers.
            They help us manage and receive identifiers and other data on
            devices like computers and smartphones. Other technologies, such as
            data stored in your browser or device and associated identifiers,
            serve similar purposes. For the sake of this policy, we collectively
            refer to these technologies as “cookies.”
          </p>
          <p className="mb-6" style={{ fontWeight: 300 }}>
            We utilize cookies when you have a Gandharva account, access
            Gandharva Services (including our website and apps), or visit other
            sites and apps that employ Gandharva Services. Cookies enable us to
            provide and improve our services and to better understand your
            interactions with us, including usage patterns across different
            websites and applications, regardless of whether you are logged in
            or registered. This policy outlines our use of cookies and your
            options regarding them. Unless specified otherwise, our Data Policy
            governs our data processing related to cookies.
          </p>

          <h2
            className="text-[25px] md:text-[30px]  mt-8 mb-4 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Why Do We Use Cookies?
          </h2>
          <p className="mb-6" style={{ fontWeight: 300 }}>
            Cookies enhance our ability to deliver, protect, and improve
            Gandharva Services. They allow us to personalize content, tailor and
            measure advertisements, and create a safer online experience. While
            the types of cookies we use may evolve over time, our purposes for
            using them generally include:
          </p>

          <ol
            className="list-decimal list-inside space-y-4"
            style={{ fontWeight: 300 }}
          >
            <li>
              <strong style={{ fontWeight: 600 }}>Authentication:</strong> We
              employ cookies to verify your account and to recognize when
              you&apos;re logged in, simplifying your access to Gandharva
              Services. For instance, cookies allow you to remain logged in as
              you navigate between different Gandharva pages, and they help us
              remember your browser settings for easier login, even via
              third-party applications.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>
                Security and Integrity:
              </strong>{" "}
              Cookies help us safeguard your account, data, and the Gandharva
              Services. They enable us to detect unauthorized access attempts
              and enforce additional security measures when necessary. Cookies
              are also instrumental in recovering your account if you forget
              your password and in preventing underage registrations.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>
                Advertising and Insights:
              </strong>{" "}
              Cookies assist us in displaying ads and making recommendations
              based on your interests. They help deliver targeted ads to users
              who have visited specific websites or used certain services, while
              also allowing us to manage ad frequency to ensure you don’t see
              the same advertisement repeatedly.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>Site Functionality:</strong>{" "}
              Cookies enable essential features that enhance your experience on
              Gandharva Services. They store user preferences, help us recognize
              when you&apos;ve interacted with specific content, and allow us to
              deliver customized experiences based on your activity.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>
                Performance Monitoring:
              </strong>{" "}
              We use cookies to optimize your experience. They help us
              understand how traffic flows between servers, the loading speed of
              Gandharva Services for different users, and ensure that our sites
              render correctly on various devices.
            </li>

            <li>
              <strong style={{ fontWeight: 600 }}>
                Analytics and Research:
              </strong>{" "}
              Cookies enable us to gain insights into user behavior on Gandharva
              Services, helping us identify which features are most engaging and
              uncover areas for improvement.
            </li>
          </ol>

          <h2
            className="text-[25px] md:text-[30px] mt-8 mb-4 text-[#1c043d]"
            style={{ fontWeight: 600 }}
          >
            Where Do We Use Cookies?
          </h2>
          <p className="mb-6" style={{ fontWeight: 300 }}>
            Cookies may be placed on your device when you use or visit:
          </p>

          <ul
            className="list-disc list-inside mb-6"
            style={{ fontWeight: 300 }}
          >
            <li>The Gandharva Services</li>
            <li>
              Services offered by other members of the Gandharva Companies
            </li>
            <li>
              Websites and apps provided by other organizations that utilize the
              Gandharva Services, including those that integrate Gandharva
              technologies
            </li>
          </ul>

          <p className="mb-6" style={{ fontWeight: 300 }}>
            Gandharva employs cookies and collects data when you access those
            sites and applications, regardless of whether you have a Gandharva
            account or are logged in.
          </p>

          <h2
            className="text-[25px] md:text-[30px] mt-8 mb-4 text-[#1c043d]"
            style={{ fontWeight: 600 }}
          >
            Third-Party Cookies
          </h2>
          <p className="mb-6" style={{ fontWeight: 300 }}>
            Other parties may also use cookies in conjunction with Gandharva
            Services to provide us with services and to support businesses that
            advertise on Gandharva. For instance, measurement partners might use
            cookies to help advertisers assess the effectiveness of their
            campaigns. To understand how third parties utilize cookies, please
            refer to their individual policies.
          </p>

          <h2
            className="text-[25px] md:text-[30px]  mt-8 mb-4 text-[#1c043d]"
            style={{ fontWeight: 600 }}
          >
            Managing Cookies
          </h2>
          <p style={{ fontWeight: 300 }}>
            If you have a Gandharva account, you can manage your cookie
            preferences through your settings. Additionally, your browser or
            device may provide options to control cookie usage and to delete
            them as needed. Keep in mind that certain functionalities of
            Gandharva Services may be impaired if cookies are disabled.
          </p>
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

export default CookiesPolicy;
