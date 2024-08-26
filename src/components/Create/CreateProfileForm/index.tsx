"use client";

import { useForm, FormProvider } from "react-hook-form";
import Input from "@/components/Input";
import { Dropzone } from "@/components/DropZone";
import { type FC } from "react";
import { Button, ButtonColor, ButtonStyle } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCreateContext } from "../CreateContext";
import CreateNavbar from "../CreateNavbar";
import { requestGraphQL } from "@/helpers/request";
import { getIpfsAddress } from "@/helpers/image";
import { useUpdateUser } from "@/hooks/useUpdateUser";

export interface ProfileFormData {
  fullName: string;
  emailAddress: string;
  emailVerified: boolean;
  profilePhoto: string | null;
}
const CreateProjectForm: FC = () => {
  const { formData, setFormData } = useCreateContext();
  const router = useRouter();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const methods = useForm<ProfileFormData>({
    defaultValues: formData.profile,
    mode: "onChange",
  });
  const { handleSubmit, setValue } = methods;

  const handleDrop = (name: string, file: File, ipfsHash: string) => {
    if (file) {
      setValue(name as keyof ProfileFormData, ipfsHash);
    }
  };

  const verifyEmail = (e: any) => {};

  const onSubmit = async (data: ProfileFormData) => {
    const _user = {
      email: data.emailAddress,
      fullName: data.fullName,
      avatar: data.profilePhoto ? getIpfsAddress(data.profilePhoto) : undefined,
      newUser: true,
    };
    const res: any = await updateUser(_user);
    if (res.updateUser) {
      setFormData({ profile: data });
      router.push("/create/verify-privado");
    }
    console.log("res", res);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateNavbar
          onBack={(event) => {
            event.preventDefault();
            router.push("/");
          }}
          nextLabel="privado"
        />
        <div className=" bg-white w-full mt-5 mb-5 rounded-2xl p-8  shadow-lg">
          <div className="flex flex-col items-start justify-start mb-10">
            <h1 className="font-bold text-[25px]">Create Your Profile</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="border-b-2 text-[18px] font-bold text-[#4F576A] p-1">
              Name & Contact
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto">
              <Input
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                rules={{ required: "Full  Name is required" }}
              />
              <div></div>
              <Input
                name="emailAddress"
                label="Email Address"
                placeholder="Enter your email address"
                rules={{ required: "Email Address is required" }}
              />
              <div className="flex items-center ml-3">
                <Button
                  type="button"
                  onClick={verifyEmail}
                  className="p-4 rounded-full shadow-baseShadow"
                >
                  {"Verify Email Address"}
                </Button>
              </div>
            </div>
            <div className="border-b-2 text-[18px] font-bold text-[#4F576A]">
              Profile Photo
            </div>
            <div className=" w-full md:w-1/3">
              <Dropzone name="profilePhoto" onDrop={handleDrop} />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateProjectForm;
