import { sepolia } from "thirdweb/chains";
import { client } from "../app/client";
import { getContract } from "thirdweb";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export const contract = getContract({
  client,
  chain: sepolia,
  address: CONTRACT_ADDRESS,
  abi: [
    {
      type: "event",
      name: "OrderCancelled",
      inputs: [
        {
          type: "uint256",
          name: "orderId",
          indexed: false,
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "productId",
          indexed: false,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "buyer",
          indexed: false,
          internalType: "address",
        },
        {
          type: "uint256",
          name: "amountRefunded",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "OrderDelivered",
      inputs: [
        {
          type: "uint256",
          name: "orderId",
          indexed: false,
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "productId",
          indexed: false,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "buyer",
          indexed: false,
          internalType: "address",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "OrderPlaced",
      inputs: [
        {
          type: "uint256",
          name: "orderId",
          indexed: false,
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "productId",
          indexed: false,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "buyer",
          indexed: false,
          internalType: "address",
        },
        {
          type: "uint256",
          name: "amountPaid",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "ProductCancelled",
      inputs: [
        {
          type: "uint256",
          name: "productId",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "ProductListed",
      inputs: [
        {
          type: "uint256",
          name: "productId",
          indexed: false,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "seller",
          indexed: false,
          internalType: "address",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "ProductSold",
      inputs: [
        {
          type: "uint256",
          name: "productId",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "function",
      name: "acceptOrder",
      inputs: [
        {
          type: "uint256",
          name: "_orderId",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addProduct",
      inputs: [
        {
          type: "string",
          name: "_title",
          internalType: "string",
        },
        {
          type: "string",
          name: "_description",
          internalType: "string",
        },
        {
          type: "string",
          name: "_image",
          internalType: "string",
        },
        {
          type: "uint256",
          name: "_price",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "buyProduct",
      inputs: [
        {
          type: "uint256",
          name: "_productId",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "_quantity",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "cancelOrder",
      inputs: [
        {
          type: "uint256",
          name: "_orderId",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "deleteProduct",
      inputs: [
        {
          type: "uint256",
          name: "_productId",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getOrders",
      inputs: [
        {
          type: "address",
          name: "buyerAddress",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "tuple[]",
          name: "",
          components: [
            {
              type: "uint256",
              name: "orderId",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "productId",
              internalType: "uint256",
            },
            {
              type: "address",
              name: "seller",
              internalType: "address",
            },
            {
              type: "address",
              name: "buyer",
              internalType: "address",
            },
            {
              type: "uint256",
              name: "quantity",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "amountPaid",
              internalType: "uint256",
            },
            {
              type: "uint8",
              name: "status",
              internalType: "enum MarketPlace.OrderStatus",
            },
          ],
          internalType: "struct MarketPlace.Order[]",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRecentTx",
      inputs: [
        {
          type: "address",
          name: "sellerAddress",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "tuple[]",
          name: "",
          components: [
            {
              type: "uint256",
              name: "orderId",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "productId",
              internalType: "uint256",
            },
            {
              type: "address",
              name: "seller",
              internalType: "address",
            },
            {
              type: "address",
              name: "buyer",
              internalType: "address",
            },
            {
              type: "uint256",
              name: "quantity",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "amountPaid",
              internalType: "uint256",
            },
            {
              type: "uint8",
              name: "status",
              internalType: "enum MarketPlace.OrderStatus",
            },
          ],
          internalType: "struct MarketPlace.Order[]",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "orderCount",
      inputs: [],
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "orders",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "uint256",
          name: "orderId",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "productId",
          internalType: "uint256",
        },
        {
          type: "address",
          name: "seller",
          internalType: "address",
        },
        {
          type: "address",
          name: "buyer",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "quantity",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "amountPaid",
          internalType: "uint256",
        },
        {
          type: "uint8",
          name: "status",
          internalType: "enum MarketPlace.OrderStatus",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "productCount",
      inputs: [],
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "products",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "uint256",
          name: "productId",
          internalType: "uint256",
        },
        {
          type: "string",
          name: "title",
          internalType: "string",
        },
        {
          type: "string",
          name: "description",
          internalType: "string",
        },
        {
          type: "string",
          name: "image",
          internalType: "string",
        },
        {
          type: "uint256",
          name: "price",
          internalType: "uint256",
        },
        {
          type: "address",
          name: "seller",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "viewAllProducts",
      inputs: [],
      outputs: [
        {
          type: "tuple[]",
          name: "",
          components: [
            {
              type: "uint256",
              name: "productId",
              internalType: "uint256",
            },
            {
              type: "string",
              name: "title",
              internalType: "string",
            },
            {
              type: "string",
              name: "description",
              internalType: "string",
            },
            {
              type: "string",
              name: "image",
              internalType: "string",
            },
            {
              type: "uint256",
              name: "price",
              internalType: "uint256",
            },
            {
              type: "address",
              name: "seller",
              internalType: "address",
            },
          ],
          internalType: "struct MarketPlace.Product[]",
        },
      ],
      stateMutability: "view",
    },
  ],
});
