

# Exprense tracker


Based on the design and behavior of the **Expense Tracker** application shown on your screen, here is a structured Software Requirements Specification (SRS) detailing both the functional and non-functional requirements to build this software.

---

## 📋 Software Requirements Specification (SRS)

### Project: Personal Expense Tracker

---

## 1. Functional Requirements (FR)

Functional requirements define the specific behaviors, features, and calculations that the system must perform.

### 1.1 Dashboard & Analytics

* **FR-1.1 (Total Spent Card):** The system must calculate and display the total sum of all logged expenses and the total count of expenses.
* **FR-1.2 (Monthly Spent Card):** The system must dynamically calculate and display the sum and count of expenses incurred in the current calendar month.
* **FR-1.3 (Largest Expense Card):** The system must identify and display the single highest logged expense, including its description and amount.
* **FR-1.4 (Spending by Category):** The system must visualize spending distribution across categories using horizontal progress bars. It must display the total dollar amount and percentage share for each category.

### 1.2 Expense Management

* **FR-2.1 (Add Expense):** Users must be able to add a new expense with the following fields:
* *Description:* Text input (e.g., "Lunch at cafe").
* *Amount ($):* Numeric input supporting decimals.
* *Category:* Dropdown menu selection containing predefined categories: `🍔 Food`, `🚗 Transport`, `🛍 Shopping`, `📋 Bills`, `💊 Health`, `🎮 Entertainment`, `📦 Other`.
* *Date:* Date picker (defaults to the current date).


* **FR-2.2 (Delete Expense):** Users must be able to permanently delete an individual expense from the transaction list by clicking an "X" button.
* **FR-2.3 (Clear All):** The system must provide a "Clear All" action to purge all logged transactions and reset the dashboard states to zero.

### 1.3 Transactions List, Filtering, and Sorting

* **FR-3.1 (Monthly Grouping):** Transactions must be grouped and listed chronologically by month and year (e.g., "JULY 2026"), displaying the subtotal spent for that specific month.
* **FR-3.2 (Category Filtering):** Users must be able to filter the transaction list by a specific category (or view "All categories").
* **FR-3.3 (Sorting):** Users must be able to sort transactions by:
* *Oldest* (ascending date order)
* *Newest* (descending date order)
* *Highest* (descending amount order)
* *Lowest* (ascending amount order)



### 1.4 Data Portability

* **FR-4.1 (Export CSV):** The system must allow users to download their entire expense list as a structured `.csv` file.

---

## 2. Non-Functional Requirements (NFR)

Non-functional requirements specify the criteria used to judge the operation of a system, rather than specific behaviors.

| Category | Requirement | Description |
| --- | --- | --- |
| **Usability** | Single-Page Interface | The entire application must exist on a single, intuitive page to avoid navigation friction. |
| **Performance** | Real-Time Updates | All calculations, category charts, and transaction lists must update instantly upon adding or deleting an item without requiring a full page reload. |
| **Data Persistence** | Local Storage | To preserve user data without a backend, transaction records must be saved in the browser's `localStorage` so they persist across page refreshes. |
| **Reliability** | Form Validation | The system must prevent submission of empty descriptions, non-numeric or negative amounts, and invalid dates. |
| **Compatibility** | Cross-Browser | The application must render and function consistently across all modern web browsers (Chrome, Safari, Firefox, Edge). |
| **Responsiveness** | Mobile Friendly | The UI layout must dynamically adapt to both desktop and mobile viewports seamlessly. |


---


I cannot create visual diagrams directly. I am a text-based AI.

However, based on the application shown in your browser, here is a detailed textual representation of an Entity-Relationship (ER) Diagram, including entities, attributes, and relationships.

---

### Entity-Relationship Diagram for Expense Tracker

#### 1. Entity-Relationship Model (Textual)

The system consists of three core logical entities. Note that since there is no "User" management shown in the UI, the system is modeled for a single user context.

---

### **[1] Entity: Expense**

This is the core entity that stores details for every individual transaction.

* **primary_key**: `expense_id` (Unique integer)
* **Attributes:**
* `description` (String, required): *e.g., "Lunch at cafe"*
* `amount` (Decimal, required): *e.g., 36.00*
* `date_incurred` (Date, required): *The date the expense occurred.*
* `category_id` (Foreign Key, required): *Links to the Category.*



---

### **[2] Entity: Category**

This lookup table stores predefined and potentially custom categories.

* **primary_key**: `category_id` (Unique integer)
* **Attributes:**
* `name` (String, required): *e.g., "Food", "Transport", "Bills"*
* `icon_blob_or_url` (String, optional): *A storage path for an icon graphic (as seen in the transaction list).*



---

### **[3] Entity: AppState (Operational/Non-Persistent)**

This logical entity is not a traditional database table. It represents the *calculated data* that is stored in the browser's active memory or localStorage and updated *in real-time* based on the `Expense` table.

* **Attributes:**
* `total_spent` (Decimal, calculated): *Sum of all Expense.amount*
* `count_total_expenses` (Integer, calculated)
* `total_spent_this_month` (Decimal, calculated): *Filtered by current month.*
* `count_expenses_this_month` (Integer, calculated)
* `largest_expense_amount` (Decimal, calculated): *`MAX(Expense.amount)`*
* `largest_expense_description` (String, derived): *Description associated with the max amount.*
* `spending_by_category_data` (List of {Category, Total, %}, calculated)



---

#### 2. Visualizing the Relationships

This describes how the entities connect.

```mermaid
erd
    %% Primary Entities

    [Expense] ||--o| [Category] : "is classified by"

    %% Calculated/Operational States (for UI binding)
    %% This shows dependencies, not a strict DB relationship.

    [AppState] <.. [Expense] : "calculates from"
    [AppState] <.. [Category] : "summarizes with"


```

---

#### 3. Database Schema Mapping (SQL DDL)

If you were building this using a relational database (like SQLite for a local app or PostgreSQL for a server app), your schema might look like this:

```sql
-- Create the Category Lookup Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    icon_url VARCHAR(255)  -- Path to graphic (e.g., "/icons/food.png")
);

-- Pre-populate the categories (based on UI)
INSERT INTO categories (name, icon_url) VALUES 
('Food', '🍔'),
('Transport', '🚗'),
('Shopping', '🛍'),
('Bills', '📋'),
('Health', '💊'),
('Entertainment', '🎮'),
('Other', '📦');

-- Create the main Expense Table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date_incurred DATE NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```