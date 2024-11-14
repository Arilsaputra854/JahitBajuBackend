
# Product API Specification

**Headers**:
- `Authorization`: Token

## Create Product
**Endpoint**: `POST /api/products`

**Request Body**:
```json
{
  "name": "Obi Mangiring Merah-Ulos",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "price": 375000.0,
  "stock": 123,
  "sold": 5,
  "seen": 24,
  "favorite": 2,
  "type": 1, //RTW Product
  "images_url": [
    "https://down-id.img.susercontent.com/file/sg-11134201-22090-oj0c6ox3mxhv4e.webp",
    "https://down-id.img.susercontent.com/file/sg-11134201-22090-nzt8ypx3mxhv2d.webp"
  ],
  "tags": ["terlaris", "promo spesial"],
  "size": ["XL", "S", "M"]
}
```

**Response Body Success**:
```json
{
  "data": {
    "id": 1,
    "name": "Obi Mangiring Merah-Ulos",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price": 375000.0,
    "stock": 123,
    "sold": 5,
    "seen": 24,
    "favorite": 2,
    "type": 1,
    "images_url": [
    "https://down-id.img.susercontent.com/file/sg-11134201-22090-oj0c6ox3mxhv4e.webp",
    "https://down-id.img.susercontent.com/file/sg-11134201-22090-nzt8ypx3mxhv2d.webp"],
    "tags": ["terlaris", "promo spesial"],
    "size": ["XL", "S", "M"],
  }
}
```

**Response Body Error**:
```json
{
  "errors": "Invalid product data"
}
```

---

## Retrieve Product
**Endpoint**: `GET /api/products/{id}`

**Response Body Success**:
```json
{
  "id": 1,
  "name": "Obi Mangiring Merah-Ulos",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "price": 375000.0,
  "stock": 123,
  "sold": 5,
  "seen": 24,
  "favorite": 2,
  "type": 1,
  "images_url": [
    "https://down-id.img.susercontent.com/file/sg-11134201-22090-oj0c6ox3mxhv4e.webp",
    "https://down-id.img.susercontent.com/file/sg-11134201-22090-nzt8ypx3mxhv2d.webp"
  ],
  "tags": ["terlaris", "promo spesial"],
  "size": ["XL", "S", "M"]
}
```

**Response Body Error**:
```json
{
  "errors": "Product not found"
}
```

---

## Update Product
**Endpoint**: `PATCH /api/products/{id}`

**Request Body** (fields are optional):
```json
{
  "name": "Obi Mangiring Merah-Ulos",
  "price": 400000.0,
  "stock": 120,
  "size": ["L", "M"]
}
```

**Response Body Success**:
```json
{
  "data": {
    "id": 1,
    "name": "Obi Mangiring Merah-Ulos",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price": 400000.0,
    "stock": 120,
    "sold": 5,
    "seen": 24,
    "favorite": 2,
    "type": 1,
    "images_url": [
      "https://down-id.img.susercontent.com/file/sg-11134201-22090-oj0c6ox3mxhv4e.webp",
      "https://down-id.img.susercontent.com/file/sg-11134201-22090-nzt8ypx3mxhv2d.webp"
    ],
    "tags": ["terlaris", "promo spesial"],
    "size": ["XL", "S", "M"],
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

## Delete Product
**Endpoint**: `DELETE /api/products/{id}`

**Response Body Success**:
```json
{
  "data": "Product deleted successfully"
}
```

**Response Body Error**:
```json
{
  "errors": "Product not found"
}
```

---

## List All Products
**Endpoint**: `GET /api/products`

**Response Body Success**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Obi Mangiring Merah-Ulos",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "price": 375000.0,
      "stock": 123,
      "sold": 5,
      "seen": 24,
      "favorite": 2,
      "type": 1,
      "images_url": [
        "https://down-id.img.susercontent.com/file/sg-11134201-22090-oj0c6ox3mxhv4e.webp",
        "https://down-id.img.susercontent.com/file/sg-11134201-22090-nzt8ypx3mxhv2d.webp"
      ],
      "tags": ["terlaris", "promo spesial"],
      "size": ["XL", "S", "M"],
    },
    {
      "id": 2,
      "name": "Clutch Coat",
      "description": "Kombinasi kain ulos dan bahan polos dengan design...",
      "price": 375000.0,
      "stock": 123,
      "sold": 5,
      "seen": 24,
      "favorite": 2,
      "type": 2,
      "image_url": [
        "https://drive.google.com/uc?export=view&id=1BMCwsRNkecJV171OdYSQ-aV5T4-sBrRf"
      ],
      "tags": ["terlaris", "promo spesial", "diskon 20%"],
      "size": ["XL", "S", "M"],
    }
  ]
}
```

**Response Body Error**:
```json
{
  "errors": "Unauthorized"
}
```

---