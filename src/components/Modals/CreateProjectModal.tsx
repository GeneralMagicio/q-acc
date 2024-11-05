import { type FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor } from '../Button';
import Routes from '@/lib/constants/Routes';

interface ConnectModalProps extends BaseModalProps {
  showCloseButton?: boolean;
  slug: string;
}

export const CreateProjectModal: FC<ConnectModalProps> = ({
  slug,
  ...props
}) => {
  const router = useRouter();

  return (
    <Modal {...props} title='Project Created!'>
      <div className='flex flex-col gap-5 '>
        <p>
          Your project is now live on q/acc. You can view the project page to
          see its details, or go to your dashboard to manage and track your
          projects.
        </p>
        <div className='flex justify-between'>
          <Link href={`/project/${slug}`}>
            <div className='w-fit px-[24px] py-[16px] shadow-tabShadow rounded-3xl flex justify-center font-redHatText text-sm items-center'>
              <span className='flex gap-4 text-[#5326EC] font-bold'>
                View Live Project
              </span>
            </div>
          </Link>
          <Button
            className='p-4 shadow-2xl rounded-full text-xs md:text-md min-w-[150px] justify-center'
            color={ButtonColor.Pink}
            onClick={() => {
              router.push(Routes.DashBoard);
            }}
          >
            Go To Dashboard
          </Button>
        </div>
      </div>
    </Modal>
  );
};
