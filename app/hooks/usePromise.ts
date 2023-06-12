import { useCallback, useState } from 'react';

export const usePromise = (): [
	<T>(promise: Promise<T>, callBack: (args: T) => void, errCallBack?: VoidFunction | undefined, fnCallBack?: VoidFunction | undefined) => void,
	boolean | undefined,
	Error,
	boolean,
] => {
	const [isSucces, setIsSucces] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>();
	const [error, setError] = useState<any>();

	const doPromise = useCallback(
		<T>(promise: Promise<T>, callBack: (args: T) => void, errCallBack?: VoidFunction, fnCallBack?: VoidFunction) => {
			setIsLoading(true);
			setError(undefined);
			promise
				.then((res) => {
					callBack(res);
					setIsSucces(true);
				})
				.catch((error: Error) => {
					console.error(error);
					setError(error);
					if (errCallBack) errCallBack();
				})
				.finally(() => {
					setIsLoading(false);
					if (fnCallBack) fnCallBack();
				});
		}, []);

	return [doPromise, isLoading, error, isSucces];
};
