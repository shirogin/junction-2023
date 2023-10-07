import { useAskChatMutation, useGetAllMessagesQuery } from "@/app/backend/export/chat";
import useNavbar from "@/hooks/useNavbar";
import usePageTitle from "@/hooks/usePageTitle";
import { Microphone2, Send2 } from "iconsax-react";
import { useEffect, useState } from "react";
import Error500 from "../Errors/Error500";
import Fallback from "@/Components/Fallback";
import Loading from "@/Components/Loading";

function Question({ message }: { message: string }) {
	return (
		<div className="chat chat-end">
			<div className="chat-bubble">{message}</div>
		</div>
	);
}
function Answer({ message }: { message: string }) {
	return (
		<div className="chat chat-start">
			<div className="chat-bubble">{message}</div>
		</div>
	);
}

export default function Chat() {
	usePageTitle("Finance chat");
	const { data: responses, isFetching, refetch } = useGetAllMessagesQuery();
	const [AskChat, { isLoading: isAsking }] = useAskChatMutation();
	const { setIsOpen } = useNavbar();
	const [message, setMessage] = useState<string>("");
	useEffect(() => {
		setIsOpen(true);
		// scroll to the bottom of the chat
		const chat = document.querySelector(".flex.flex-col.pb-24.overflow-y-auto.no-scrollbar");
		if (chat) {
			chat.scrollTop = chat.scrollHeight;
		}
		return () => {
			setIsOpen(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (isFetching) return <Fallback />;
	if (!responses) return <Error500 />;
	const { data: messages } = responses;
	return (
		<div className="flex flex-col relative h-full justify-end w-full px-6 bg-gray-200">
			<div className="flex flex-col gap-4 pb-24 overflow-y-auto no-scrollbar">
				{messages.map((message) =>
					message.chat.role === "user" ? <Question message={message.chat.content} /> : <Answer message={message.chat.content} />
				)}
			</div>
			<div className="flex absolute bottom-4 left-0 w-full px-6 gap-4">
				<div className="w-full flex relative text-black">
					<input
						className="input rounded-full w-full bordered border-4 pr-12"
						placeholder="Type a message..."
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						disabled={isAsking}
						value={message}
					/>
					<Microphone2 className="absolute right-4 top-1/2 transform -translate-y-1/2" />
				</div>
				<button
					className="btn btn-secondary btn-circle"
					disabled={isAsking}
					onClick={() => {
						AskChat(message)
							.then(() => {
								setMessage("");
								refetch();
							})
							.catch(() => {
								refetch();
							});
					}}
				>
					{isAsking ? <Loading /> : <Send2 />}
				</button>
			</div>
		</div>
	);
}
