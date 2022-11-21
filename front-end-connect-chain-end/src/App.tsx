import { useEffect, useState } from "react";
import { connect, getOwnBalance } from "./chain/web3Client.js";

declare global {
	interface Window {
		ethereum: any;
	}
}

function App() {
	const [address, setAddress] = useState<string>("");
	console.log(address);
	return (
		<div>
			<button
				onClick={async () => {
					const account = await connect();
					if (account) {
						setAddress(account);
					}
				}}
			>
				Connect
			</button>
			<button
				onClick={async () => {
					console.log("nft类型个数：" + (await getOwnBalance(address, 2)));
				}}
			>
				getOwnBalance
			</button>
		</div>
	);
}

export default App;
