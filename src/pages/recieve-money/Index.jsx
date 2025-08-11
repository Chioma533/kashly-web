import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReceiveMoneyModal from './components/RecieveMoneyModal'; 

const ReceiveMoneyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const wallet = location.state?.wallet;

    if (!wallet) {
        // If user navigated here without a wallet object, redirect back
        return (
            <div className="min-h-screen flex items-center justify-center text-center px-4">
                <div>
                    <h2 className="text-2xl font-bold mb-2">No Wallet Selected</h2>
                    <p className="text-muted-foreground mb-4">Please go back and choose a wallet to receive funds.</p>
                    <button className="btn-primary" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <ReceiveMoneyModal
                isOpen={true}
                onClose={() => navigate(-1)}
                wallet={wallet}
            />
        </div>
    );
};

export default ReceiveMoneyPage;
