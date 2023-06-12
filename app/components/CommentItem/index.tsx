import React, { useState } from 'react';
import CommentForm, { IComment } from '../CommentForm';
import styles from './CommentItem.module.css';
import { Button } from 'antd';

interface ICommentItem {
	comment: IComment;
}

export default function CommentItem({ comment }: ICommentItem) {
	const [replyForm, setReplyForm] = useState(false);

	return (
		<div className={styles.commentItem}>
			<div className={styles.commentItem_wrp}>
				<div className={styles.commentItem_name}>{comment.name}</div>
				<div className={styles.commentItem_text}>{comment.text}</div>
			</div>
			{!replyForm ? (
				<Button type='text' style={{ margin: 0, padding: 0 }} onClick={() => setReplyForm(prev => !prev)}>
					Ответить
				</Button>
			) : (
				<CommentForm setReplyForm={setReplyForm} />
			)}
		</div>
	);
}
