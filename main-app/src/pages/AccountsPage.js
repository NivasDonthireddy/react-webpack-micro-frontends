import React, { Suspense, useState } from "react";
/**
 * This page contains a summary of all the Accounts and
 * show the details of a selected account
 *
 */
export default function AccountsPage() {
  let [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountSelected = (accountId) => {
    setSelectedAccount(accountId);
  };
  return (
    <main className="px-4 py-8">
      <div className="flex gap-8 flex-col md:flex-row">
      </div>
    </main>
  );
}
