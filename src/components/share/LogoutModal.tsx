"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutConfirmationModalProps) {
  const handleLogout = () => {
    // Show toast first
    toast.success("Logged out successfully!");

    // Wait 1.5 seconds before logging out
    setTimeout(() => {
      signOut({callbackUrl:"/login"}); // redirect to login page
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will log you out from the system.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
