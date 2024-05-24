import Lottie from "lottie-react";

import { FiCheck } from "react-icons/fi";

export type SelectedUserRole = {
    customer: boolean;
    dispatcher: boolean;
  };

export type UserRole = "customer" | "dispatcher";

export default function UserOption ({selectedUserRole, selectedUserRoleHandler, animation, userRole}: {selectedUserRole: boolean, selectedUserRoleHandler: (userRole: UserRole)=>void, animation: any, userRole: UserRole}) {
    return (
        <div
                    onClick={() => selectedUserRoleHandler(userRole)}
                    className={`flex flex-col items-center w-full h-52 rounded-xl shadow-sm  hover:bg-blue-500 cursor-pointer ${
                      selectedUserRole ? "bg-blue-500" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-center w-full h-44 rounded-xl border border-blue-500 bg-white dark:bg-[#1e1e1e] object-contain">
                      <Lottie
                        animationData={animation}
                        className="w-96 object-contain -ml-8 md:w-52"
                      />
                    </div>
                    <span
                      className={`flex items-center justify-center -mt-4  border border-rose-500 h-8 w-8 rounded-full   ${
                        selectedUserRole
                          ? "bg-rose-500 text-white"
                          : "text-rose-500 bg-white "
                      }`}
                    >
                      <FiCheck className={`${!selectedUserRole && 'hidden'}`} />
                    </span>
                  </div>
    )
}