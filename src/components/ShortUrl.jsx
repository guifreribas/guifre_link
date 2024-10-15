"use client";
import { useState } from "react";

export default function ShortUrlForm() {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	// const handleUrlSubmit = (e) => {
	// 	e.preventDefault();
	// 	const fakeShortUrl = `https://guifre.link/${Math.random()
	// 		.toString(36)
	// 		.substring(2, 7)}`;
	// 	setShortUrl(fakeShortUrl);
	// };

	const handleUrlSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch("/api/shorten", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ originalUrl }),
		});
		const data = await res.json();
		console.log({ data });
		setShortUrl(data.shortUrl);
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800'>
			<div className='max-w-lg w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-6'>
				<h1 className='text-2xl font-bold mb-4 text-center'>
					{`Retallador d'URL`}
				</h1>
				<p className='mb-6 text-center text-gray-600 dark:text-gray-400'>
					Introdueix la teva URL i retalla-la per obtenir un enllaç
					més curt i fàcil de compartir.
				</p>

				<form
					onSubmit={handleUrlSubmit}
					className='mb-6'
				>
					<div className='mb-4'>
						<label
							htmlFor='url'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'
						>
							URL Original:
						</label>
						<input
							type='url'
							id='url'
							value={originalUrl}
							onChange={(e) => setOriginalUrl(e.target.value)}
							required
							className='mt-1 block w-full p-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400'
							placeholder='https://example.com'
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
					>
						Retallar URL
					</button>
				</form>

				{shortUrl && (
					<div className='bg-green-100 dark:bg-green-800 p-4 rounded-lg text-center'>
						<p className='text-green-800 dark:text-green-300'>
							URL Retallada:
						</p>
						<a
							href={shortUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='font-medium text-green-600 dark:text-green-400'
						>
							{shortUrl}
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
