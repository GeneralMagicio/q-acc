import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { IconABC } from "../Icons/IconABC";
import { IconShare } from "../Icons/IconShare";
import { IconViewTransaction } from "../Icons/IconViewTransaction";
import { IconSort } from "../Icons/IconSort";

const ProjectDonationTable = () => {
  const [page, setPage] = useState<number>(0);
  const pageDonations = {
    donations: [
      {
        id: "1",
        createdAt: "2024-08-26T10:00:00Z",
        donationType: "REGULAR",
        anonymous: false,
        user: {
          id: "user-1",
          name: "John Doe",
          profilePicture: "https://example.com/john-doe.jpg",
        },
        status: "Completed",
        transactionNetworkId: 1,
        chainType: "Ethereum",
        amount: "100.00",
        currency: "ETH",
        transactionId:
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        valueUsd: "250.00",
      },
      {
        id: "2",
        createdAt: "2024-08-25T09:30:00Z",
        donationType: "POIGNART",
        anonymous: true,
        user: null,
        status: "Pending",
        transactionNetworkId: 137,
        chainType: "Polygon",
        amount: "200.00",
        currency: "MATIC",
        transactionId:
          "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
        valueUsd: "150.00",
      },
      {
        id: "3",
        createdAt: "2024-08-24T15:20:00Z",
        donationType: "REGULAR",
        anonymous: false,
        user: {
          id: "user-2",
          name: "Jane Smith",
          profilePicture: "https://example.com/jane-smith.jpg",
        },
        status: "Completed",
        transactionNetworkId: 1,
        chainType: "Ethereum",
        amount: "50.00",
        currency: "ETH",
        transactionId:
          "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        valueUsd: "125.00",
      },
      {
        id: "4",
        createdAt: "2024-08-23T08:10:00Z",
        donationType: "REGULAR",
        anonymous: true,
        user: null,
        status: "Failed",
        transactionNetworkId: 56,
        chainType: "BinanceSmartChain",
        amount: "300.00",
        currency: "BNB",
        transactionId:
          "0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef",
        valueUsd: "180.00",
      },
      {
        id: "5",
        createdAt: "2024-08-22T11:45:00Z",
        donationType: "REGULAR",
        anonymous: false,
        user: {
          id: "user-3",
          name: "Michael Brown",
          profilePicture: "https://example.com/michael-brown.jpg",
        },
        status: "Completed",
        transactionNetworkId: 137,
        chainType: "Polygon",
        amount: "75.00",
        currency: "MATIC",
        transactionId:
          "0x123456abcdef123456abcdef123456abcdef123456abcdef123456abcdef123456",
        valueUsd: "95.00",
      },
    ],
  };

  useEffect(() => {
    const fetchProjectDonations = async () => {};
    fetchProjectDonations();
  }, [page]);
  const orderChangeHandler = (header: any) => {
    console.log("s");
  };

  const rowHeaders = [
    "Donor",
    "Donated On",
    "Round",
    "Amount [MATIC]",
    "Reward Token",
  ];

  return (
    <div className="bg-white">
      <div className=" container flex  flex-col py-10 gap-10">
        <div>
          <h1>All Donations</h1>
        </div>
        {/* <div className="flex gap-10 md:flex-row flex-col  items-center">
          <div className="w-[80%] overflow-x-auto ">
            <table className="w-full table-auto">
              <thead>
                <tr className="flex justify-between border-b-2">
                  <th className="p-2 flex gap-2 ">
                    Donor <IconABC />
                  </th>
                  <th className="p-2 flex gap-2 ">
                    Donated On <IconABC />
                  </th>
                  <th className="p-2 flex gap-2 ">
                    Round <IconABC />
                  </th>
                  <th className="p-2 flex gap-2 ">
                    Amount[MATIC] <IconABC />
                  </th>
                  <th className="p-2 flex gap-2 ">
                    Reward Token <IconABC />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex gap-2 justify-start ">
                  <td className="p-2">sds</td>
                  <td>sd</td>
                  <td>sd</td>
                  <td>sd</td>
                  <td>sd</td>
                </tr>
              </tbody>
            </table>
            <div className=" flex  justify-center">
              <Pagination
                currentPage={page}
                totalCount={30}
                setPage={setPage}
                itemPerPage={10}
              />
            </div>
          </div>

          <div className="p-6 w-[310px]  shadow-lg rounded-lg"></div>
        </div> */}

        <div className="flex flex-col w-[80%] font-redHatText">
          <div className="flex justify-between border-b-4">
            {rowHeaders.map((rowHeader, index) => (
              <div
                key={index}
                className="p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center"
              >
                {rowHeader}
                <button onClick={() => orderChangeHandler(rowHeader)}>
                  <IconSort size={16} />
                </button>
              </div>
            ))}
          </div>

          {pageDonations.donations.map((donation) => (
            <>
              <div className=" flex justify-between border-b">
                <div className="p-[18px_4px] flex gap-2 text-start  w-full">
                  {donation.user ? donation.user.name : "Anonymous"}
                </div>
                <div className="p-[18px_4px] flex gap-2 text-start  w-full">
                  {new Date(donation.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    year: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="p-[18px_4px] flex gap-2 text-start  w-full">
                  Early Bird
                </div>
                <div className="p-[18px_4px] flex gap-2 text-start  w-full">
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      <span className="font-medium">1200</span>
                      <IconViewTransaction size={16} />
                    </div>

                    <span className="text-xs font-medium text-[#A5ADBF]">
                      $ 233
                    </span>
                  </div>
                </div>
                <div className="p-[18px_4px] flex gap-2 text-start  w-full">
                  600 ABC
                </div>
              </div>
            </>
          ))}

          <div className="flex justify-center">
            <Pagination
              currentPage={page}
              totalCount={30}
              setPage={setPage}
              itemPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDonationTable;
