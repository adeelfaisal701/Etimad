import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/chat/conversations")
      .then(res => setConversations(res.data))
      .catch(() => alert("Failed to load chats"));
  }, []);

  const pathPre =  JSON.parse(localStorage.getItem("user")).role == "seller"?"seller":"buyer-dashboard";

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Inbox</h1>

      <div className="space-y-4">
        {conversations.map((c) => {
          const otherUser = c.members.find(
            (m) => m._id !== JSON.parse(localStorage.getItem("user")).id
          );

          return (
            <div
              key={c._id}
              onClick={() => navigate(`/${pathPre}/chat/${c._id}`)}
              className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-50"
            >
              <h2 className="font-bold">{otherUser?.name}</h2>
              <p className="text-sm text-gray-500">
                Product: {c.product?.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}