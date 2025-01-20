import { useState, useEffect } from "react";
import { Card, Spinner } from "flowbite-react";
import {
  User,
  Mail,
  Building,
  ChevronRight,
  CircleDollarSign,
} from "lucide-react";
import { api } from "@/api/axios";
import { toast } from "react-toastify";
import MoneyManagementModal from "./MoneyManagementModal";

export function Profile() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 2000 });
      });
  }, []);

  const handleMoneyOperation = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSuccess = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      balance: updatedData.balance,
    }));
  };

  const ProfileItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center flex-1">
        <div className="p-2 rounded-lg bg-blue-50">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-medium text-gray-900">{value}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {loading ? (
        <div className="text-center py-8">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Balance Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full rounded-full bg-blue-500 opacity-10"></div>
            </div>

            <div className="relative">
              <p className="text-sm text-gray-500 mb-1">Available Balance</p>
              <h2 className="text-3xl font-bold mb-4">
                ₹{user?.balance?.toFixed(2)}
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => handleMoneyOperation("add")}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Add Money
                </button>
                <button
                  onClick={() => handleMoneyOperation("withdraw")}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg border border-gray-200 transition-colors duration-200"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </Card>

          {/* Profile Details Card */}
          <Card>
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  alt="Profile"
                  src="/icons8-user-100.png"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{user?.name}</h3>
                <p className="text-gray-500 text-sm">
                  {user?.user_type} Account
                </p>
              </div>
            </div>

            <ProfileItem icon={User} label="Username" value={user?.username} />
            <ProfileItem icon={Mail} label="Email" value={user?.email} />
            <ProfileItem icon={Building} label="Broker" value={user?.broker} />
            <ProfileItem
              icon={CircleDollarSign}
              label="Account Type"
              value={user?.user_type}
            />
          </Card>
        </div>
      )}

      <MoneyManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        currentBalance={user?.balance || 0}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
