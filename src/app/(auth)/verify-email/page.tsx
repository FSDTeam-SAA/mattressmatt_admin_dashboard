"use client"; // ✅ Make this page a client component

import React, { Suspense } from "react";
import VerifyEmail from "./_components/VerifyEmail";

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
