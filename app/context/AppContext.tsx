'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePromise } from '../hooks/usePromise';
import { isErrored } from 'stream';
import { IComment } from '../components/CommentForm';

export interface AlbumData {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

interface IAppContext {
	imagesData: AlbumData[];
	isLoading: boolean | undefined;
	isError: Error;
	setPageId: React.Dispatch<React.SetStateAction<number | string | undefined>>;
	setPageData: React.Dispatch<React.SetStateAction<AlbumData | undefined>>;
	pageData: AlbumData | undefined;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
	setPageAlbum: React.Dispatch<React.SetStateAction<number>>;
	comments: IComment[];
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppData = () => {
	const applicationsContext = useContext(AppContext);
	if (applicationsContext === null) {
		throw new Error('No ApplicationsContext.Provider found when calling useApplications.');
	}
	return applicationsContext;
};

export const AppProvider: React.FunctionComponent<{ children: React.ReactNode }> = props => {
	const [images, setImages] = useState<AlbumData[]>([]);
	const [pageData, setPageData] = useState<AlbumData>();
	const [pageId, setPageId] = useState<number | string>();
	const [doPromise, isLoading, isError, isSuccess] = usePromise();
	const [comments, setComments] = useState<IComment[]>([{ id: '1', name: 'Тестер Тестович', text: 'А неплохо!' }]);
	const [pageAlbum, setPageAlbum] = useState(0);

	useEffect(() => {
			fetch(`https://jsonplaceholder.typicode.com/photos?_page=${pageAlbum}&_limit=21`)
			.then(res => res.json())
			.then((res)=>setImages(prev => [...prev, ...res]))
	}, [pageAlbum]);

	useEffect(() => {
		doPromise(
			fetch(`https://jsonplaceholder.typicode.com/photos/${pageId}`).then(res => res.json()),
			setPageData
		);
	}, [pageId]);

	return (
		<AppContext.Provider value={{ imagesData: images, isLoading, isError, pageData, setPageData, setPageId, comments, setComments, setPageAlbum }}>
			{props.children}
		</AppContext.Provider>
	);
};
