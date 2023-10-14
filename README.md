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
### Session Notes ( SE-COP )

#### Configurations for Account Details App.
- Import the `ModuleFederationPlugin` from webpack
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

-  Within the webpack configuration for the *account-details-app*, include the following code in the plugins section to expose the components that need to be rendered in another application.
```javascript
new ModuleFederationPlugin({
    name: "AccountDetailsApp",
    filename: "accountDetailsApp_remote.js",
    exposes: {
        "./AccountDetails": "./src/components/AccountDetails",
    },
})
```

#### Configurations for Account Summary App.
- Import the `ModuleFederationPlugin` from webpack
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

-  Within the webpack configuration for the *account-summary-app*, include the following code in the plugins section to expose the components that need to be rendered in another application.
```javascript
new ModuleFederationPlugin({
    name: "AccountsSummaryApp",
    filename: "accountsSummaryApp_remote.js",
    exposes: {
        "./AccountsSummary": "./src/components/AccountsSummary",
    },
})
```

#### Configurations for Main App.
- Import the `ModuleFederationPlugin` from webpack
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

-  In the webpack configuration for the main-app,include the following code in the plugins section to specify the URLs for all the remote applications.
```javascript
new ModuleFederationPlugin({	
  remotes: {	
    AccountsSummaryApp_Remote:	
      "AccountsSummaryApp@http://localhost:9001/accountsSummaryApp_remote.js",	
    AccountDetailsApp_Remote:	
      "AccountDetailsApp@http://localhost:9002/accountDetailsApp_remote.js",	
  },	
})
```

- To consume these two micro-frontends in the *main-app*, utilize the names defined above and the names used when exposing the remotes.
```javascript
const AccountsSummary = React.lazy(() =>	
  import("AccountsSummaryApp_Remote/AccountsSummary")	
);	
const AccountDetails = React.lazy(() =>	
  import("AccountDetailsApp_Remote/AccountDetails")	
);
```

- Now you should be able to consume the components served from a remote application within the *main-app*.
```javascript
<AccountsSummary onAccountSelected={handleAccountSelected} />
<AccountDetails selectedAccountId={selectedAccount} />
```



