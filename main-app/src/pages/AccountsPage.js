import React, { Suspense, useState } from "react";
const AccountsSummary = React.lazy(() =>
  import("AccountsSummaryApp/AccountsSummary")
);
const AccountDetails = React.lazy(() =>
  import("AccountDetailsApp/AccountDetails")
);

export default function AccountsPage() {
  let [selectedAccount, setSelectedAccount] = useState(1);

  const handleAccountSelected = (accountId) => {
    console.log(accountId);
    setSelectedAccount(accountId);
  };
  return (
    <main className="px-4 py-8">
      <h1>This is Main-App</h1>
      <div className="flex gap-8 flex-col md:flex-row">
        <Suspense fallback={<h1>Error Loading Account Summary</h1>}>
          <AccountsSummary onAccountSelected={handleAccountSelected} />
        </Suspense>
        <Suspense fallback={<h1>Error Loading Account Details</h1>}>
          <AccountDetails selectedAccountId={selectedAccount} />
        </Suspense>
      </div>
    </main>
  );
}
