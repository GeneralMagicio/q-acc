"use client";

import { useForm, FormProvider } from "react-hook-form";
import { type FC } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { Dropzone } from "@/components/DropZone";
import { Button } from "@/components/Button";
import CreateNavbar from "../CreateNavbar";
import { getIpfsAddress } from "@/helpers/image";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useIsUserWhiteListed } from "@/hooks/useIsUserWhiteListed";

export interface ProfileFormData {
  fullName: string;
  emailAddress: string;
  emailVerified: boolean;
  profilePhoto: string | null;
}
const CreateProjectForm: FC = () => {
  const router = useRouter();
  const { data: user } = useFetchUser();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const { data: isUserWhiteListed } = useIsUserWhiteListed();

  const methods = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user?.fullName || "",
      emailAddress: user?.email || "",
      profilePhoto: user?.avatar || null,
    },
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
      const dest = isUserWhiteListed
        ? "/create/project"
        : "/create/verify-privado";
      router.push(dest);
    }
    console.log("res", res);
  };

  const nextLabel = isUserWhiteListed ? undefined : "Verify your identity";
  const submitLabel = isUserWhiteListed
    ? "Save & Create Project"
    : "Save & Continue";

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateNavbar
          title="Create Your Profile"
          nextLabel={nextLabel}
          submitLabel={submitLabel}
          loading={isPending}
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
