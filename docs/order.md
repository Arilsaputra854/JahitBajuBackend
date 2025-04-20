Here’s the API spec adapted for `Order` operations, replacing the `User` API endpoints and payloads accordingly:

# Order API Spec

Headers : 
- Authorizaton : token

## Create Order API
**Endpoint**: `POST /api/orders`

**Request Body**:
```json
{
    "buyer_id": 123,
    "order_date": "2024-11-13T12:00:00Z",
    "total_price": 750000.00,
    "items": [
        {
            "id": 1,
            "product_id": 2,
            "quantity": 2,
            "price": 375000.00
        }
    ]
}
```

**Response Body Success**:
```json
{
    "data": {
        "id": 1,
        "buyer_id": 123,
        "order_date": "2024-11-13T12:00:00Z",
        "total_price": 750000.00,
        "items": [
            {
                "id": 1,
                "product_id": 2,
                "quantity": 2,
                "price": 375000.00
            }
        ]
    }
}
```

**Response Body Error**:
```json
{
    "errors": "Invalid order data"
}
```

---

## Retrieve Order API
**Endpoint**: `GET /api/orders/{id}`

**Response Body Success**:
```json
{
    "id": 1,
    "buyer_id": 123,
    "order_date": "2024-11-13T12:00:00Z",
    "total_price": 750000.00,
    "items": [
        {
            "id": 1,
            "product_id": 2,
            "quantity": 2,
            "price": 375000.00
        }
    ]
}
```

**Response Body Error**:
```json
{
    "errors": "Order not found"
}
```

---

## Update Order API
**Endpoint**: `PATCH /api/orders/{id}`

**Request Body**:
```json
{
    "total_price": 800000.00, // optional
    "items": [
        {
            "id": 1,
            "product_id": 2,
            "quantity": 3,
            "price": 375000.00
        }
    ] // optional
}
```

**Response Body Success**:
```json
{
    "data": {
        "id": 1,
        "buyer_id": 123,
        "order_date": "2024-11-13T12:00:00Z",
        "total_price": 800000.00,
        "items": [
            {
                "id": 1,
                "product_id": 2,
                "quantity": 3,
                "price": 375000.00
            }
        ]
    }
}
```

**Response Body Error**:
```json
{
    "errors": "Invalid update data"
}
```

---

## Delete Order API
**Endpoint**: `DELETE /api/orders/{id}`

**Response Body Success**:
```json
{
    "data": "Order deleted successfully"
}
```

**Response Body Error**:
```json
{
    "errors": "Order not found"
}
```

---

## List All Orders API
**Endpoint**: `GET /api/orders`

**Response Body Success**:
```json
{
    "data": [
        {
            "id": 1,
            "buyer_id": 123,
            "order_date": "2024-11-13T12:00:00Z",
            "total_price": 750000.00,
            "items": [
                {
                    "id": 1,
                    "product_id": 2,
                    "quantity": 2,
                    "price": 375000.00
                }
            ]
        },
        {
            "id": 2,
            "buyer_id": 456,
            "order_date": "2024-11-14T15:30:00Z",
            "total_price": 500000.00,
            "items": [
                {
                    "id": 2,
                    "product_id": 3,
                    "quantity": 1,
                    "price": 500000.00
                }
            ]
        }
    ]
}
```

**Response Body Error**:
```json
{
    "errors": "Unauthorized or no orders found"
}
```

---

