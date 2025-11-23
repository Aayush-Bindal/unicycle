"use client";

import { useState } from "react";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@heroui/react";
import { Phone, Building2, DoorOpen, User, Sparkles } from "lucide-react";
import { hostels } from "@/data/hostels";
// 👇 IMPORT YOUR HELPER FUNCTION
import { generateUniqueUsername } from "@/lib/username-generator";

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [username, setUsername] = useState("");

  // 1. Handle Auto Generate
  const handleAutoGenerate = () => {
    const newName = generateUniqueUsername();
    setUsername(newName);
  };

  // 2. Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      username: formData.get("username"),
      phone: formData.get("phone"),
      hostel: formData.get("hostel"),
      room: formData.get("room"),
    };

    console.log("Onboarding payload:", payload);

    // simulate API/progress
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  // 3. Styles Object
  const glassInputStyles = {
    label: "text-white/50 group-data-[filled=true]:text-white/70",
    input: [
      "bg-transparent",
      "text-white/90",
      "placeholder:text-white/30",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-white/3",
      "backdrop-blur-xl",
      "backdrop-saturate-300",
      "hover:bg-white/5",
      "!cursor-text",
    ],
  };

  // 4. Return Statement (Must be inside the function)
  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        
        {/* YOUR GLASS DIV */}
        <div className="relative z-10 w-full max-w-3xl mx-auto p-8 rounded-2xl bg-white/3 backdrop-blur-xl backdrop-saturate-150 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white overflow-hidden before:content-[''] before:absolute before:inset-0 before:from-white/10 before:to-transparent before:opacity-10 before:pointer-events-none mt-32">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* USERNAME INPUT */}
            <Input
              name="username"
              label="Username"
              isRequired
              // Only allow clearing if text exists (prevents conflict with sparkle)
              isClearable={!!username}
              value={username}
              onValueChange={setUsername}
              placeholder="DON'T ADD YOUR REAL NAME"
              className="max-w-xs"
              isInvalid={isInvalid}
              errorMessage="This username is already taken"
              classNames={glassInputStyles}
              startContent={<User className="text-white/50 mb-0.5 pointer-events-none" size={15} />}
              
              endContent={
                username ? null : (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={handleAutoGenerate}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleAutoGenerate();
                      }
                    }}
                    className="z-20 group flex items-center justify-center cursor-pointer outline-none"
                    title="Generate Random Username"
                  >
                    <Sparkles 
                      size={16} 
                      className="text-white/50 hover:text-white transition-colors group-active:scale-90" 
                    />
                  </div>
                )
              }
            />
            
            {/* Phone Number */}
            <Input
              name="phone"
              isRequired
              className="max-w-xs"
              classNames={glassInputStyles}
              startContent={
                <div className="flex items-center gap-1 mb-0.5">
                  <Phone className="text-white/50 pointer-events-none" size={15} />
                  <span className="text-white/50 text-sm pointer-events-none">+91</span>
                </div>
              }
              maxLength={10}
              label="Phone Number"
              placeholder="Enter 10-digit Number"
              isClearable
              type="tel"
              pattern="^[0-9]*$"
              errorMessage="Please enter digits only."
            />

            {/* Hostel */}
            <Autocomplete
              name="hostel"
              isRequired
              inputProps={{
                classNames: glassInputStyles,
              }}
              defaultItems={hostels}
              label="Hostel"
              placeholder="Select Hostel"
              startContent={<Building2 className="text-white/50 mb-0.5 pointer-events-none" size={20} />}
              errorMessage="Choose a valid hostel"
            >
              {(item: any) => <AutocompleteItem key={item.value || item.key}>{item.label}</AutocompleteItem>}
            </Autocomplete>

            {/* Room Number */}
            <Input
              name="room"
              className="max-w-xs"
              classNames={glassInputStyles}
              isRequired
              label="Room Number"
              placeholder="e.g. B304"
              startContent={<DoorOpen className="text-white/50 mb-0.5 pointer-events-none" size={15} />}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full mt-2 font-bold bg-white/80 text-black shadow-lg"
              size="lg"
            >
              {isSubmitting ? "Sumbitting" : "Submit"}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}