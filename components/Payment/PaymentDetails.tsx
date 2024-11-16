"use client";
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
import { useForm } from "react-hook-form";

export function PaymentMethod() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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
                {...register("name", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Card number</Label>
              <Input
                id="number"
                placeholder="XXXX XXXX XXXX XXXX"
                {...register("cardNumber", {
                  required: true,
                })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="month">Expires</Label>
                <Select
                  {...register("month", { required: true })}
                >
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      January
                    </SelectItem>
                    <SelectItem value="2">
                      February
                    </SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">
                      August
                    </SelectItem>
                    <SelectItem value="9">
                      September
                    </SelectItem>
                    <SelectItem value="10">
                      October
                    </SelectItem>
                    <SelectItem value="11">
                      November
                    </SelectItem>
                    <SelectItem value="12">
                      December
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select
                  {...register("year", { required: true })}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 21 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={`${
                          new Date().getFullYear() + i
                        }`}
                      >
                        {new Date().getFullYear() + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVV</Label>
                <Input
                  id="cvc"
                  placeholder="CVV"
                  {...register("cvv", { required: true })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Pay Now</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
