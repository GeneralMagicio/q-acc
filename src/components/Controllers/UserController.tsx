'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
	fetchUserInfo,
	fetchGivethUserInfo,
	checkUserIsWhiteListed,
} from '../../services/user.service';
import { CompleteProfileModal } from '../Modals/CompleteProfileModal';
import Routes from '@/lib/constants/Routes';
import { SignModal } from '../Modals/SignModal';
import { getLocalStorageToken } from '@/helpers/generateJWT';
import { useUpdateUser } from '@/hooks/useUpdateUser';

export const UserController = () => {
	const [showCompleteProfileModal, setShowCompleteProfileModal] =
		useState(false);
	const [showSignModal, setShowSignModal] = useState(false);
	const { address } = useAccount();
	const isGivethUser = useRef(false);
	const route = useRouter();
	const { mutateAsync: updateUser } = useUpdateUser();
	const { data: user, isFetched } = useQuery({
		queryKey: ['user', address],
		queryFn: async () => {
			console.log('fetching user info');
			if (!address) return;
			let data = await fetchUserInfo(address);
			if (!data) {
				const givethData = await fetchGivethUserInfo(address);
				if (givethData && givethData.name) {
					isGivethUser.current = true;
					data = {
						id: givethData.id,
						email: givethData.email,
						fullName: givethData.name,
						avatar: givethData.avatar,
					};
				}
			}
			return data;
		},
		enabled: !!address,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	const onSign = useCallback(async () => {
		console.log('Signed');
		setShowSignModal(false);

		// Save user info to QAcc if user is Giveth user
		if (isGivethUser.current && user) {
			const _user = {
				email: user.email || undefined,
				fullName: user.fullName,
				avatar: user.avatar,
				newUser: true,
			};
			updateUser(_user);
		}

		// Check user profile completion
		if (!user?.email || !user?.fullName) {
			setShowCompleteProfileModal(true);
		}

		// Check if user is whitelisted
		const isUserWhiteListed = await checkUserIsWhiteListed(address);
		if (isUserWhiteListed) {
			const isUserCreatedProject = false;
			if (!isUserCreatedProject) {
				route.push(Routes.Create);
			}
		}
	}, [address, route, updateUser, user]);

	useEffect(() => {
		if (!address || !isFetched) return;
		const localStorageToken = getLocalStorageToken(address);

		// Show sign modal if token is not present in local storage
		if (localStorageToken) {
			onSign();
			return;
		}
		setShowSignModal(true);
	}, [address, isFetched, onSign]);

	return showSignModal ? (
		<SignModal
			isOpen={showSignModal}
			onClose={() => setShowSignModal(false)}
			onSign={onSign}
		/>
	) : showCompleteProfileModal ? (
		<CompleteProfileModal
			isOpen={showCompleteProfileModal}
			onClose={() => setShowCompleteProfileModal(false)}
		/>
	) : null;
};
