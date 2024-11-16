"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createHash } from "crypto";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";

interface PaymentFormData {
  name: string;
  cardNumber: string;
  month: string;
  year: string;
  cvv: string;
}

interface CardHashDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

function hashCardDetails(
  cardDetails: CardHashDetails
): string {
  const dataToHash = `${cardDetails.cardNumber}|${cardDetails.expirationDate}|${cardDetails.cvv}`;
  const hash = createHash("sha256")
    .update(dataToHash)
    .digest("hex");
  return hash;
}

function formatMonth(month: string): string {
  // Ensure month is two digits
  return month.padStart(2, "0");
}

function formatYear(year: string): string {
  // Get last two digits of year
  return year.slice(-2);
}

export function PaymentMethod() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control, // Add control for handling Select components
  } = useForm<PaymentFormData>();

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\s/g, "");
    const groups = cleanValue.match(/.{1,4}/g) || [];
    return groups.join(" ").substr(0, 19); // 19 characters: 16 digits + 3 spaces
  };

  // Handle card number input
  const handleCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatCardNumber(
      e.target.value.replace(/[^\d]/g, "")
    );
    setValue("cardNumber", formatted);
  };

  const onSubmit = (data: PaymentFormData) => {
    // Clean and format the data
    const cleanCardNumber = data.cardNumber.replace(
      /\s/g,
      ""
    );
    const formattedMonth = formatMonth(data.month);
    const formattedYear = formatYear(data.year);
    const expirationDate = `${formattedMonth}/${formattedYear}`;

    // Create card details object for hashing
    const cardDetails: CardHashDetails = {
      cardNumber: cleanCardNumber,
      expirationDate: expirationDate,
      cvv: data.cvv,
    };

    // Generate hash
    const cardHash = hashCardDetails(cardDetails);

    // Log both the clean data and the hash
    console.log("Form Data:", {
      ...data,
      cardNumber: cleanCardNumber,
      expirationDate,
    });
    console.log("Card Hash:", cardHash);

    // Navigate to success page with hash as query parameter
    router.push(
      `/payment/payment-success?hash=${encodeURIComponent(
        cardHash
      )}`
    );
  };

  return (
    <div className="flex items-start justify-center px-4 pb-6 md:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Complete your purchase by providing your
              payment details.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <RadioGroup
              defaultValue="card"
              className="grid grid-cols-1 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mb-3 h-6 w-6"
                  >
                    <rect
                      width="20"
                      height="14"
                      x="2"
                      y="5"
                      rx="2"
                    />
                    <path d="M2 10h20" />
                  </svg>
                  Card
                </Label>
              </div>
            </RadioGroup>
            <div className="grid gap-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="Cardholder Name"
                {...register("name", {
                  required: "Cardholder name is required",
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Card number</Label>
              <Input
                id="number"
                placeholder="XXXX XXXX XXXX XXXX"
                {...register("cardNumber", {
                  required: "Card number is required",
                  pattern: {
                    value: /^[\d\s]{19}$/,
                    message:
                      "Please enter a valid 16-digit card number",
                  },
                  onChange: (e) =>
                    handleCardNumberChange(e),
                })}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="month">Month</Label>
                <Controller
                  name="month"
                  control={control}
                  rules={{ required: "Month is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="month">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 12 },
                          (_, i) => (
                            <SelectItem
                              key={i + 1}
                              value={String(i + 1)}
                            >
                              {new Date(
                                0,
                                i
                              ).toLocaleString("default", {
                                month: "short",
                              })}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.month && (
                  <p className="text-sm text-red-500">
                    {errors.month.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Controller
                  name="year"
                  control={control}
                  rules={{ required: "Year is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 21 },
                          (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${
                                new Date().getFullYear() + i
                              }`}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.year && (
                  <p className="text-sm text-red-500">
                    {errors.year.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVV</Label>
                <Input
                  id="cvc"
                  placeholder="CVV"
                  type="text"
                  maxLength={3}
                  {...register("cvv", {
                    required: "CVV is required",
                    pattern: {
                      value: /^[0-9]{3}$/,
                      message: "CVV must be 3 digits",
                    },
                  })}
                />
                {errors.cvv && (
                  <p className="text-sm text-red-500">
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Pay Now
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
