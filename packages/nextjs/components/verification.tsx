"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

const OTPInput: React.FC<{ onOtpComplete: (otp: string) => Promise<void> }> = ({
  onOtpComplete,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (isSubmitting) return;
    const newValue = event.target.value;

    if (!/^\d*$/.test(newValue)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    if (newValue && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit)) {
      const otpCode = newOtp.join("");
      setIsSubmitting(true); // Set loading state to true
      onOtpComplete(otpCode).finally(() => {
        setIsSubmitting(false); // Re-enable inputs after OTP processing
      });
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (isSubmitting) return;

    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <div className="w-full max-w-md">
        <h2 className="text-xl mb-4">Verification Code</h2>
        <div className="flex gap-2">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`bg-[#21252B] box-verifi text-center border-2 rounded-md text-xl ${
                value ? "border-[#00ECFF]" : "border-none"
              } focus:outline-none focus:border-[#00ECFF]`}
              disabled={isSubmitting}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
