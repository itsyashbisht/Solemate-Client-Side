import { ShoppingCart, Users, IndianRupee } from 'lucide-react';
import StatCard from './StatCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '@/thunks/order.thunk.js';
import { getAllUsers } from '@/thunks/user.thunk.js';
import ShoeCircularLoader from '@/layouts/loader.jsx';
import { toast } from 'react-toastify';

const StatsCards = () => {

  const dispatch = useDispatch();
  const { loading: orderLoading, error: orderError, orders } = useSelector(state => state.order);
  const { loading: userLoading, error: userError, allUsers } = useSelector(state => state.user);

  useEffect(() => {
    if (userError || orderError) {
      toast.error(orderError.message);
      toast.error(userError.message);
    }
  }, [userError, orderError]);

  useEffect(() => {
    if (!orders || !allUsers.length || !allUsers) {
      dispatch(getAllOrders())?.unwrap();
      dispatch(getAllUsers())?.unwrap();
    }
  }, [dispatch]);

  if (orderLoading || userLoading) return <ShoeCircularLoader/>;

  const totalOrders = orders?.length || 0;
  const totalRevenue = orders.map((order) => order.totalAmount).reduce((acc, curr) => acc + curr, 0) || 0;
  const totalUsers = allUsers?.filter((user) => user.role !== 'ADMIN')?.length || 0;

  const stats = [
    {
      id: 1,
      title: 'Total Orders',
      value: totalOrders,
      change: '+12.5%',
      icon: ShoppingCart,
      color: 'blue', // Pass color name instead of class for dynamic styling
    },
    {
      id: 2,
      title: 'Total Revenue',
      value: Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(totalRevenue),
      change: '+8.2%',
      icon: IndianRupee,
      color: 'green',
    },
    {
      id: 3,
      title: 'Total Customers',
      value: totalUsers,
      change: '+5.7%',
      icon: Users,
      color: 'purple',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
