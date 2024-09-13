"use client";
import { useEffect, useState } from "react";
import Invitation from "~~/components/invitation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useGetUserInfo from "~~/utils/api/hooks/useGetUserInfo";
import { useQueryClient } from "@tanstack/react-query";

function Page() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useGetUserInfo();

  queryClient.setQueryData(["userId"], data?.id);

  const handleDeposit = () => {
    router.push("/deposit");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="font-monserrat">
      <div
        className="flex flex-col justify-center py-8 px-12 gap-4 h-screen-minus-80"
        style={{
          backgroundImage: `url(/bg-transparent.svg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between items-center max-w-[1700px] mx-auto w-full">
          <div className="flex gap-2 flex-col w-full sm:h-fit h-[400px] justify-between">
            <div>
              <div className="font-bold sm:text-3xl text-[18px] sm:text-left text-center">
                THANK YOU FOR SIGNING UP
              </div>
              <div className="sm:text-xl text-[16px] text-[#CACACA] sm:text-left text-center">
                Welcome to The Marquis
              </div>
            </div>
            <div className={`flex gap-8 mt-20 ${isMobile ? "flex-col" : ""}`}>
              {isMobile ? (
                <>
                  <Link
                    className="shadow-button py-4 px-10 font-arcade text-shadow-deposit text-2xl text-center"
                    href="/"
                  >
                    MAIN
                  </Link>
                  <button className="bg-[#16828A] shadow-button py-4 px-10 font-arcade text-shadow-deposit text-2xl">
                    REMAIN HERE
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="shadow-button w-full max-w-[245px] text-center py-4 px-10 font-arcade text-shadow-deposit text-2xl"
                    href="/"
                  >
                    Home
                  </Link>
                  <button
                    className="bg-[#16828A] w-full max-w-[305px] shadow-button py-4 px-10 font-arcade text-shadow-deposit text-2xl"
                    onClick={handleDeposit}
                  >
                    Deposit
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="hidden-container">
            <Invitation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
