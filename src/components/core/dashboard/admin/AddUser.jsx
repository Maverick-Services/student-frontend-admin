import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthContext";
import { useParams } from "react-router-dom";
import { ROLE } from "../../../../utils/constants";

export const AddAdmin = () => {
  const { token, user, editUser } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editUser) {
      setValue("name", user?.name);
      setValue("email", user?.email);
      setValue("phoneNo", user?.phoneNo);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      user?.name !== currentValues?.name ||
      user?.email !== currentValues?.email ||
      user?.phoneNo !== currentValues?.phoneNo
    );
  };

  const userFormSubmitHandler = (data) => {
    if (editUser) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        let reqBody = {};

        if (currentValues?.name !== user?.name)
          reqBody = { ...reqBody, name: data?.name };
        if (currentValues?.email !== user?.email)
          reqBody = { ...reqBody, email: data?.email };
        if (currentValues?.phoneNo !== user?.phoneNo)
          reqBody = { ...reqBody, phoneNo: data?.phoneNo };

        console.log("edit", reqBody);
        const result = null;
      } else {
        alert("No Changes Made So far");
        return;
      }
    }

    data = {
      ...data,
      role: ROLE.ADMIN,
    };
    const response = null;
    if (response) {
      console.log("User created Successfully", response);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {editUser ? "Edit" : "Add"} Admin Profile
      </h1>

      {/* Form */}
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(userFormSubmitHandler)}
      >
        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNo", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1C398E] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#142A6E] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
