"use client";
import React from "react";
import SnCard from "./SnCard";
import { useQuery } from "@tanstack/react-query";
import { SnUserList } from "./SnUserList";

function TotalSnUserPage() {
  const { data: userData } = useQuery({
    queryKey: ["snUserData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/all`
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch users");
      }
      return res.json(); // return JSON data
    },
  });
  // console.log(userData?.data);

  return (
    <div>
      <div>
        <SnCard users={userData?.data} />
      </div>

      <div className="mt-10">
        <SnUserList users={userData?.data} />
      </div>
    </div>
  );
}

export default TotalSnUserPage;
