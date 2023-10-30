"use client";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    session?.user && redirect("/home");
    !session?.user && redirect("/login");
  }, [session?.user]);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Home;
