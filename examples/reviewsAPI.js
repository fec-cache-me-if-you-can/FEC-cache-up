/*
GET /reviews/
Status: 200 OK
+------------+---------+-------------------------------------------------------------------------------------+
| Parameter  |  Type   |                                     Description                                     |
+------------+---------+-------------------------------------------------------------------------------------+
| page       | integer | Selects the page of results to return. Default 1.                                   |
| count      | integer | Specifies how many results per page to return. Default 5.                           |
| sort       | text    | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant" |
| product_id | integer | Specifies the product for which to retrieve reviews.                                |
+------------+---------+-------------------------------------------------------------------------------------+
*/

{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}

/*
GET /reviews/meta
Status: 200 OK
+------------+---------+--------------------------------------------------------------+
| Parameter  |  Type   |                         Description                          |
+------------+---------+--------------------------------------------------------------+
| product_id | integer | Required ID of the product for which data should be returned |
+------------+---------+--------------------------------------------------------------+
*/

{
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}

/*
POST /reviews
Status: 201 CREATED
+-----------------+---------+-------------------------------------------------------------------------------------------------------------------------------------------+
|    Parameter    |  Type   |                                                                Description                                                                |
+-----------------+---------+-------------------------------------------------------------------------------------------------------------------------------------------+
| product_id      | integer | Required ID of the product to post the review for                                                                                         |
| rating          | int     | Integer (1-5) indicating the review rating                                                                                                |
| summary         | text    | Summary text of the review                                                                                                                |
| body            | text    | Continued or full text of the review                                                                                                      |
| recommend       | bool    | Value indicating if the reviewer recommends the product                                                                                   |
| name            | text    | Username for question asker                                                                                                               |
| email           | text    | Email address for question asker                                                                                                          |
| photos          | [text]  | Array of text urls that link to images to be shown                                                                                        |
| characteristics | object  | Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...} |
+-----------------+---------+-------------------------------------------------------------------------------------------------------------------------------------------+
*/

/*
PUT /reviews/:review_id/helpful
Status: 204 NO CONTENT
+-----------+---------+-------------------------------------+
| Parameter |  Type   |             Description             |
+-----------+---------+-------------------------------------+
| review_id | integer | Required ID of the review to update |
+-----------+---------+-------------------------------------+
*/

/*
PUT /reviews/:review_id/report
Status: 204 NO CONTENT
+-----------+---------+-------------------------------------+
| Parameter |  Type   |             Description             |
+-----------+---------+-------------------------------------+
| review_id | integer | Required ID of the review to update |
+-----------+---------+-------------------------------------+
*/