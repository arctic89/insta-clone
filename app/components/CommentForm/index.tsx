'use client';
import { Button, Input } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import styles from './CommentForm.module.css';
import { useAppData } from '@/app/context/AppContext';

export interface IComment {
	id: string;
	name: string;
	text: string;
}

interface ICommentForm {
	setReplyForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentForm({ setReplyForm }: ICommentForm) {
	const [comment, setComment] = useState<IComment>({ id: '', name: '', text: '' });
	const { comments, setComments } = useAppData();

	return (
		<form className={styles.form}>
			<Input
				type='text'
				placeholder='Введите имя'
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					return setComment(prev => ({ ...prev, name: e.target.value }));
				}}
			/>
			<Input
				type='text'
				placeholder='Введите ответ'
				onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(prev => ({ ...prev, text: e.target.value }))}
			/>
			<Button
				onClick={e => {
					e.preventDefault();
					if (!!comment.name && !!comment.text) {
						setComments(prev => [...prev, { ...comment, id: (comments.length + 1).toString() }]);
						setReplyForm(prev => !prev);
					}
				}}
				type='default'>
				Отправить ответ
			</Button>
		</form>
	);
}
