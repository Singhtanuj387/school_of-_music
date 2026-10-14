import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Gandharva School Of Music",
  description: "Read our Terms and Conditions to understand the rules, guidelines, and legal agreements for using our website and services. Stay informed and secure.",
  alternates: {
    canonical: "/policy/terms-conditions",
  },
};

function TCPage() {
  return (
    <div>
      <section className="bg-[url(/teach-us.webp)] w-full h-[50vh] md:h-[75vh] bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[67%]">
          <h1
            className="text-[26px] w-full  text-left md:text-[55px] text-white mb-6 mt-12 md:mt-28 "
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Terms & Conditions
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
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY USING THIS
            WEBSITE AND/OR OUR PLATFORM, YOU AGREE TO BE BOUND BY ALL OF THE
            TERMS AND CONDITIONS AND PRIVACY POLICY BELOW.
          </p>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Gandharva – School of Music (“Company,” “We,” and their equivalents)
            operates a website – (URL: https://www.gandharvaschoolofmusic.com)
            (collectively referred to as the “Platform”) which provides online
            tutoring services to users.
          </p>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            These terms and conditions (“Terms”) outline the conditions under
            which the Company grants end users access to the Platform (referred
            to as “Services”) and should be read alongside our privacy policy,
            available at https://www.gandharvaschoolofmusic.com/privacy-policy.
            Our Platform is designed for both teachers and users of all age
            groups interested in learning performing arts. Anyone under the age
            of 18 is considered a child (“Child”) and must have parental consent
            to use the Platform. Parents of the Child, or users above 18 years
            of age, are referred to as “You.” The term “Users,” for the purposes
            of these Terms, shall include You and/or the Child.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Terms of Service
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            By choosing to visit and/or use any Services provided by the
            Company, you agree to these Terms (as may be amended over time).
            Please read this information carefully. If you are a parent or
            guardian and provide consent for your child’s use of the Platform,
            you agree to be bound by these Terms in relation to their use. Your
            continued access or use of the Platform signifies your acceptance of
            these Terms. If you disagree with these Terms, please exit this page
            and discontinue access to the Services.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Description of Services
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            The Company provides online performing arts education services to
            interested users. We offer lessons on performing arts delivered by
            certified teachers, creating a virtual classroom environment where
            users can learn without restrictions on time or location.
          </p>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Users are expected to follow the Company’s curriculum and modules,
            with support from tutors provided by the Company. To access the
            Services, You or the Child may need to create an account and provide
            “Personal Information,” which may include, but is not limited to:
          </p>
          <ul
            className="list-disc list-inside mb-6 text-[16px]"
            style={{ fontWeight: 300 }}
          >
            <li>
              {" "}
              Name, email ID, photograph, location, and other contact
              information{" "}
            </li>
            <li>Gender and other demographics</li>
            <li>Birth date and year to verify the Child’s current age</li>
            <li>
              Email address of the Child’s parent or guardian to obtain parental
              consent.
            </li>
          </ul>{" "}
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            License to Use
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            The Company grants You and the Child a limited right to access,
            view, and use the Platform solely for the purposes of accessing,
            viewing, posting, or submitting user material, using embedded links,
            placing store orders, or accessing information, applications, and
            services. The Company reserves the right to suspend or deny, at its
            sole discretion, your access to all or any part of the Platform.
            This license is granted for personal and non-commercial uses only.
            Any rights not expressly granted are reserved by the Company.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Intellectual Property Rights
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            The Company retains all rights (including copyrights, trademarks,
            patents, designs, logos, trade dress, trade secrets, and any other
            intellectual property rights) to all information provided on or via
            the Platform, including but not limited to curriculum materials,
            texts, graphics, photos, illustrations, apps, and logos. You are not
            permitted to copy, download, publish, distribute, or reproduce any
            of the information on this Platform or its social media channels
            without prior written consent from the Company. Furthermore, if You
            record any virtual sessions with the Company, those recordings are
            strictly for personal use and must not be shared on social media or
            used for monetary gain. Violation of this policy may result in legal
            action by the Company.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Linking
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            You or the Child may establish links to other websites provided
            that:
          </p>
          <ol
            className="list-decimal list-inside space-y-4  text-[16px]"
            style={{ fontWeight: 300 }}
          >
            <li>
              The link is lawful and not damaging to the Company’s reputation or
              business.
            </li>

            <li>
              The link is not for advertising or promotional purposes (unless
              expressly approved by the Company).
            </li>

            <li>
              The link is not from any website that promotes political or
              religious views or content that depicts hatred, intolerance,
              discrimination, violence, pornography, or illegal activity.
            </li>

            <li>
              The link does not misrepresent or falsely imply that the Company
              endorses or is associated with the linked site, its content, or
              web pages.
            </li>

            <li>
              Framing of any part of this site is not allowed, and you must not
              provide access under any other URL.
            </li>
          </ol>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Payment and Refund
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Payments for services offered on the Platform are processed through
            third-party gateways like card payments, net banking, UPI, and
            wallet payments. Gandharva Learning is not liable for issues related
            to unauthorized use or refunds beyond services not rendered. Any
            refund is limited to the amount paid. Free trials offered may
            require registering a payment method for auto-renewal.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            User Content
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            You, or your child, may post content on the platform, such as
            reviews, comments, or suggestions. Gandharva Learning reserves the
            right to remove inappropriate content and takes no responsibility
            for user-provided content. If requested, content posted by minors
            may be deleted by the Company upon review. The company may use video
            or audio recordings of lectures for internal purposes, and users
            consent to their content being shared with third parties for
            evaluation purposes.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            User Communication
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            By using the Platform, you consent to receive communications from
            Gandharva Learnings via email, WhatsApp, phone, or text for services
            updates.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Rules of Conduct
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Users are required to comply with local laws when accessing the
            Platform. Unauthorized tampering with the Service, including hacking
            or illegal distribution of content, is prohibited. Users must avoid
            spamming, creating derivative software, or making commercial use of
            the Service without prior permission.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Limited Liability
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            You are responsible for any violations of third-party rights and
            agree to reimburse Gandharva Learning for damages. The Company does
            not guarantee the accuracy or quality of tutor-provided lessons or
            conduct, and is not liable for any unethical or illegal actions
            taken by users. In the event of inappropriate behavior by tutors,
            users should inform the Company, which will take appropriate legal
            action.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Third-Party Permission
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Users agree that third-party service providers affiliated with
            Gandharva Learnings can use their information, including making cold
            calls, even if the user has activated the ‘Do Not Disturb’ feature
            on their phone. Any disputes with these third parties are solely the
            user’s responsibility, and Gandharva Learnings is not liable for
            such issues.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Amendments to Terms
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Gandharva Learnings reserves the right to modify these Terms for
            various reasons, including legal changes, market conditions,
            technical necessities, or user benefits. Users will be notified of
            such amendments, but no changes will be made that would
            significantly disrupt the balance between the Company and its users.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Termination
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            The Company may suspend or terminate a user’s access to the Service
            at its discretion if there is a breach of the Terms. Users can also
            terminate their agreement by ceasing to use the Service and deleting
            related copies. Any accrued rights up to termination will still
            apply.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Indemnity
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Users agree to indemnify the Company, its contractors, licensors,
            and employees against any claims or expenses arising from the use of
            the Platform, including violations of these Terms.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Severability
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            If any part of these Terms is found to be invalid or unenforceable
            by a court, it will be deemed removed, but the remainder of the
            Terms will remain valid.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Assignment
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Users cannot transfer or assign their rights under these Terms, but
            the Company may assign its rights freely.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Waiver
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            Failure to enforce any part of these Terms does not mean that the
            Company waives its right to do so in the future.
          </p>
          <h2
            className="text-[25px] md:text-[30px] mb-6 text-[#1a0840]"
            style={{ fontWeight: 600 }}
          >
            Governing Laws
          </h2>
          <p className="mb-6 text-[16px]" style={{ fontWeight: 300 }}>
            These Terms are governed by Indian law, and any disputes that arise
            between conflicting laws of the user’s country and Indian laws will
            be resolved in favor of Indian laws.
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

export default TCPage;
