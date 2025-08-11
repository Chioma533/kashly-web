import React from 'react'

const ReceiveMoneyModal = ({ isOpen, onClose, wallet }) => {
    return isOpen ? (
        <div className="modal-bg">
            <div className="modal p-6 rounded-xl shadow-xl bg-white w-full max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Receive Money</h2>

                <p className="text-sm text-muted mb-2">Share your wallet ID or account number</p>

                <div className="mb-3">
                    <label className="text-sm font-medium">Wallet ID</label>
                    <div className="flex items-center justify-between border p-2 rounded">
                        <span>{wallet?.wallet_id}</span>
                        <button onClick={() => navigator.clipboard.writeText(wallet?.wallet_id)}>Copy</button>
                    </div>
                </div>

                {wallet?.account_number && (
                    <div className="mb-3">
                        <label className="text-sm font-medium">Account Number</label>
                        <div className="flex items-center justify-between border p-2 rounded">
                            <span>{wallet?.account_number}</span>
                            <button onClick={() => navigator.clipboard.writeText(wallet?.account_number)}>Copy</button>
                        </div>
                    </div>
                )}

                <div className="text-xs text-muted mt-2">
                    You can receive funds via wallet ID, bank transfer (local), or email if supported.
                </div>

                <div className="flex justify-end mt-4">
                    <button className="btn-outline" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ReceiveMoneyModal