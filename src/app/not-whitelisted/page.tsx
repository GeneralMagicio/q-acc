import React from "react";

export default function NotWhiteListedPage() {
  return (
    <main className="container text-center">
      <div className="p-10 bg-white rounded-2xl shadow-sm flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium">Hold On!</h1>
        <p className="text-2xl font-thin">
          That address is not on the allowlist.
        </p>
      </div>
    </main>
  );
}
