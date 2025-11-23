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

// Mock Data (Replace with your actual prop)
const USER_NAME = "Arjun";

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(""); 

  const handleAutoGenerate = () => {
    const newName = generateUniqueUsername();
    setUsername(newName);
    setUsernameError(""); // Clear error
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 🔴 FIX: Explicit check. If empty, stop everything and show red error.
    if (!username.trim()) {
      setUsernameError("Username is required");
      return; 
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      username: formData.get("username"),
      phone: formData.get("phone"),
      hostel: formData.get("hostel"),
      room: formData.get("room"),
    };

    console.log("Payload:", payload);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  // Glass Styles
  const glassInputStyles = {
    label: "text-white/50 group-data-[filled=true]:text-white/70",
    input: ["bg-transparent", "text-white/90", "placeholder:text-white/30"],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-white/5",
      "backdrop-blur-xl",
      "backdrop-saturate-300",
      "hover:bg-white/10",
      "!cursor-text",
      "border-white/10"
    ],
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        
        <div className="relative z-10 w-full max-w-3xl mx-auto pt-5 p-8 rounded-2xl bg-white/5 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white overflow-hidden before:content-[''] before:absolute before:inset-0 before:from-white/10 before:to-transparent before:opacity-10 before:pointer-events-none mt-42">

          {/* HEADING - Clean & Personal */}
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
              
              // 🔴 Check 1: Standard HTML Required
              isRequired 
              
              // 🔴 Check 2: Visual Error State
              isInvalid={!!usernameError}
              errorMessage={usernameError}

              // Logic: Clear error when typing, Set error when leaving if empty
              onValueChange={(val) => {
                setUsername(val);
                if (val) setUsernameError(""); 
              }}
              onBlur={() => {
                if (!username.trim()) setUsernameError("Username is required");
              }}

              isClearable={!!username}
              value={username}
              placeholder="DON'T ADD YOUR REAL NAME"
              className="max-w-xs"
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
            
            {/* 2. PHONE NUMBER */}
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

            {/* 3. HOSTEL */}
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
              popoverProps={{
                offset: 10,
                classNames: {
                  content: "bg-white/10 border border-white/10 backdrop-blur-xl text-white/90 shadow-xl",
                },
              }}
            >
              {(item: any) => (
                <AutocompleteItem 
                  key={item.value || item.key}
                  className="data-[hover=true]:bg-white/10 data-[hover=true]:text-white text-white/80"
                >
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            {/* 4. ROOM NUMBER */}
            <Input
              name="room"
              className="max-w-xs"
              classNames={glassInputStyles}
              isRequired
              label="Room Number"
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