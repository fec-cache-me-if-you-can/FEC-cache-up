/*
GET /cart
Status: 200 OK
+-----------+---------+-----------------------------------------------------------+
| Parameter |  Type   |                        Description                        |
+-----------+---------+-----------------------------------------------------------+
| page      | integer | Selects the page of results to return. Default 1.         |
| count     | integer | Specifies how many results per page to return. Default 5. |
+-----------+---------+-----------------------------------------------------------+
*/

[
  {
      "sku_id": 1,
      "count": 2
  },
  {
      "sku_id": 3,
      "count": 1
  },
  {
      "sku_id": 5,
      "count": 33
  },
  //...
]

/*
POST /cart
Status: 201 CREATED
+-----------+------+--------------------------------------------+
| Parameter | Type |                Description                 |
+-----------+------+--------------------------------------------+
| sku_id    | int  | ID for the product being added to the cart |
+-----------+------+--------------------------------------------+
*/