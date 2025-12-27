"use client";

import { useState, useEffect } from "react"; // 👈 Added useEffect
import { useRouter } from "next/navigation";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@heroui/react";
import { Phone, Building2, DoorOpen, User, Sparkles } from "lucide-react";
import { hostels } from "@/data/hostels";
import { generateUniqueUsername } from "@/lib/username-generator";
import { checkUsername, completeOnboarding, getFirstName } from "./actions"; // 👈 Import getFirstName

// --- Type Definitions ---
type Hostel = typeof hostels[number];

// --- Component Logic ---

export default function OnboardingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the User's Name
  const [firstName, setFirstName] = useState("Student"); // Default until loaded

  // Input States
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(""); 
  
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  const [hostel, setHostel] = useState("");
  const [hostelError, setHostelError] = useState("");
  
  const [room, setRoom] = useState("");
  const [roomError, setRoomError] = useState("");

  // ⚡️ Fetch Name on Mount
  useEffect(() => {
    const fetchName = async () => {
      const name = await getFirstName();
      setFirstName(name);
    };
    fetchName();
  }, []);

  const handleAutoGenerate = async () => {
    const newName = generateUniqueUsername();
    setUsername(newName);
    setUsernameError(""); 
    const isTaken = await checkUsername(newName);
    if (isTaken) setUsernameError("Generated name is taken, try again");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let errorsFound = false; 

    // --- Client-Side Validation ---
    if (!username.trim()) {
      setUsernameError("Username is required");
      errorsFound = true;
    } else if (await checkUsername(username)) {
      setUsernameError("This username is already taken");
      errorsFound = true;
    }

    if (!phone) {
      setPhoneError("Enter a valid phone number");
      errorsFound = true;
    } else if (phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      errorsFound = true;
    }
    
    if (!hostel) {
      setHostelError("Please select a hostel");
      errorsFound = true;
    }
    
    if (!room) {
      setRoomError("Room number is required");
      errorsFound = true;
    }

    if (errorsFound) return; 

    setIsSubmitting(true);
    
    const payload = {
      username,
      phone,
      hostel,
      room,
    };

    // ⚡️ Call Server Action
    const result = await completeOnboarding(payload);

    if (result?.error) {
      alert(result.error); 
      setIsSubmitting(false);
    } else if (result?.success) {
      console.log("Onboarding successful!");
      router.push("/"); 
    }
  };

  // Glass Styles
const glassInputStyles = {
    inputWrapper: "glass-interactive !cursor-text data-[hover=true]:bg-white/10 group-data-[focus=true]:bg-white/10",
    label: "text-white/50 group-data-[filled=true]:text-white/70",
    input: "bg-transparent text-white/90 placeholder:text-white/30",
    innerWrapper: "bg-transparent",
  };

  // --- JSX Structure ---

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        
        <div className="relative z-10 w-full max-w-3xl mx-auto pt-5 p-8 rounded-2xl bg-white/5 backdrop-blur-xl backdrop-saturate-150 border border-white/7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white overflow-hidden before:content-[''] before:absolute before:inset-0 before:from-white/10 before:to-transparent before:opacity-10 before:pointer-events-none mt-42">

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white/80">
              {/* Uses the fetched first name */}
              Welcome, {firstName}
            </h2>
            <p className="text-sm text-white/50 mt-2">
              Finish setting up your profile
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* 1. USERNAME INPUT */}
            <Input
              name="username"
              label="Username"
              isRequired 
              className="max-w-xs"
              classNames={glassInputStyles}
              
              isInvalid={!!usernameError}
              errorMessage={usernameError}

              value={username}
              isClearable={!!username}
              
              onValueChange={(val) => {
                setUsername(val);
                if (val) setUsernameError(""); 
              }}
              
              onBlur={async () => {
                if (!username.trim()) {
                  setUsernameError("Username is required");
                } else {
                  const isTaken = await checkUsername(username);
                  if (isTaken) setUsernameError("This username is already taken");
                }
              }}
              
              placeholder="DON'T ADD YOUR REAL NAME"
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
              
              value={phone}
              isInvalid={!!phoneError}
              errorMessage={phoneError}
              maxLength={10}
              
              onValueChange={(val) => {
                if (/^\d*$/.test(val)) {
                  setPhone(val);
                  if (val.length === 10) setPhoneError(""); 
                  if (val.length > 0 && phoneError) setPhoneError("");
                }
              }}
              
              onBlur={() => {
                if (!phone) {
                  setPhoneError("Enter a valid phone number");
                } else if (phone.length !== 10) {
                  setPhoneError("Phone number must be exactly 10 digits");
                }
              }}
              
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
              
              value={hostel}
              onInputChange={(val) => {
                setHostel(val);
                if (val) setHostelError("");
              }} 
              onSelectionChange={(key) => {
                if (key) {
                  setHostel(key as string);
                  setHostelError("");
                }
              }}
              
              isInvalid={!!hostelError}
              errorMessage={hostelError}
              onBlur={() => { if (!hostel) setHostelError("Please select a hostel"); }}

              startContent={<Building2 className="text-white/50 mb-0.5 pointer-events-none" size={20} />}
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
              
              value={room}
              
              isInvalid={!!roomError}
              errorMessage={roomError}
              
              onValueChange={(val) => {
                setRoom(val); 
                if (val) setRoomError(""); 
              }}
              
              onBlur={() => { 
                if (!room) setRoomError("Room number is required"); 
              }}
              
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