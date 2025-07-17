"use client";
import Layout from "@/components/common/Layout";
import IntroSection from "@/components/content/IntroSection";
import ProgramSection from "@/components/content/ProgramSection";
import ReviewSection from "@/components/content/ReviewSection";
import LocationSection from "@/components/content/LocationSection";
import sample from "@/data/sample.json";

export default function Home() {
  return (
    <Layout>
      <IntroSection {...sample.intro} />
      <ProgramSection {...sample.programs} />
      <ReviewSection {...sample.reviews} />
      <LocationSection {...sample.location} />
    </Layout>
  );
}
