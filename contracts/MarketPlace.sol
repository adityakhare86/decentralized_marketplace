// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MarketPlace{

    struct Product {
        uint256 productId;
	    string title;
        string description;
        string image;
        uint256 price;
        address seller;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductListed(uint256 productId, address seller);
    event ProductSold(uint256 productId);
    event ProductCancelled(uint256 productId);

    function viewAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);
        for (uint256 i = 1; i <= productCount; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }

    function buyProduct(uint256 _productId, uint _quantity) public payable {
        Product storage product = products[_productId];
        require(
            product.seller != msg.sender,
            "You cannot buy your own product"
        );
        require(msg.value >= product.price, "Insufficient funds");

        orderCount++;
        orders[orderCount] = Order({
            orderId: orderCount,
            productId: _productId,
            seller: products[_productId].seller,
            buyer: msg.sender,
            quantity: _quantity,
            amountPaid: products[_productId].price*_quantity,
            status: OrderStatus.Pending
        });

        emit ProductSold(_productId);
    }

    function addProduct(
	string memory _title,
        string memory _description,
        string memory _image,
        uint256 _price
    ) public {
        require(_price > 0, "Price must be greater than 0.");
	require(bytes(_title).length > 0, "Provide a title to the product.");
        require(bytes(_description).length > 0, "Description cannot be empty.");
        require(bytes(_image).length > 0, "Please provide an image.");

        productCount++;
        products[productCount] = Product({
            productId: productCount,
	        title: _title,
            description: _description,
            image: _image,
            price: _price,
            seller: msg.sender
        });
    }

    modifier onlySeller(uint256 _productId) {
        require(
            products[_productId].seller == msg.sender,
            "You are not the seller of this product"
        );
        _;
    }

    function deleteProduct(uint256 _productId) public onlySeller(_productId) {
        delete products[_productId];
        emit ProductCancelled(_productId);
    }

    //===================================
    //ORDERS CONTRACTS
    enum OrderStatus {
        Pending,
        Cancelled,
        Delivered
    }

    struct Order {
        uint256 orderId;
        uint256 productId;
        address seller;
        address buyer;
        uint256 quantity;
        uint256 amountPaid;
        OrderStatus status;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderPlaced(uint256 orderId, uint256 productId, address buyer, uint256 amountPaid);
    event OrderCancelled(uint256 orderId, uint256 productId, address buyer, uint256 amountRefunded);
    event OrderDelivered(uint256 orderId, uint256 productId, address buyer);

    function cancelOrder(uint256 _orderId) public onlyBuyer(_orderId) {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Pending, "Order cannot be cancelled");
        
        payable(order.buyer).transfer(order.amountPaid);
        order.status = OrderStatus.Cancelled;

        emit OrderCancelled(_orderId, order.productId, order.buyer, order.amountPaid);
    }

    function acceptOrder(uint _orderId) public onlyBuyer(_orderId) {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Pending, "Order cannot be accepted, you haven't placed a buy order");
        
        address seller = products[order.productId].seller;
        payable(seller).transfer(order.amountPaid);
        order.status = OrderStatus.Delivered;

        //can add event for listing
        emit OrderDelivered(_orderId, order.productId, order.buyer);
    }

    modifier onlyBuyer(uint256 _orderId) {
        require(
            orders[_orderId].buyer == msg.sender,
            "You are not the buyer of this order"
        );
        _;
    }

    //USER STRUCTS AND FNS

    function getOrders(address buyerAddress) public view returns (Order[] memory) {
    uint256 count = 0;
    for (uint256 i = 1; i <= orderCount; i++) {
        if (orders[i].buyer == buyerAddress) {
            count++;
        }
    }
    Order[] memory allMyProducts = new Order[](count);
    uint256 index = 0;
    for (uint256 i = 1; i <= orderCount; i++) {
        if (orders[i].buyer == buyerAddress) {
            allMyProducts[index] = orders[i];
            index++;
        }
    }
    return allMyProducts;
    }

    function getRecentTx(address sellerAddress) public view returns (Order[] memory){
    uint256 count = 0;
    for (uint256 i = 1; i <= orderCount; i++) {
        if (orders[i].seller == sellerAddress) {
            count++;
        }
    }
    Order[] memory allSellerTransactions = new Order[](count);
    uint256 index = 0;
    for (uint256 i = 1; i <= orderCount; i++) {
        if (orders[i].seller == sellerAddress) {
            allSellerTransactions[index] = orders[i];
            index++;
        }
    }
    return allSellerTransactions;
    }

}