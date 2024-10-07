import { auth } from "@/auth";
import { db } from "@/lib/db";
import React from "react";
import Complaints, { getRelativeTime } from "../_components/Complaints";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import PaginationBar from "@/components/shared/PaginationBar";

const page = async ({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) => {
  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const userId = await auth();
  const complaints = await db.complaint.findMany({
    where: {
      userId: userId?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  const totalPages = complaints.length;
  const userComplaints = await db.complaint.findMany({
    where: {
      userId: userId?.user?.id,
    },
  });

  const countViews = userComplaints
    .map((view) => view.views)
    .reduce((a, b) => a + b, 0);
  return (
    <section>
      <div className="container px-4 py-6">
        <div className="mb-4">
          <h1 className="font-heading text-xl font-normal leading-tight text-gray-900 lg:text-2xl">
            Profile
          </h1>
        </div>
        <div className="border-2 border-gray-100 rounded-lg w-fit p-2 flex gap-2">
          <div className="flex items-center justify-center w-36 h-36  bg-gray-200 ">
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${userId?.user?.name}`}
              alt="User"
              className="h-36 w-36"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="mt-4 text-lg font-semibold">
              Name : {userId?.user?.name}
            </h2>
            <p className="text-sm text-gray-500">
              Email : {userId?.user?.email}
            </p>
            <p>Total views : {countViews}</p>
          </div>
        </div>
      </div>
      <div>
        <section className="space-y-4">
          {complaints.map((complaint) => (
            <Card
              key={complaint.id}
              className="p-4 w-full max-w-[60%] ml-2 hover:cursor-pointer hover:shadow-lg "
            >
              <Link href={`/complaint/${complaint.id}`}>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-normal text-lg text-ellipsis">
                    {complaint.title}
                  </span>
                  <span className="text-gray-500 text-xs font-normal w-20">
                    {getRelativeTime(complaint.createdAt.toISOString())}
                  </span>
                </CardTitle>
                <CardContent className="py-4 max-h-28 text-ellipsis overflow-hidden whitespace-wrap">
                  <p className="text-gray-800">{complaint.description}</p>
                </CardContent>
              </Link>

              <button className="text-xs text-green-600 hover:underline">
                Comment
              </button>
            </Card>
          ))}
          {totalPages > 1 && (
            <PaginationBar totalPages={totalPages} currentPage={currentPage} />
          )}
        </section>
      </div>
    </section>
  );
};

export default page;
