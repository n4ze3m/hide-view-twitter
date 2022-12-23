import { useEffect, useState } from "react";
import "./style.css";
import { Switch } from "@headlessui/react";

function IndexPopup() {
	const [loading, setLoading] = useState(true);
	const [showBanner, setShowBanner] = useState(false);

	const fetchSettings = async () => {
		const hideViewCountTweets = await chrome.storage.local.get([
			"hideViewCountTweets",
		]);

		let value = hideViewCountTweets.hideViewCountTweets;

		const isEmptyItem =
			Object.keys(hideViewCountTweets).length === 0 &&
			hideViewCountTweets.constructor === Object;

		if (isEmptyItem) {
			await chrome.storage.local.set({ hideViewCountTweets: true });
			value = true;
		}

		return [
			{
				value: value,
				label: "Hide views count from timeline",
				key: "hideViewCountTweets",
			},
		];
	};

	const [data, setData] = useState([]);

	useEffect(() => {
		fetchSettings().then((data) => {
			setData(data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="bg-white w-96 h-96 p-6  flex flex-col">
			<main className="flex-1 overflow-y-auto no-scrollbar">
				<h3 className="text-lg font-bold uppercase">Settings</h3>
				<div className="border-b border-gray-200 my-4" />
				<div className="flex items-center justify-between">
					{loading ? <div>Loading Settings...</div> : null}
					{data.map((item, index) => {
						return (
							<div key={index} className="flex items-center justify-between">
								<div className="flex items-center">
									<Switch
										checked={item.value}
										onChange={() => {
											chrome.storage.local.set({ [item.key]: !item.value });

											setData(
												data.map((d) => {
													if (d.key === item.key) {
														return {
															...d,
															value: !d.value,
														};
													}
													return d;
												}),
											);
											setShowBanner(true);
										}}
										className={`${
											item.value ? "bg-blue-600" : "bg-gray-200"
										} relative inline-flex items-center h-6 rounded-full w-11`}
									>
										<span className="sr-only">Use setting</span>
										<span
											className={`${
												item.value ? "translate-x-6" : "translate-x-1"
											} inline-block w-4 h-4 transform bg-white rounded-full`}
										/>
									</Switch>
									<label htmlFor="comments" className="ml-3">
										<span className="block text-sm font-medium text-gray-900">
											{item.label}
										</span>
									</label>
								</div>
							</div>
						);
					})}
				</div>
				{showBanner ? (
					<div
						className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
						role="alert"
					>
						<span className="block sm:inline">
							Settings saved successfully. Refresh your Twitter page to see the
							changes.
						</span>
					</div>
				) : null}
			</main>
			<footer className="text-center text-sm flex justify-center space-x-2">
				<a href="https://twitter.com/n4ze3m" target="_blank" rel="noreferrer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-blue-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
						/>
					</svg>
				</a>
				<a
					href="https://github.com/n4ze3m/hide-view-twitter"
					target="_blank"
					rel="noreferrer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-blue-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
						/>
					</svg>
				</a>
			</footer>
		</div>
	);
}

export default IndexPopup;
