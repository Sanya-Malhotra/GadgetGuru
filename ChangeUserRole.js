import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        <h1 className="text-xl font-semibold text-center pb-4">
          Change User Role
        </h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Name:</label>
            <p>{name}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Email:</label>
            <p>{email}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Role:</label>
            <select
              className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500"
              value={userRole}
              onChange={handleOnChangeSelect}
            >
              {Object.values(ROLE).map((el) => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          className="w-full py-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
