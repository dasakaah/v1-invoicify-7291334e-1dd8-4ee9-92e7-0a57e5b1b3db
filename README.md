# Invoicify

A minimalist and elegant invoice generator for creating and downloading professional invoices in seconds.

## Key Features

-   **Minimalist Interface**: A clean, uncluttered, and intuitive single-page application for a seamless user experience.
-   **Live Preview**: See your invoice update in real-time as you type, ensuring pixel-perfect results.
-   **Dynamic Line Items**: Easily add, update, or remove invoice line items.
-   **Automatic Calculations**: Subtotals, taxes, and grand totals are calculated automatically, saving you time and reducing errors.
-   **PDF & Print Ready**: Download your invoice as a professional PDF or send it directly to your printer with a single click.
-   **Persistent State**: Your work is automatically saved to your browser's local storage, so you never lose data on a page refresh.
-   **Responsive Design**: Flawless layouts across all device sizes, from mobile phones to desktops.

## Technology Stack

-   **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) & [Immer](https://immerjs.github.io/immer/)
-   **PDF Generation**: [jspdf](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/your-username/invoicify.git
    ```
2.  Navigate into the project directory:
    ```sh
    cd invoicify
    ```
3.  Install the dependencies using Bun:
    ```sh
    bun install
    ```

### Running Locally

To start the development server, run the following command:

```sh
bun run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1.  **Fill in Details**: Start by entering your company's information ("From") and your client's details ("To").
2.  **Add Line Items**: Click the "Add Item" button to add new rows to the invoice. Fill in the description, quantity, and price for each item.
3.  **Set Tax Rate**: Adjust the tax rate as needed. The total will update automatically.
4.  **Add Notes**: Include any additional notes or payment terms in the "Notes" section.
5.  **Take Action**:
    -   Click **Download PDF** to save a copy of the invoice.
    -   Click **Print** to open your browser's print dialog.
    -   Click **Reset** to clear the form and start over.

## Deployment

This project is configured for easy deployment to Cloudflare.

To deploy the application, run the build and deploy commands:

```sh
bun run deploy
```

This will build the application and deploy it using the Wrangler CLI.

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dasakaah/Invoice-Generator)

## License

This project is licensed under the MIT License.
