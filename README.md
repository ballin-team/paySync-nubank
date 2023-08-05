<h1 align="center">
  <img src="https://docs.nupaybusiness.com.br/images/logotipo.png" 
alt="NuPay for Business" />
</h1>

<h1 align="center">
  paySync Nubank
</h1>

<p align="center">
  A complete integration with NuPay for business API
</p>

## :package: Content

- [Technologies](#Technologies)
- [Getting Started](#Getting-Started)
- [How to install](#How-to-install)
- [Config](#Config)

## Technologies

We are using the following technologies:

- [axios](https://www.npmjs.com/package/cls-hooked) - used to send request to the API;
- [tweetnacl](https://www.npmjs.com/package/tweetnacl) - used to check the authenticity of signature in each response (Nubank recommendation);

## Getting Started
This lib aims to centralize all the endpoints exposed in the NuPay for Business API.

## How to install

```bash
npm install @ballin-team/paysync-nubank
```

## Config

```typeScript
import { NubankClient } from "@ballin-team/paysync-nubank";

const client = new NubankClient({
  testEnv: true, // define the environment (sandbox or production)
  timeout: 10000, // define the resquest timeout
  credentials: { // the credentials used to access the API
    payment: {
      merchantKey: 'XXXXXX',
      merchantToken: 'XXXXXXXXXX',
    }
  }
});
```
