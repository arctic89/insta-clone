'use client';
import React, { useEffect, useState } from 'react';
import { useAppData } from '../context/AppContext';
import Image from 'next/image';
import styles from './page.module.css';
import CommentForm, { IComment } from '../components/CommentForm';
import CommentItem from '../components/CommentItem';

type PostType = {
	params: {
		id: string;
	};
};

export default function Post({ params: { id } }: PostType) {
	const { pageData, setPageId, isLoading, isError, comments, setComments } = useAppData();

	useEffect(() => {
		setPageId(id);
	}, [id]);

	if (pageData && !isLoading && !isError)
		return (
			<div>
				<div className={styles.imageWrapper}>
					{pageData.url ? <Image src={pageData.url} alt={pageData.title} fill /> : 'Картинка не загрузилась'}
					<span>{pageData.title}</span>
				</div>
				<div className={styles.commentsWrapper}>{comments.length > 0 ? comments.map(it => <CommentItem key={it.id} comment={it} />) : <></>}</div>
			</div>
		);
	if (isLoading) return <h2>Loading...</h2>;
	if (isError && !isLoading) return <h2>{isError.message}</h2>;
}
