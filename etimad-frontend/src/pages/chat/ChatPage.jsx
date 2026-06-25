import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import socket from "../../socket";
import { useRef } from "react";
export default function ChatPage() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [offer, setOffer] = useState("");
  const [receiver, setReceiver] = useState("");
const bottomRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
const [showPayment, setShowPayment] = useState(false);
const [selectedOffer, setSelectedOffer] = useState(null);

const [cardData, setCardData] = useState({
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: ""
});
  //   Load messages
  useEffect(() => {
    API.get(`/chat/${id}/messages`).then((res) => {
      setMessages(res.data);

      // 👇 get receiver name
      const other = res.data[0]?.sender;
      if (other) setReceiver(other.name);
    });
  }, [id]);

  //   Join room
  useEffect(() => {
    socket.emit("joinConversation", id);
  }, [id]);

  //   Real-time receive
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);
  useEffect(() => {
  scrollToBottom();
}, [messages]);

  //   Send message
  const sendMessage = async () => {
    const res = await API.post(`/chat/${id}/message`, {
      text,
      offerPrice: offer || null
    });

    socket.emit("sendMessage", {
      ...res.data,
      conversationId: id
    });

    setText("");
    setOffer("");
  };

  //   Accept offer
//   const acceptOffer = async (msgId) => {
//   try {
//     const res = await API.put(`/chat/offer/${msgId}/accept`);

//     setMessages((prev) =>
//       prev.map((m) =>
//         m._id === msgId
//           ? { ...m, offerStatus: "accepted" }
//           : m
//       )
//     );

//     alert("Order created successfully!");
//   } catch (err) {
//     alert("Failed to accept offer");
//   }
// };

const scrollToBottom = () => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
};
const completePayment = async () => {
  try {
    await API.post("/orders/create", {
      messageId: selectedOffer._id,
      ...cardData
    });

    setMessages(prev =>
      prev.map(m =>
        m._id === selectedOffer._id
          ? { ...m, offerStatus: "paid" }
          : m
      )
    );

    setShowPayment(false);

    alert("Payment successful & order created");

  } catch (err) {
    alert("Payment failed");
  }
};


  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      {/* <div className="bg-white p-4 shadow flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Chat with {receiver || "User"}
        </h2>
      </div> */}

      {/* MESSAGES */}
      {/* <div className="flex-1 overflow-y-auto p-6 space-y-4"> */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-28">
        {messages.map((m) => {
          // const isMine = m.sender === currentUser.id;
const senderId =
  typeof m.sender === "object" ? m.sender._id : m.sender;

const isMine = senderId === currentUser._id;
console.log( senderId+"--"+currentUser._id);
          return (
            <div
              key={m._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-4 rounded-2xl shadow ${
                  isMine
                    ? "bg-indigo-600 text-white"
                    : "bg-white"
                }`}
              >
                {/* TEXT */}
                <p>{m.text}</p>

                {/* OFFER */}
                {m.isOffer && (
                  <div className="mt-2 p-2 bg-green-100 text-black rounded-xl">
                    <p className="font-semibold">
                      Offer: Rs.{m.offerPrice}
                    </p>

                    {m.offerStatus === "pending" &&
                      !isMine && (
                        <button
                          onClick={() => {
  setSelectedOffer(m);
  setShowPayment(true);
}}
                          className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Accept
                        </button>
                      )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="bg-white p-4 flex gap-3 sticky bottom-0 border-t">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border p-3 rounded-xl"
        />

        {currentUser.role === "seller" && (
  <input
    value={offer}
    onChange={(e) => setOffer(e.target.value)}
    placeholder="Offer"
    className="w-32 border p-3 rounded-xl"
  />
)}

        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-6 rounded-xl"
        >
          Send
        </button>
      </div>
     {showPayment && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => setShowPayment(false)}
  >

    {/* MODAL */}
    <div
      className="bg-white w-full max-w-md rounded-3xl p-8"
      onClick={(e) => e.stopPropagation()}
    >

      <h2 className="text-2xl font-bold mb-6">
        Enter Card Details
      </h2>

      <input
        placeholder="Card Holder Name"
        className="border p-3 rounded-xl w-full mb-4"
        onChange={(e) =>
          setCardData({
            ...cardData,
            cardName: e.target.value
          })
        }
      />

      <input
        placeholder="Card Number"
        className="border p-3 rounded-xl w-full mb-4"
        onChange={(e) =>
          setCardData({
            ...cardData,
            cardNumber: e.target.value
          })
        }
      />

      <div className="grid grid-cols-2 gap-4 mb-6">

        <input
          placeholder="MM/YY"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setCardData({
              ...cardData,
              expiry: e.target.value
            })
          }
        />

        <input
          placeholder="CVV"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setCardData({
              ...cardData,
              cvv: e.target.value
            })
          }
        />

      </div>

      <button
        onClick={completePayment}
        className="w-full bg-indigo-600 text-white py-4 rounded-2xl"
      >
        Pay & Create Order
      </button>

    </div>
  </div>
)}
    </div>
  );
}