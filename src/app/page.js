import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";
import Features from "@/components/Features";
import Images from "@/components/Images";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Introduction/>
      <Images/>
      <Features/>
    </div>
  );
}
