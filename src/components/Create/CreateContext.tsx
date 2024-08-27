import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TeamMember } from './CreateTeamForm';
import { ProjectFormData } from './CreateProjectForm';

interface FormData {
	project: ProjectFormData;
	team: TeamMember[]; // Ensure team is an array of TeamMember objects
}

interface CreateContextType {
	formData: FormData;
	setFormData: (data: Partial<FormData>) => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export const CreateProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [formData, setFormDataState] = useState<FormData>({
		project: {
			projectName: '',
			projectTeaser: '',
			projectDescription: '',
			website: '',
			facebook: '',
			twitter: '',
			linkedin: '',
			discord: '',
			telegram: '',
			instagram: '',
			reddit: '',
			youtube: '',
			farcaster: '',
			lens: '',
			github: '',
			projectAddress: '',
			addressConfirmed: false,
			logo: null,
			banner: null,
		},
		team: [], // Initialize team as an empty array
	});

	const setFormData = (data: Partial<FormData>) => {
		setFormDataState(prevData => ({
			...prevData,
			...data,
			team: data.team || prevData.team, // Ensure team array is merged correctly
		}));
	};

	return (
		<CreateContext.Provider value={{ formData, setFormData }}>
			{children}
		</CreateContext.Provider>
	);
};

export const useCreateContext = () => {
	const context = useContext(CreateContext);
	if (!context) {
		throw new Error(
			'useCreateContext must be used within a CreateProvider',
		);
	}
	return context;
};
