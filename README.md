# FindID

This app is designed specifically for Amazon's FC warehouses and is meant to reduce the manual work of finding a container or an item or anything that has a code.

## Installation

1. Clone this repository - `git clone https://github.com/LWJerri/FindID.git`.
2. Install dependencies - `pnpm i` (or use your prefer package manager).

## Run Locally

### Web Variant

1. Run `pnpm vite:dev` to run app in dev mode, now you can do what you want and immediately see result.
2. Run `pnpm vite:build & pnpm vite:preview` to run app in preview mode aka. production variant.

### App Variant

1. Prepare [Tauri](https://tauri.app/v1/guides/getting-started/prerequisites) if you plane use app as app window.
2. Run `pnpm tauri:dev` to run app in dev mode. Tauri execute `pnpm vite:dev` command before create app window.

## Deployment

### Local Build

1. Carefully read [this part](https://tauri.app/v1/guides/building) of Tauri docs.
2. Generate private and public keys - `pnpm tauri signer generate`.
3. Set your public key in [src-tauri/tauri.conf.json](https://github.com/LWJerri/FindID/blob/dde90720161c1f366ec430ca9f17ec91587ec1e2/src-tauri/tauri.conf.json#L64).
4. Run `pnpm tauri:build` command to build `.exe` file.

### GitHub Actions Build & Deploy [Recommended]

1. Generate GitHub classic token with `repo` permissions.
2. Values for `TAURI_KEY_PASSWORD` & `TAURI_PRIVATE_KEY` keys you can get if run `pnpm tauri signer generate` command.

For more info see [.github/workflows/main.yaml](https://github.com/LWJerri/FindID/blob/master/.github/workflows/main.yaml) file.

## Contributing

This project opened for contribution and any suggestions! You can create a new `Issue` or make an `Pull request` with your code changes.

## License

This code has **MIT** license. See the `LICENSE` file for getting more information.
