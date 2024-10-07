import PaginationBar from "@/components/shared/PaginationBar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ComplaintsProps {
  searchParams: {
    query: string;
    page: string;
  };
}
export const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const then = new Date(dateString);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  if (seconds < 3600)
    return `${Math.floor(seconds / 60)} min${
      Math.floor(seconds / 60) !== 1 ? "s" : ""
    } ago`;
  if (seconds < 86400)
    return `${Math.floor(seconds / 3600)} hour${
      Math.floor(seconds / 3600) !== 1 ? "s" : ""
    } ago`;
  if (seconds < 2592000)
    return `${Math.floor(seconds / 86400)} day${
      Math.floor(seconds / 86400) !== 1 ? "s" : ""
    } ago`;
  return `${Math.floor(seconds / 2592000)} month${
    Math.floor(seconds / 2592000) !== 1 ? "s" : ""
  } ago`;
};

const Complaints: React.FC<ComplaintsProps> = async ({ searchParams }) => {
  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const totalItemCount = await db.complaint.count();
  const totalPages = Math.ceil(totalItemCount / pageSize);
  const complaints = await db.complaint.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <section className="space-y-4">
      {complaints.map((complaint) => (
        <Card
          key={complaint.id}
          className="p-4 w-full max-w-2xl ml-2 hover:cursor-pointer hover:shadow-lg "
        >
          <Link href={`/complaint/${complaint.id}`}>
            <CardTitle className="flex items-center justify-between">
              <span className="font-normal text-lg text-ellipsis">
                {complaint.title}
              </span>
              <span className="text-gray-500 text-xs font-normal">
                {getRelativeTime(complaint.createdAt.toISOString())}
              </span>
            </CardTitle>
            <CardContent className="py-4 max-h-28 text-ellipsis overflow-hidden whitespace-wrap">
              <p className="text-gray-800">{complaint.description}</p>
            </CardContent>
          </Link>

          <button className="text-sm">{complaint.views} views</button>
        </Card>
      ))}
      {totalPages > 1 && (
        <PaginationBar totalPages={totalPages} currentPage={currentPage} />
      )}
    </section>
  );
};

export default Complaints;
