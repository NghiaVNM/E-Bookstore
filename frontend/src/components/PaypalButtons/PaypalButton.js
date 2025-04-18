import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import { useLoading } from '../../hook/useLoading';
import { data, useNavigate } from 'react-router-dom';
import { pay } from '../../services/orderService';
import { toast } from 'react-toastify';
import { useCart } from '../../hook/useCart';

export default function PaypalButton({ order }) {
  return <PayPalScriptProvider
  options={{
    clientId:'Ab3a8ZPknsGHzv5Gz_9U7Jmpuc7rDK1OpFgGazpPBQMch_pz3NEfpKIj_MAgXKH7yBfqjzd7WWa10B86'
  }}>
    <Buttons order={order} />
  </PayPalScriptProvider>
}

function Buttons({ order }) {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [{ isPending }] = usePayPalScriptReducer();
    const { showLoading, hideLoading } = useLoading(); 

    useEffect(() => {
        isPending? showLoading() : hideLoading();
    });

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: order.totalPrice,
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        try {
            const payment = await actions.order.capture();
            const orderId = await pay(payment.id);
            clearCart();
            toast.success('Payment Saved Successfully', 'Success');
            navigate('/track/' + orderId);
        } catch (error) {
            toast.error('Payment Save Failed', 'Error')
        }
    };

    const onError = err => {
        toast.error('Payment Failed', 'Error')
    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        />
    )
}
