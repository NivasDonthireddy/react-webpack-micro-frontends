## React Micro Frontend with Webpack's Module Federation


This mono repo contains...

- `accounts-summary-app` - Micro frontend that provides the summary of all the accounts
- `account-details-app` - Micro frontend that provides details of a selected account
- `main-app` - App that hosts above two components. Also acts as a medium to communicate with each other.

<hr>

### Local Setup

1. Navigate to each project
2. Install dependencies

```
$ npm install
```

3. Run in local

```
$ npm start
```

Each application will run on its configured ports.

- `accounts-summary-app` - http://localhost:9001/
- `account-details-app` - http://localhost:9002/
- `main-app` - http://localhost:9000/

<hr>

### Session Notes on Microfrontends using Webpack (React)

1. Import `ModulefederationPlugin` and give the below configuration options in `webpack.config.js` file of `account-summary-app` to expose the `AccountSummary` component.
```javascript
const { ModuleFederationPlugin } = require("webpack").container;

new ModuleFederationPlugin({
    name: "AccountsSummaryApp",
    filename: "remoteEntry.js",
    exposes: {
        "./AccountsSummary": "./src/components/AccountsSummary",
    },
})
```

2. Import `ModulefederationPlugin` and give the below configuration options in `webpack.config.js` file of `main-app` to specify the remotes & to be able to find the AccountsSummary that we just exposed in previous step.

```javascript
const { ModuleFederationPlugin } = require("webpack").container;

new ModuleFederationPlugin({	
  remotes: {	
    AccountsSummaryApp:	"AccountsSummaryApp@http://localhost:9001/remoteEntry.js",
  },	
})
```

3. Import AccountSummary component in `AccountsPage.js` of `main-app` to be able to render this here.

```javascript
const AccountsSummary = React.lazy(() =>
  import("AccountsSummaryApp/AccountsSummary")
);

<Suspense fallback={<h1>Error Loading Account Summary</h1>}>
  <AccountsSummary onAccountSelected={handleAccountSelected} />
</Suspense>
```

#### Let's try to make the same changes on AccountDetails microfrontend.

4. Import `ModulefederationPlugin` and give the below configuration options in `webpack.config.js` file of `account-details-app` to expose the `AccountDetails` component.
```javascript
const { ModuleFederationPlugin } = require("webpack").container;

new ModuleFederationPlugin({
    name: "AccountDetailsApp",
    filename: "remoteEntry.js",
    exposes: {
        "./AccountDetails": "./src/components/AccountDetails",
    },
})
```

5. Add another object to remotes List in `webpack.config.js` file of `main-app` to be able to find the AccountDetails that we just exposed in previous step.

```javascript
const { ModuleFederationPlugin } = require("webpack").container;

new ModuleFederationPlugin({	
  remotes: {	
    AccountsSummaryApp:	"AccountsSummaryApp@http://localhost:9001/remoteEntry.js",
    AccountDetailsApp:	"AccountDetailsApp@http://localhost:9002/remoteEntry.js",
  },	
})
```

6. Import AccountDetails component in `AccountsPage.js` of `main-app` to be able to render this here.

```javascript
const AccountDetails = React.lazy(() =>
  import("AccountDetailsApp/AccountDetails")
);

<Suspense fallback={<h1>Error Loading Account Details</h1>}>
  <AccountDetails selectedAccountId={selectedAccount} />
</Suspense>
```
