"use client";

import { CycleOptions } from "@/components/cycle/CycleOptions";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Error({}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { get } = useSearchParams();
  const cycleID = get("cycle");
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-lg text-primary mb-4">Invalid cycle ID</div>
      <div className="text-md text-primary">
        {cycleID ? (
          <div>
            <p>
              The cycle ID{" "}
              <span className="text-blue-400">&apos;{cycleID}&apos;</span> is
              not valid. Select a new cycle.
            </p>
            <Button>Select cycle</Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-2">
            <p>There was an error.</p>{" "}
            <Button
              variant="default"
              className=""
              onClick={() => router.push("/")}
            >
              Return to home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
