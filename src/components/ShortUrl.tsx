"use client";
import { BASE_URL } from "@/app/config/constants";
import { FormEvent, useState } from "react";

export default function ShortUrlForm() {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	const handleUrlSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const res = await fetch("/api/shorten", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ originalUrl }),
		});
		const data = await res.json();
		setShortUrl(data.shortUrl);
	};

	const handleCopyUrl = async (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!shortUrl) return;
		try {
			await navigator.clipboard.writeText(`${BASE_URL}${shortUrl}`);
		} catch (error) {
			console.error("Error copiant l'URL al porta-retalls:", error);
		}
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
					onSubmit={(e) => handleUrlSubmit(e)}
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
					<div
						className='bg-green-100 dark:bg-green-800 p-4 rounded-lg text-center hover:cursor-pointer hover:bg-green-900 transition-all duration-150'
						onClick={(e) => handleCopyUrl(e)}
					>
						<div className='full flex justify-end'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='lucide lucide-clipboard-list'
							>
								<rect
									width='8'
									height='4'
									x='8'
									y='2'
									rx='1'
									ry='1'
								/>
								<path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
								<path d='M12 11h4' />
								<path d='M12 16h4' />
								<path d='M8 11h.01' />
								<path d='M8 16h.01' />
							</svg>
						</div>

						<p className='text-green-800 dark:text-green-300'>
							URL Retallada:
						</p>
						<p className='text-green-900 dark:text-green-100'>
							{BASE_URL}{shortUrl}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
