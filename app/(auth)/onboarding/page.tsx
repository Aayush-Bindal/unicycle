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
import { generateUniqueUsername } from "@/lib/username-generator";

// --- Type and Data Definitions ---

const USER_NAME = "Arjun";
type Hostel = typeof hostels[number];

// --- Component Logic ---

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Input States
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(""); 
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleAutoGenerate = () => {
    const newName = generateUniqueUsername();
    setUsername(newName);
    setUsernameError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let isValid = true; // Overall form validity flag

    // Validation Check 1: Username
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }

    // Validation Check 2: Phone (Must be exactly 10 digits)
    if (phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      isValid = false;
    }

    if (!isValid) return; // Stop submission if errors exist

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      username: formData.get("username"),
      phone: formData.get("phone"),
      hostel: formData.get("hostel"),
      room: formData.get("room"),
    };

    console.log("Payload:", payload);
    // Simulate API call and set completion
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  // Glass Styles (kept compact)
  const glassInputStyles = {
    label: "text-white/50 group-data-[filled=true]:text-white/70",
    input: ["bg-transparent", "text-white/90", "placeholder:text-white/30"],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-white/3",
      "backdrop-blur-xl",
      "backdrop-saturate-300",
      "hover:bg-white/5",
      "!cursor-text",
    ],
  };

  // --- JSX Structure ---

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        
        <div className="relative z-10 w-full max-w-3xl mx-auto pt-5 p-8 rounded-2xl bg-white/5 backdrop-blur-xl backdrop-saturate-150 border border-white/7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white overflow-hidden before:content-[''] before:absolute before:inset-0 before:from-white/10 before:to-transparent before:opacity-10 before:pointer-events-none mt-42">

          {/* HEADING */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white/80">
              Welcome, {USER_NAME}
            </h2>
            <p className="text-sm text-white/50 mt-2">
              Finish setting up your profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* 1. USERNAME INPUT */}
            <Input
              name="username"
              label="Username"
              isRequired 
              className="max-w-xs"
              classNames={glassInputStyles}
              
              // Validation Props
              isInvalid={!!usernameError}
              errorMessage={usernameError}

              // State & Logic
              value={username}
              isClearable={!!username}
              onValueChange={(val) => {
                setUsername(val);
                if (val) setUsernameError(""); 
              }}
              onBlur={() => {
                if (!username.trim()) setUsernameError("Username is required");
              }}
              
              placeholder="DON'T ADD YOUR REAL NAME"
              startContent={<User className="text-white/50 mb-0.5 pointer-events-none" size={15} />}
              
              // Sparkle Auto-Generate Button
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
                    <Sparkles size={16} className="text-white/50 hover:text-white transition-colors group-active:scale-90" />
                  </div>
                )
              }
            />
            
            {/* 2. PHONE NUMBER */}
            <Input
              name="phone"
              label="Phone Number"
              isRequired
              className="max-w-xs"
              classNames={glassInputStyles}
              
              // State & Logic
              value={phone}
              isInvalid={!!phoneError}
              errorMessage={phoneError}
              maxLength={10}
              
              onValueChange={(val) => {
                if (/^\d*$/.test(val)) { // Regex: Only allow digits
                  setPhone(val);
                  // Clear error as soon as they hit 10
                  if (val.length === 10) setPhoneError(""); 
                  // Also clear "Required" error if they start typing
                  if (val.length > 0 && phoneError === "Enter a valid phone number") setPhoneError("");
                }
              }}
              
              onBlur={() => {
                if (!phone) {
                  setPhoneError("Enter a valid phone number");
                } else if (phone.length !== 10) {
                  setPhoneError("Phone number must be exactly 10 digits");
                }
              }}
              
              // Input Type Hints
              type="tel"
              inputMode="numeric"
              isClearable={!!phone}
              
              startContent={
                <div className="flex items-center gap-1 mb-0.5">
                  <Phone className="text-white/50 pointer-events-none" size={15} />
                  <span className="text-white/50 text-sm pointer-events-none">+91</span>
                </div>
              }
              placeholder="Enter 10-digit Phone Number"
            />

            {/* 3. HOSTEL AUTOCOMPLETE */}
            <Autocomplete
              name="hostel"
              label="Hostel"
              isRequired
              inputProps={{ classNames: glassInputStyles }}
              defaultItems={hostels}
              placeholder="Select Hostel"
              startContent={<Building2 className="text-white/50 mb-0.5 pointer-events-none" size={20} />}
              errorMessage="Choose a valid hostel"
            >
              {(item: Hostel) => (
                <AutocompleteItem 
                  key={item.value || item.label}
                  className="data-[hover=true]:bg-white/10 data-[hover=true]:text-white text-white/80"
                >
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            {/* 4. ROOM NUMBER */}
            <Input
              name="room"
              label="Room Number"
              isRequired
              className="max-w-xs"
              classNames={glassInputStyles}
              placeholder="e.g. B304"
              startContent={<DoorOpen className="text-white/50 mb-0.5 pointer-events-none" size={15} />}
            />

            {/* 5. SUBMIT */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full mt-2 font-bold bg-white/90 text-black shadow-lg"
              size="lg"
            >
              {isSubmitting ? "Saving..." : "Complete Setup"}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}