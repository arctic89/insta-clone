'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Album.module.css';
import Link from 'next/link';
import { AlbumData, useAppData } from '@/app/context/AppContext';
import { useIsVisible } from '@/app/hooks/useIsVisible';

export default function AlbumComponent() {
	const getMoreImagesRef = useRef<HTMLDivElement>(null);
	const { imagesData, isLoading, isError, setPageAlbum } = useAppData();
	const isVisible = useIsVisible(getMoreImagesRef);
	const [albumState, setAlbumState] = useState<AlbumData[]>([]);

	useEffect(() => {
		if (isVisible) {
			setPageAlbum(prev => prev + 1);
		}
	}, [isVisible]);

	return (
		<div className={styles.albumWrapper}>
			{imagesData.map(item => (
				<Link href={`/${item.id}`} key={item.id} className={styles.imgWrapper}>
					<Image src={item.url} alt={item.title} fill />
				</Link>
			))}
			<div ref={getMoreImagesRef}></div>
		</div>
	);
}
