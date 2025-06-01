"use client";

import Link from "next/link";

const Page = () => {
  return (
    <section className="w-screen min-h-screen bg-primary py-16 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full rounded-3xl bg-primary-light shadow-right border border-accent-1 p-8 md:p-12">
        <h1 className="h1 text-secondary mb-8 font-fraunces font-bold">
          Professional Support
        </h1>

        <div className="space-y-6 mb-12">
          <p className="text-lg font-nunito">
            Taking the first step toward recovery or seeking help can feel
            daunting, but you don&apos;t have to do it alone. This page provides
            a list of trusted Irish helplines where you can find professional
            support.
          </p>

          <p className="text-lg font-nunito">
            Whether you&apos;re struggling with addiction, mental health challenges,
            or simply need someone to talk to, these services are here to guide
            you. Remember, reaching out is a sign of strength, and the right
            support can make all the difference.
          </p>

          <p className="text-lg font-nunito">
            Please note that while I share my experiences here, I&apos;m not a
            professional advisor — these resources are where you can find expert
            help.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold font-fraunces text-secondary mb-8">
            HELPLINES
          </h2>

          <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-semibold text-lg w-full md:w-[40%] md:pr-4">
                Cocaine Anonymous helpline:
              </span>
              <Link
                href="tel:1800998866"
                className="text-accent-1 text-xl font-semibold hover:underline"
              >
                1800998866
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-semibold text-lg w-full md:w-[40%] md:pr-4">
                HSE Confidential freephone helpline:
              </span>
              <Link
                href="tel:1800459459"
                className="text-accent-1 text-xl font-semibold hover:underline"
              >
                1800459459
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-semibold text-lg w-full md:w-[40%] md:pr-4">
                Text about it:
              </span>
              <span className="text-accent-1 text-xl font-semibold">
                Text Hello to 50808 for free
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-semibold text-lg w-full md:w-[40%] md:pr-4">
                Samaritans:
              </span>
              <Link
                href="tel:116123"
                className="text-accent-1 text-xl font-semibold hover:underline"
              >
                Call 116123
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-semibold text-lg w-full md:w-[40%] md:pr-4">
                Pieta House:
              </span>
              <Link
                href="tel:1800247247"
                className="text-accent-1 text-xl font-semibold hover:underline"
              >
                Call 1800247247
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-secondary/20 pt-6">
          <p className="text-center text-secondary/70 text-sm">
            If you are experiencing an emergency, please call 999 or 112
            immediately.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
