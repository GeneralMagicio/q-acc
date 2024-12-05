import { useState, type FC } from 'react';
import Link from 'next/link';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import Modal, { BaseModalProps } from '../Modal';
import { IconShare } from '../Icons/IconShare';
import { IconXSocial } from '../Icons/IconXSocial';
import { IconLinkedin } from '../Icons/IconLinkedin';
import { IconFacebook } from '../Icons/IconFacebook';
import { IconFarcaster } from '../Icons/IconFarcaster';

interface ShareProjectModalProps extends BaseModalProps {
  showCloseButton?: boolean;
  projectSlug: string;
}

export const ShareProjectModal: FC<ShareProjectModalProps> = ({
  projectSlug,
  onClose,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const copyLink = `${url.protocol}//${url.host}/project/${projectSlug}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(copyLink)
      .then(() => {
        console.log('Domain name copied to clipboard:', copyLink);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(error => {
        console.error('Failed to copy domain name:', error);
      });
  };

  return (
    <Modal
      onClose={onClose}
      {...props}
      title={'Share'}
      titleIcon={<IconShare size={24} color='black' />}
    >
      <div className='flex flex-col gap-5 font-redHatText'>
        <h1 className='text-[#1D1E1F] font-bold text-[25px] text-center'>
          Share this with your friend!
        </h1>
        <div className='flex justify-center gap-3'>
          <div className='border rounded-lg p-2 flex items-center'>
            <TwitterShareButton
              title={projectSlug || ''}
              url={copyLink || ''}
              hashtags={['Qacc']}
            >
              <IconXSocial size={24} />
            </TwitterShareButton>
          </div>
          <div className='border rounded-lg p-2 flex items-center'>
            <LinkedinShareButton title={projectSlug} url={copyLink || ''}>
              <IconLinkedin size={24} />
            </LinkedinShareButton>
          </div>
          <div className='border rounded-lg p-2 flex items-center'>
            <FacebookShareButton
              title={projectSlug || ''}
              url={copyLink || ''}
              hashtag='#Qacc'
            >
              <IconFacebook size={24} />
            </FacebookShareButton>
          </div>
          <div className='border rounded-lg p-2 flex items-center'>
            <Link
              href={`https://warpcast.com/~/compose?embeds[]=${copyLink}&text=${projectSlug}`}
              target='_blank'
            >
              <IconFarcaster size={24} />
            </Link>
          </div>
        </div>
        <div className='flex justify-center'>
          <p className='text-[#1D1E1F] font-medium text-xl text-center'>
            Or copy the link
          </p>
        </div>

        <div className='w-full border rounded-md p-2 flex gap-2 items-center justify-between '>
          <span className='text-[#3396FF]'> {copyLink}</span>
          <div
            onClick={handleCopy}
            className='p-3  rounded-full cursor-pointer text-pink-400 text-sm font-medium bg-white shadow-baseShadow'
          >
            Copy Link
          </div>
        </div>
        {copied && <span className=''>Copied Link to Project</span>}

        <div className='text-center'>
          <span
            className='cursor-pointer  text-sm font-medium text-[#a3b0f6] hover:text-[#f472b6]'
            onClick={onClose}
          >
            Dismiss
          </span>
        </div>
      </div>
    </Modal>
  );
};
