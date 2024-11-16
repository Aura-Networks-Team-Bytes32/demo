// app/payment/payment-success/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const cardHash = searchParams.get("hash");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (
    index: number,
    value: string
  ) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      const nextInput = document.querySelector(
        `input[name=otp-${index + 1}]`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      const prevInput = document.querySelector(
        `input[name=otp-${index - 1}]`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("OTP Submitted:", otpValue);
    console.log("Card Hash:", cardHash);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4 pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Verify Payment
          </CardTitle>
          <CardDescription className="text-center">
            Please enter the 6-digit OTP sent to your
            registered email address to complete the
            payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2 sm:gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                name={`otp-${index}`}
                className="w-10 h-10 text-center text-lg sm:w-12 sm:h-12"
                value={digit}
                onChange={(e) =>
                  handleOtpChange(index, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={otp.join("").length !== 6}
          >
            Verify OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
