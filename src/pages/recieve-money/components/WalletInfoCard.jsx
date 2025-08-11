// components/WalletInfoCard.jsx
import React from 'react';

const WalletInfoCard = ({ label, value }) => (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-medium">{value || 'N/A'}</span>
            <button
                onClick={() => navigator.clipboard.writeText(value)}
                className="text-sm text-blue-600 hover:underline"
            >
                Copy
            </button>
        </div>
    </div>
);

export default WalletInfoCard;
