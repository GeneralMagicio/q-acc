"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconInstagram } from "./Icons/IconInstagram";
import { IconMedium } from "./Icons/IconMedium";
import { IconGithub } from "./Icons/IconGithub";
import { IconReddit } from "./Icons/IconReddit";
import { IconXSocial } from "./Icons/IconXSocial";
import { IconYoutube } from "./Icons/IconYoutube";
import { IconDiscord } from "./Icons/IconDiscord";
import { IconDocs } from "./Icons/IconDocs";
import { IconStar } from "./Icons/IconStar";
import Routes from "@/lib/constants/Routes";
import links from "@/lib/constants/links";

export const Footer: React.FC = () => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-4 lg:mb-0">
            <ul className="space-y-2">
              <li>
                <Link
                  href={Routes.Home}
                  className="text-gray-700 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.Projects}
                  className="text-gray-700 hover:underline"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.AboutUs}
                  className="text-gray-700 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.Faq}
                  className="text-gray-700 hover:underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.Support}
                  className="text-gray-700 hover:underline"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-4 lg:mb-0">
            <ul className="space-y-2">
              <li>
                <Link
                  href={Routes.Join}
                  className="text-gray-700 hover:underline"
                >
                  Join Our Community
                </Link>
              </li>
              <li>
                <Link
                  href={links.DOCS}
                  className="text-gray-700 hover:underline"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.Terms}
                  className="text-gray-700 hover:underline"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href={Routes.Onboarding}
                  className="text-gray-700 hover:underline"
                >
                  Onboarding Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-4 lg:mb-0">
            <ul className="space-y-2">
              <li>
                <Link
                  href={Routes.Partnerships}
                  className="text-gray-700 hover:underline"
                >
                  Partnerships
                </Link>
              </li>
              <li>
                <Link
                  href={links.RECRUITEE}
                  className="text-gray-700 hover:underline"
                >
                  We&apos;re Hiring!
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center sm:gap-8 gap-6">
              <Link
                target="_blank"
                href={links.INSTAGRAM}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconInstagram />
              </Link>
              <Link
                target="_blank"
                href={links.MEDIUM}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconMedium />
              </Link>
              <Link
                target="_blank"
                href={links.GITHUB}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconGithub />
              </Link>
              <Link
                target="_blank"
                href={links.REDDIT}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconReddit />
              </Link>
              <Link
                target="_blank"
                href={links.TWITTER}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconXSocial />
              </Link>
              <Link
                target="_blank"
                href={links.YOUTUBE}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconYoutube />
              </Link>
              <Link
                target="_blank"
                href={links.DISCORD}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconDiscord />
              </Link>
              <Link
                target="_blank"
                href={links.DOCS}
                className="text-gray-700 hover:text-gray-900"
              >
                <IconDocs />
              </Link>
            </div>
            <div>
              <span> Support us </span>
              <Link
                target="_blank"
                href={links.SUPPORT_US}
                className="text-pink-600 hover:underline"
              >
                with your donation
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end items-center border-t border-gray-200 pt-4">
          <button
            className="text-gray-700 hover:underline flex items-center"
            onClick={() => setShowLanguageModal(true)}
          >
            <div className="flex items-center justify-between">
              <IconStar />
              <span> Choose Language</span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
