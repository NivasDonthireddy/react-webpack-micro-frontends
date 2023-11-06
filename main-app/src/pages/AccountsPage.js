import React, { Suspense, useState } from "react";
export default function AccountsPage() {
  let [selectedAccount, setSelectedAccount] = useState(1);

  const handleAccountSelected = (accountId) => {
    setSelectedAccount(accountId);
  };
  return (
    <main className="px-4 py-8">
      <h1>This is Main-App</h1>
      <div className="flex gap-8 flex-col md:flex-row"></div>
    </main>
  );
}
