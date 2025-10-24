import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white text-center p-3 text-sm">
        <p className="m-0">
          &copy; {new Date().getFullYear()} Mathavam. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
