
# Cart API Specification

### Headers:
- `Authorization`: Bearer token

---

## Create Cart API
**Endpoint**: `POST /api/carts`

**Request Body**:
```json
{
    "buyerId": "123",
    "items": [
        {
            "productId": "2",
            "quantity": 2,
            "price": 375000.00
        }
    ]
}
```

**Response Body Success**:
```json
{
    "message": "Cart created successfully",
    "data": {
        "id": "uuid",
        "buyerId": "123",
        "totalPrice": 750000.00,
        "items": [
            {
                "productId": "2",
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
    "errors": "Invalid cart data"
}
```

---

## Retrieve Cart API
**Endpoint**: `GET /api/carts/{id}`

**Response Body Success**:
```json
{
    "data": {
        "id": "uuid",
        "buyerId": "123",
        "totalPrice": 750000.00,
        "items": [
            {
                "productId": "2",
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
    "errors": "Cart not found"
}
```

---

## Add Item to Cart API
**Endpoint**: `POST /api/carts/{cartId}/items`

**Request Body**:
```json
{
    "productId": "2",
    "quantity": 3,
    "price": 375000.00
}
```

**Response Body Success**:
```json
{
    "message": "Item added to cart successfully",
    "data": {
        "id": "itemUuid",
        "cartId": "uuid",
        "productId": "2",
        "quantity": 3,
        "price": 375000.00
    }
}
```

**Response Body Error**:
```json
{
    "errors": "Invalid item data"
}
```

---

## Update Cart Item API
**Endpoint**: `PATCH /api/carts/{cartId}/items/{itemId}`

**Request Body**:
```json
{
    "quantity": 4,
    "price": 400000.00
}
```

**Response Body Success**:
```json
{
    "message": "Cart item updated successfully",
    "data": {
        "id": "itemUuid",
        "cartId": "uuid",
        "productId": "2",
        "quantity": 4,
        "price": 400000.00
    }
}
```

**Response Body Error**:
```json
{
    "errors": "Cart item not found"
}
```

---

## Remove Item from Cart API
**Endpoint**: `DELETE /api/carts/{cartId}/items/{itemId}`

**Response Body Success**:
```json
{
    "message": "Cart item deleted successfully"
}
```

**Response Body Error**:
```json
{
    "errors": "Cart item not found"
}
```

---

## Remove Cart API
**Endpoint**: `DELETE /api/carts/{id}`

**Response Body Success**:
```json
{
    "message": "Cart deleted successfully"
}
```

**Response Body Error**:
```json
{
    "errors": "Cart not found"
}
```

---

## List All Carts API
**Endpoint**: `GET /api/carts`

**Response Body Success**:
```json
{
    "data": [
        {
            "id": "uuid1",
            "buyerId": "123",
            "totalPrice": 750000.00,
            "items": [
                {
                    "productId": "2",
                    "quantity": 2,
                    "price": 375000.00
                }
            ]
        },
        {
            "id": "uuid2",
            "buyerId": "456",
            "totalPrice": 500000.00,
            "items": [
                {
                    "productId": "3",
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
    "errors": "Unauthorized or no carts found"
}
```
``` 
