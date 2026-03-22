# System Requirements — Bitcoin Payment Gateway

## 1. Functional Requirements

### 1.1 User Management

- Users must be able to register with email and password
- Users must be able to log in and log out
- Users must be able to reset passwords
- Users must manage their profile settings

---

### 1.2 Wallet Configuration

- Users must provide a Bitcoin address or xpub
- System must validate address format
- System must allow updating wallet settings

---

### 1.3 Product & Inventory Management

- Users must be able to create products

- Product fields:
  - Title
  - Description
  - Image URL
  - Price (BTC or fiat)
  - Stock quantity (optional)
  - Unlimited stock option

- System must:
  - Track available stock
  - Prevent sales when stock = 0
  - Allow manual stock updates

---

### 1.4 Payment Creation

- Users must be able to create a payment request OR link it to a product

- Required fields:
  - Amount (BTC or fiat equivalent)
  - Description
  - Expiration time

- Optional:
  - Product reference

- System must generate:
  - Unique payment ID
  - Bitcoin address (or derived address)
  - Payment link (URL)
  - QR Code

---

### 1.5 Payment Processing

- System must detect incoming transactions
- System must match transaction to payment
- System must update status:
  - pending
  - detected
  - confirmed
  - expired

---

### 1.6 Payment Validation with Inventory

- Before accepting payment:
  - System must verify product availability

- If stock = 0:
  - Payment must be blocked OR marked as unavailable

- When payment is confirmed:
  - Stock must be decremented

- System must prevent overselling (race conditions)

---

### 1.7 Payment Tracking

- Users must view payment status in real-time
- Users must access payment history
- Users must view transaction details (TXID, confirmations)

---

### 1.8 Checkout Page (Enhanced)

- Checkout page must display:
  - Product title
  - Product description
  - Product image
  - Price
  - Availability status

- If product is out of stock:
  - Display “Sold Out”
  - Disable payment interaction

---

### 1.9 Webhooks

- System must send events:
  - payment.created
  - payment.detected
  - payment.confirmed
  - payment.expired

- Users must configure webhook endpoints

---

### 1.10 API Access

- Users must generate API keys

- API must allow:
  - create payment
  - check payment status
  - manage products

- API must enforce rate limits

---

### 1.11 Dashboard

- Users must see:
  - total received
  - payment count
  - pending payments

- Users must filter and search payments

---

### 1.12 Subscription & Ads

- Free users see ads
- Paid users do not see ads
- System must enforce usage limits per plan

---

## 2. Non-Functional Requirements

### 2.1 Performance

- Payment detection latency < 10 seconds (mempool)
- API response time < 300ms

---

### 2.2 Scalability

- System must support horizontal scaling
- Workers must process jobs asynchronously
- Queue system must handle high throughput

---

### 2.3 Availability

- System uptime target: 99.9%
- Graceful degradation if blockchain APIs fail

---

### 2.4 Security

- All sensitive data must be encrypted
- API must require authentication
- Webhooks must be signed (HMAC)
- Rate limiting must prevent abuse

---

### 2.5 Reliability

- Payments must never be lost
- All events must be idempotent
- Retry mechanisms required for failed jobs
- Inventory updates must be atomic

---

### 2.6 Maintainability

- Codebase must be modular
- Services must be decoupled (API / Worker)
- Logging and monitoring required

---

## 3. Business Rules

### 3.1 Payment Lifecycle

- Payment starts as "pending"
- Moves to "detected" when TX is seen in mempool
- Moves to "confirmed" after X confirmations
- Moves to "expired" if not paid in time

---

### 3.2 Address Usage

- Each payment must use a unique address (recommended)
- Address reuse must be avoided

---

### 3.3 Confirmation Policy

- Default: 1–3 confirmations
- Configurable per user (future)

---

### 3.4 Expiration

- Payments expire after defined time
- Expired payments must not be reused

---

### 3.5 Inventory Rules

- A product cannot be sold if stock = 0
- Stock must decrease only after payment confirmation
- System must prevent double spending of stock (concurrency safe)

---

### 3.6 Non-Custodial Model

- System must NOT store user funds
- Funds go directly to user wallet

---

### 3.7 Fee Handling

- Network fees are paid by sender
- System does not modify transaction fees

---

### 3.8 Data Integrity

- Transaction matching must be deterministic
- Double counting must be prevented

---

### 3.9 Ads Policy

- Ads must not interfere with checkout experience
- Ads must be removed for paid users

---

## 4. Future Considerations

- Lightning Network support
- Fiat conversion (BTC ↔ BRL)
- Multi-product checkout (cart)
- Advanced inventory management
- Advanced fraud detection

---

## 5. Summary

This system is designed to:

- Be simple for users
- Be scalable for growth
- Be secure by design
- Avoid custody risks

Core principle:
**Trustless, simple, reliable Bitcoin payments with real product context**
