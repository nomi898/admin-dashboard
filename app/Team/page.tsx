"use client";

import React from "react";
import { teamMembers } from "@/data/team";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const TeamPage = () => {
  const router = useRouter();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team</h1>
        <button
          onClick={() => router.push("/Contact/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-3">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
            <p className="text-xs text-gray-500 mb-4 truncate w-full">{member.email}</p>
            <button
              onClick={() => router.push(`/Inbox?compose=true&to=${encodeURIComponent(member.email)}`)}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;

