import styles from './page.module.css';
import AlbumComponent from './components/Album/index';

export default function Home() {
	return (
		<main className={styles.main}>
			<AlbumComponent />
		</main>
	);
}
