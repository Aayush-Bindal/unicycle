"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Avatar, 
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Switch,
  Skeleton
} from "@heroui/react";
import { Search, Filter, Heart, Building2, Globe, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { signOutUser } from "../(auth)/logout";

// --- MOCK DATA ---
const CATEGORIES = ["All", "Cycles", "Books", "Electronics", "Furniture", "Lab Coats", "Gadgets"];
const PRODUCTS = [
  { id: 1, title: "Hercules Roadeo A50", price: "₹4,500", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=500", condition: "Good", location: "J Hall", isMyHostel: true },
  { id: 2, title: "Engineering Physics", price: "₹250", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=500", condition: "Like New", location: "G Hall", isMyHostel: false },
  { id: 3, title: "Wireless Mouse", price: "₹600", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=500", condition: "Used", location: "M Hall", isMyHostel: false },
  { id: 4, title: "Table Lamp", price: "₹300", image: "https://images.unsplash.com/photo-1534073828943-f801091a7174?auto=format&fit=crop&q=80&w=500", condition: "Decent", location: "PG Hostel", isMyHostel: true },
  { id: 5, title: "Casio fx-991ES", price: "₹400", image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=500", condition: "New", location: "I Hall", isMyHostel: false },
  { id: 6, title: "Mattress (Single)", price: "₹800", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=500", condition: "Clean", location: "J Hall", isMyHostel: true },
];

export default function MainPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isHostelMode, setIsHostelMode] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = isHostelMode 
    ? PRODUCTS.filter(p => p.isMyHostel) 
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      
      {/* === NAVBAR === */}
      <Navbar 
        isBordered 
        maxWidth="xl"
        className="fixed top-0 z-50 bg-black/60 border-white/5 backdrop-blur-xl"
        height="4rem"
      >
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <div className="relative h-8 w-auto min-w-[120px]"> 
                <Image 
                  src="/images/logo.png" 
                  alt="UNICYCLE" 
                  fill 
                  className="object-contain object-left" 
                  priority
                />
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex w-full max-w-sm" justify="center">
          <Input
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal bg-zinc-800/50 data-[hover=true]:bg-zinc-800/80 group-data-[focus=true]:bg-zinc-800 border-zinc-700/30",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<Search size={16} className="text-white/50" />}
            type="search"
          />
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2 sm:gap-4">
          
          <NavbarItem className="sm:hidden">
            <Button isIconOnly variant="light" radius="full" className="text-white/70">
              <Search size={20} />
            </Button>
          </NavbarItem>

          {/* === HOSTEL TOGGLE === */}
          <NavbarItem>
            <Switch
              isSelected={isHostelMode}
              onValueChange={setIsHostelMode}
              size="lg"
              // LOGIC: Icons live on the Thumb now.
              // Hostel Mode (ON): Thumb is Black -> Icon is White
              // Campus Mode (OFF): Thumb is White -> Icon is Black
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <Building2 className={className} size={14} color="white" />
                ) : (
                  <Globe className={className} size={14} color="black" />
                )
              }
              classNames={{
                // Track (Background)
                wrapper: "group-data-[selected=true]:bg-white/95 bg-zinc-800 border border-white/10",
                // Thumb (The moving circle)
                thumb: "bg-white group-data-[selected=true]:bg-black",
              }}
            >
              <span className="text-xs text-white/50 font-medium hidden md:block">
                {isHostelMode ? "My Hostel" : "All Campus"}
              </span>
            </Switch>
          </NavbarItem>
          
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform w-8 h-8 sm:w-10 sm:h-10"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                classNames={{ base: "bg-zinc-700 ring-white/20" }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-[#121212] border border-zinc-800 text-white">
              <DropdownItem key="profile" className="h-14 gap-2 text-white">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@thapar.edu</p>
              </DropdownItem>
              <DropdownItem key="listings" className="text-white hover:bg-zinc-800">My Listings</DropdownItem>
              <DropdownItem key="listings" className="text-white hover:bg-zinc-800">My Requests</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={signOutUser}>Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {/* === MAIN FEED === */}
      <main className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 sticky top-16 z-40 py-2">
          <Button isIconOnly radius="full" variant="flat" className="shrink-0 bg-white/5 hover:bg-white/10 text-white">
            <Filter size={18} />
          </Button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap shrink-0 border
                ${activeCategory === cat 
                  ? "bg-white text-black border-white"
                  : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* === GRID / SKELETONS === */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          
          {isLoading ? (
            Array(8).fill(0).map((_, index) => (
              <Card key={index} className="w-full h-full bg-[#18181b] border border-white/5 space-y-5 p-0" radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-48 rounded-lg bg-zinc-800"></div>
                </Skeleton>
                <div className="space-y-3 px-3 pb-3">
                  <Skeleton className="w-3/5 rounded-lg bg-zinc-800">
                    <div className="h-3 w-3/5 rounded-lg bg-zinc-800"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg bg-zinc-800">
                    <div className="h-3 w-4/5 rounded-lg bg-zinc-800"></div>
                  </Skeleton>
                  <div className="flex justify-between mt-2">
                    <Skeleton className="w-1/4 rounded-lg bg-zinc-800"><div className="h-4"></div></Skeleton>
                    <Skeleton className="w-1/4 rounded-lg bg-zinc-800"><div className="h-4"></div></Skeleton>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            filteredProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  shadow="sm" 
                  isPressable 
                  className="w-full h-full bg-[#18181b] border border-white/5 hover:border-white/10 group"
                >
                  <CardBody className="p-0 overflow-hidden relative aspect-4/5">
                    <Image
                      alt={item.title}
                      src={item.image}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-3 right-3 translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-red-500 cursor-pointer">
                          <Heart size={18} />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="font-bold text-lg drop-shadow-md">{item.price}</p>
                    </div>
                  </CardBody>
                  
                  <CardFooter className="flex flex-col items-start gap-1 px-3 py-3">
                      <div className="flex justify-between items-center w-full">
                          <h3 className="text-sm font-medium text-zinc-100 truncate pr-2">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 w-full">
                          <Chip size="sm" variant="flat" className="bg-zinc-800 text-zinc-400 h-5 text-[10px] px-1 border border-zinc-700">
                              {item.location}
                          </Chip>
                          <span className="text-[10px] text-zinc-500 ml-auto">{item.condition}</span>
                      </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </main>

{/* === FAB: Glassy Default -> Solid Hover === */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button 
            isIconOnly
            radius="full" 
            className="
              w-16 h-16 
              border border-white/20 shadow-lg
              bg-black/40 backdrop-blur-md text-white      // Default: Glassy
              hover:bg-white hover:text-black              // Hover: Solid White
              hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] // Hover: Strong Glow
              transition-all duration-300
            "
        >
            <Plus size={32} strokeWidth={2.5} />
        </Button>
      </motion.div>

    </div>
  );
}