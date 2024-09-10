# IP OnChain

A decentralized platform for managing trademarks and copyrights on the Solana blockchain using Metaplex Core SDK.

## Features

- Mint and manage IP assets (trademarks and copyrights) as NFTs
- Integrate with global regulatory bodies (WIPO, ARIPO) for verification and filing
- Automated royalty distribution using Metaplex's plugin system
- Transfer ownership and update metadata of IP assets
- Report infringements and manage disputes

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/christex-foundation/ip-onchain.git
   cd ip-onchain
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your Solana wallet and API keys
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `POST /trademarks` or `POST /copyrights`: Create a new IP asset
- `GET /trademarks/{asset_id}` or `GET /copyrights/{asset_id}`: Fetch IP asset metadata
- `PUT /trademarks/{asset_id}` or `PUT /copyrights/{asset_id}`: Update IP asset
- `POST /trademarks/{asset_id}/transfer` or `POST /copyrights/{asset_id}/transfer`: Transfer ownership
- `POST /trademarks/{asset_id}/renew`: Renew trademark
- `POST /trademarks/{asset_id}/infringements`: Report infringement

For detailed API documentation, see our [API Docs](./docs/API.md).

## Tech Stack

- Frontend: SvelteKit
- Blockchain: Solana
- NFT Standard: Metaplex
- Storage: Arweave

## Technical Specification

For a detailed overview of the system architecture and implementation details, please refer to our [Technical Specification](./docs/TECH_SPEC.md).
