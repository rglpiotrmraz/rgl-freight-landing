import { HeroSection } from "@/app/components/hero-section";
import { SubscriptionForm } from "@/app/components/subscription-form";
import { Footer } from "@/app/components/footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-col flex-1 items-center justify-center bg-white">
        <HeroSection />
        <div className="w-full px-4 pb-16 pt-4">
          <SubscriptionForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
