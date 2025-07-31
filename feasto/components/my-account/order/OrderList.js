'use client';

import { useEffect, useMemo, useState } from "react";
import { fetchOrdersByUser, createOrder, updateOrder } from "@/lib/firebase/orders";
import { useAuthStore } from "@/lib/stores/authStore";
import OrderCard from "./OrderCard";
import TabButton from "./TabButton";
import { toast } from "react-toastify";
import EditableOrder from "./UpdateOrder";
import menuItems from '@/data/food.json';
import { useTranslations } from "next-intl";

export default function OrderList({ searchTerm }) {
  const t = useTranslations("Orders");
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dine-in");
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;
    async function loadOrders() {
      setLoading(true);
      try {
        const data = await fetchOrdersByUser(user.uid);
        setOrders(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [user]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return orders.filter((order) => {
      const orderNumberMatch = order.orderNumber?.toString().includes(term);
      const fullNameMatch = order.formData.fullName?.toLowerCase().includes(term);
      const statusMatch = order.status?.toLowerCase().includes(term);
      const itemMatch = order.items.some((item) => item.name.toLowerCase().includes(term));
      return orderNumberMatch || fullNameMatch || statusMatch || itemMatch;
    });
  }, [orders, searchTerm]);

  const dineInOrders = filteredOrders.filter((o) => o.type === "dine-in");
  const deliveryOrders = filteredOrders.filter((o) => o.type === "delivery");

  const sortedOrders = useMemo(() => {
    const list = activeTab === "dine-in" ? dineInOrders : deliveryOrders;
    return list.slice().sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
      return dateB - dateA;
    });
  }, [activeTab, dineInOrders, deliveryOrders]);

  async function handleCancel(orderId) {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-800">
            {t("cancelConfirmMessage")}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                try {
                  await updateOrder(orderId, { status: "cancelled" });
                  toast.success(t("cancelSuccess"));
                  const updated = await fetchOrdersByUser(user.uid);
                  setOrders(updated || []);
                } catch (e) {
                  toast.error(t("cancelFail"));
                }
                closeToast();
              }}
            >
              {t("yes")}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
              onClick={closeToast}
            >
              {t("no")}
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  }

  async function handleReorder(order) {
    try {
      await createOrder({
        formData: order.formData,
        items: order.items,
        type: order.type,
        userId: user.uid,
        status: "pending",
        total: order.total,
        createdAt: new Date(),
      });
      toast.success(t("reorderSuccess"));
      const updated = await fetchOrdersByUser(user.uid);
      setOrders(updated || []);
    } catch (e) {
      toast.error(t("reorderFail"));
    }
  }

  function openEditModal(order) {
    setEditingOrder(order);
  }

  function closeEditModal() {
    setEditingOrder(null);
  }

  if (!user) {
    return <p className="text-center text-red-600 font-semibold">{t("pleaseLogin")}</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-600 font-medium">{t("loadingOrders")}</p>;
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto flex justify-center border-b border-gray-300 dark:border-gray-700 mb-8">
        <TabButton active={activeTab === "dine-in"} onClick={() => setActiveTab("dine-in")}>
          {t("tabs.dineIn")} ({dineInOrders.length})
        </TabButton>
        <TabButton active={activeTab === "delivery"} onClick={() => setActiveTab("delivery")}>
          {t("tabs.delivery")} ({deliveryOrders.length})
        </TabButton>
      </div>

      {sortedOrders.length === 0 ? (
        <p className="text-center text-gray-500 italic">{t("noOrdersFound")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {sortedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancel={() => handleCancel(order.id)}
              onReorder={() => handleReorder(order)}
              onEdit={() => openEditModal(order)}
            />
          ))}
        </div>
      )}
      {editingOrder && (
        <EditableOrder
          order={editingOrder}
          menuItems={menuItems}
          onSave={async (updatedItems) => {
            try {
              const newTotal = updatedItems.reduce((sum, item) => sum + item.qty * item.price, 0);
              await updateOrder(editingOrder.id, { items: updatedItems, total: newTotal });
              const updated = await fetchOrdersByUser(user.uid);
              setOrders(updated || []);
              toast.success(t("orderUpdateSuccess"));
            } catch {
              toast.error(t("orderUpdateFail"));
            } finally {
              closeEditModal();
            }
          }}
          onCancel={closeEditModal}
        />
      )}
    </div>
  );
}
