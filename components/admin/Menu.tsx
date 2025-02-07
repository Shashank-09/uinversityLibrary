"use client";

import { startTransition, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { updateUserRole } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface MenuItem {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

interface Props {
  label: string;
  initialValue: string;
  items: MenuItem[];
  userId: string;
}

const Menu = ({ label, initialValue, items, userId }: Props) => {
  const [activeItem, setActiveItem] = useState(initialValue);
  const [position, setPosition] = useState("bottom");

  const router = useRouter();

  const handleItemClick = async (value: string) => {
    const result = await updateUserRole(userId);
    setActiveItem(result.newRole ?? activeItem);
    if (result.success) {
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      startTransition(() => router.refresh());
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }

    console.log(`Clicked: ${value}`);
  };

  const getItemStyle = (item: MenuItem) => {
    return cn(
      "capitalize w-fit text-center text-sm font-medium px-5 py-1 rounded-full ",
      item.bgColor,
      item.textColor,
    );
  };

  const activeMenuItem =
    items.find((item) => item.value === activeItem) || items[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          getItemStyle(activeMenuItem),
          "outline-none ring-0 focus:ring-0",
        )}
      >
        {activeMenuItem.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-2" />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {items.map((item) => (
            <DropdownMenuRadioItem
              value={item.value}
              key={item.value}
              onClick={() => handleItemClick(item.value)}
            >
              <p className={cn(getItemStyle(item))}>{item.value}</p>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
