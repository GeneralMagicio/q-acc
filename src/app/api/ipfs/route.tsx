import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    const pinataResponse = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      },
    );

    return NextResponse.json({ ipfsHash: pinataResponse.data.IpfsHash });
  } catch (error) {
    return NextResponse.json(
      { error: "Error uploading to IPFS" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { ipfsHash } = await request.json();

  try {
    await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`, {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    });

    return NextResponse.json({ message: "File unpinned from IPFS" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error unpinning file from IPFS" },
      { status: 500 },
    );
  }
}
