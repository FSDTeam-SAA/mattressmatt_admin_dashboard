"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import SnCard from "./SnCard";
import { SnUserList } from "./SnUserList";

function TotalSnUserPage() {
  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["snUserData"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/all`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch users");
      }
      return res.json();
    },
  });

  if (isError)
    return <div className="text-red-500 text-center mt-10">Failed to load users</div>;

  return (
    <div className="space-y-10">
      <SnCard users={userData?.data} isLoading={isLoading} />
      <SnUserList users={userData?.data} isLoading={isLoading} />
    </div>
  );
}

export default TotalSnUserPage;
