"use client";
import Modal from "@/components/Modal";
import { countryOptions } from "@/Data/CountryCode";
import React, { useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

function JobApplication() {
  // Define the type for formData
  type FormData = {
    name: string;
    phone: string;
    mail: string;
    gender: string;
    qualification: string;
    experience: string;
    english: string;
    certificate: string[]; // Explicitly define as string[]
    setup: string;
  };

  const initialState = {
    name: "",
    phone: "",
    mail: "",
    gender: "",
    qualification: "",
    experience: "",
    english: "",
    certificate: [], // Initialize as an empty array of strings
    setup: "",
  };

  // Use the defined type for formData
  const [formData, setFormData] = useState<FormData>(initialState);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [warning, setWarning] = useState({
    name: false,
    phone: false,
    mail: false,
    gender: false,
    qualification: false,
    english: false,
    experience: false,
  });

  type CountryOption = { value: string; label: string };
  const handleCountryChange = (selectedOption: CountryOption | null) => {
    if (selectedOption) {
      setCountryCode(selectedOption.value);
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const qualificationOptions = [
    { value: "highschool", label: "High School" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
  ];

  const experienceOptions = [
    { value: "0-1", label: "0-1 years" },
    { value: "2-3", label: "2-3 years" },
    { value: "4-5", label: "4-5 years" },
    { value: "5+", label: "5+ years" },
  ];

  const englishProficiencyOptions = [
    { value: "basic", label: "Basic" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "native", label: "Native" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  interface OptionType {
    value: string;
    label: string;
  }

  const handleSelectChange = (
    selectedOption: SingleValue<OptionType>,
    action: ActionMeta<OptionType>
  ) => {
    if (!selectedOption || !action.name) return; // Ensure `action.name` exists

    setFormData((prev) => ({
      ...prev,
      [action.name as string]: selectedOption.value, // Explicitly cast as string
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Form Data Submitted:", formData);
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const userIP = ipData.ip;
    const data = {
      name: formData.name,
      phone: `${countryCode}-${formData.phone}`,
      mail: formData.mail,
      gender: formData.gender,
      qualification: formData.qualification,
      experience: formData.experience,
      english: formData.english,
      certificate: formData.certificate.join(", "), // Initialize as an empty array of strings
      setup: formData.setup,
      activeSheet: "Job_Application",
      userIP,
    };

    const localWarning = {
      name: false,
      phone: false,
      mail: false,
      gender: false,
      qualification: false,
      english: false,
      experience: false,
    };
    let hasAwarning = false;
    if (data.name === initialState.name) {
      hasAwarning = true;
      localWarning.name = true;
    }
    if (data.phone === initialState.phone) {
      hasAwarning = true;
      localWarning.phone = true;
    }
    if (data.mail === initialState.mail) {
      hasAwarning = true;
      localWarning.mail = true;
    }
    if (data.gender === initialState.gender) {
      hasAwarning = true;
      localWarning.gender = true;
    }
    if (data.qualification === initialState.qualification) {
      hasAwarning = true;
      localWarning.qualification = true;
    }
    if (data.english === initialState.english) {
      hasAwarning = true;
      localWarning.english = true;
    }
    if (data.experience === initialState.experience) {
      hasAwarning = true;
      localWarning.experience = true;
    }

    if (hasAwarning) {
      setWarning((prev) => ({ ...prev, ...localWarning }));
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbySJzE7ICyLe7PubP04AOdVRKpCt9DeqV6v3xeelfjvMRf95KIwIqBsUCvTw1_4yeWyCw/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
          body: JSON.stringify(data),
        }
      );

      //  const result = await response.json();
      //console.log(result);
      if (response.ok) {
        setFormData({
          name: "",
          phone: "",
          mail: "",
          gender: "",
          qualification: "",
          experience: "",
          english: "",
          certificate: [],
          setup: "",
        });
        setWarning({
          name: false,
          phone: false,
          mail: false,
          gender: false,
          qualification: false,
          english: false,
          experience: false,
        });
        setModalMessage("Your application has been submitted successfully!");
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalMessage("Error during form submission. Please try again.");
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <section className="bg-gradient-to-r from-[#3C096C] to-[#7507BF] w-full h-[50vh] md:h-[60vh] bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[67%]">
          <h1
            className="text-[32px] w-full text-left md:text-[48px] text-white mb-6 mt-12 md:mt-28"
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Job Application
          </h1>
        </div>
      </section>

      <section
        className="px-4 md:px-[10%] py-10"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        <h2
          className="text-[20px] md:text-[30px] text-[#7A7A7A] "
          style={{ fontWeight: 600 }}
        >
          You Are Applying For
        </h2>
        <h2
          className="text-[28px] md:text-[48px] text-[#1A022D] mt-2"
          style={{
            fontFamily: "var(--font-vidaloka)",
            fontWeight: 500,
          }}
        >
          Gandharva&apos;s Online Teacher
        </h2>
        <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Personal Information */}
          <div>
            <h3
              className="text-[20px] md:text-[24px] text-[#19022C] mb-4"
              style={{ fontWeight: 500 }}
            >
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* name  */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[16px] font-medium text-[#19022C] mb-1"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="border border-gray-300 rounded-sm p-2 w-full focus:outline-none focus:ring-orange-500 focus:ring-2"
                />
                {warning.name && (
                  <WarningMsg message="This field is required" />
                )}
              </div>

              {/* phone  */}
              <div className="mb-4 sm:mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number*{" "}
                    <span className="text-sm text-gray-500">
                      (with country code)
                    </span>
                  </label>
                  <div className="flex flex-row items-center border border-gray-300 rounded-md focus-within:ring-purple-500 focus-within:ring-2 transition-all duration-300">
                    <div className="relative w-auto">
                      <Select
                        id="countryCode"
                        name="countryCode"
                        options={countryOptions}
                        onChange={handleCountryChange}
                        placeholder="Select"
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: "none",
                            boxShadow: "none",
                            padding: "0",
                            minWidth: "120px",
                            cursor: "pointer",
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            padding: "0",
                            justifyContent: "center",
                          }),
                          dropdownIndicator: (base, state) => ({
                            ...base,
                            transform: state.selectProps.menuIsOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.2s",
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 10,
                            width: "auto",
                          }),
                        }}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        getOptionLabel={(e) => `${e.label}`}
                      />
                    </div>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      placeholder="Enter your Number"
                      className="flex-1 p-2 focus:outline-none"
                    />
                  </div>
                </div>
                {warning.phone && (
                  <WarningMsg message="This field is required" />
                )}
              </div>

              {/* email  */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[16px] font-medium text-[#19022C] mb-1"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="border border-gray-300 rounded-sm p-2 w-full focus:outline-none focus:ring-orange-500 focus:ring-2"
                />
                {warning.mail && (
                  <WarningMsg message="This field is required" />
                )}
              </div>

              {/* gender  */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-[16px] font-medium text-[#19022C] mb-1"
                >
                  Select Gender*
                </label>
                <div className="flex items-center focus-within:ring-orange-500 focus-within:ring-2 transition-all duration-300 rounded-md w-full h-fit overflow-visible border border-gray-300">
                  <Select
                    name="gender"
                    id="gender"
                    options={genderOptions}
                    onChange={handleSelectChange}
                    placeholder="Choose One"
                    className="w-full h-full rounded-md"
                    styles={{
                      control: (base) => ({
                        ...base,
                        boxShadow: "none",
                        "&:hover": { borderColor: "#e26200" },
                      }),
                    }}
                  />
                </div>
                {warning.gender && (
                  <WarningMsg message="This field is required" />
                )}
              </div>
            </div>
          </div>

          {/* Qualification & Experience */}
          <div>
            <h4
              className="text-[20px] md:text-[24px] text-[#19022C] mb-4"
              style={{ fontWeight: 500 }}
            >
              Qualification & Experience
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="qualification"
                  className="block text-[16px] font-medium text-[#19022C] mb-1"
                >
                  Highest level of qualification*
                </label>
                <div className="flex items-center focus-within:ring-orange-500 focus-within:ring-2 transition-all duration-300 rounded-md w-full h-fit overflow-visible border border-gray-300">
                  <Select
                    name="qualification"
                    options={qualificationOptions}
                    onChange={handleSelectChange}
                    placeholder="Select"
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        boxShadow: "none",
                        "&:hover": { borderColor: "#e26200" },
                      }),
                    }}
                  />
                </div>
                {warning.qualification && (
                  <WarningMsg message="This field is required" />
                )}
              </div>

              <div>
                <label
                  htmlFor="english"
                  className="block text-[16px] font-medium text-[#19022C] mb-1"
                >
                  Please rate your English proficiency*
                </label>
                <div className="flex items-center focus-within:ring-orange-500 focus-within:ring-2 transition-all duration-300 rounded-md w-full h-fit overflow-visible border border-gray-300">
                  <Select
                    name="english"
                    options={englishProficiencyOptions}
                    onChange={handleSelectChange}
                    placeholder="Select"
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        boxShadow: "none",
                        "&:hover": { borderColor: "#e26200" },
                      }),
                    }}
                  />
                </div>
                {warning.english && (
                  <WarningMsg message="This field is required" />
                )}
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="block text-[16px] font-medium text-[#19022C] mb-1"
                >
                  Year of experience in teaching*
                </label>
                <div className="flex items-center focus-within:ring-orange-500 focus-within:ring-2 transition-all duration-300 rounded-md w-full h-fit overflow-visible border border-gray-300">
                  <Select
                    name="experience"
                    options={experienceOptions}
                    onChange={handleSelectChange}
                    placeholder="Select"
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        boxShadow: "none",
                        "&:hover": { borderColor: "#e26200" },
                      }),
                    }}
                  />
                </div>
                {warning.experience && (
                  <WarningMsg message="This field is required" />
                )}
              </div>
            </div>
          </div>

          {/* Music Certification */}
          <div>
            <h4
              className="text-[20px] md:text-[24px] text-[#19022C] mb-4"
              style={{ fontWeight: 500 }}
            >
              Do You Have Any Music Certification
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Rockschool", "Trinity", "LCME", "ABRSM", "Others"].map(
                (certification) => (
                  <label key={certification} className="flex items-center">
                    <input
                      type="checkbox"
                      name="certificate"
                      value={certification}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          certificate: prev.certificate.includes(value)
                            ? prev.certificate.filter((item) => item !== value)
                            : [...prev.certificate, value],
                        }));
                      }}
                      className="mr-2 focus:ring-orange-500 text-orange-500"
                    />
                    {certification}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Home Setup */}
          <div>
            <h4
              className="text-[20px] md:text-[24px] text-[#19022C] mb-4"
              style={{ fontWeight: 500 }}
            >
              Home Setup
            </h4>
            <p className="text-[13px] text-[#1A022D] mb-4">
              Do you have suitable home setup for online teaching? (Mic/Headset,
              webcam, Laptop & Wifi)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="setup"
                  value="Yes"
                  onChange={handleChange}
                  className="mr-2 focus:ring-orange-500 text-orange-500"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="homeSetup"
                  value="No, but I can arrange"
                  onChange={handleChange}
                  className="mr-2 focus:ring-orange-500 text-orange-500"
                />
                No, but I can arrange
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            aria-label="submit"
            className="bg-[#e26200] text-white py-2 px-4 rounded-md hover:bg-[#c75000] focus:outline-none focus:ring-orange-500 focus:ring-2 transition-all duration-300 md:w-auto"
          >
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
}

export default JobApplication;

function WarningMsg({ message }: { message: string }) {
  return (
    <div className="w-full text-red-900 text-xs rounded-lg bg-red-100 p-3 mt-2">
      {message}
    </div>
  );
}
