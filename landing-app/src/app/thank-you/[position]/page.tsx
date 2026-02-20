import { getPositionLabelFromTrackingSlug } from "@/data/applicationOptions";

type ThankYouPageProps = {
  params: Promise<{
    position: string;
  }>;
};

const decodePosition = (rawValue: string): string => {
  try {
    return decodeURIComponent(rawValue);
  } catch {
    return rawValue;
  }
};

export default async function ThankYouPage({ params }: ThankYouPageProps) {
  const { position } = await params;
  const decodedPosition = decodePosition(position);
  const resolvedPositionLabel = getPositionLabelFromTrackingSlug(decodedPosition);
  const displayPosition =
    resolvedPositionLabel ?? decodedPosition.replace(/-/g, " ").trim();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#dedddd] px-4 py-10">
      <section className="w-full max-w-xl rounded-[26px] bg-white px-8 py-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        <h1
          className="text-3xl font-bold text-[#006D0D]"
          style={{ fontFamily: "var(--font-noto-sans-georgian)" }}
        >
          გმადლობთ განაცხადისთვის!
        </h1>
        <p
          className="mt-4 text-lg text-[#1f2937]"
          style={{ fontFamily: "var(--font-noto-sans-georgian)" }}
        >
          არჩეული პოზიცია: {displayPosition}
        </p>
      </section>
    </main>
  );
}
