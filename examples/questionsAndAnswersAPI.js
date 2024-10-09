/*
GET /qa/questions
Status: 200 OK
+------------+---------+-----------------------------------------------------------+
| Parameter  |  Type   |                        Description                        |
+------------+---------+-----------------------------------------------------------+
| product_id | integer | Specifies the product for which to retrieve questions.    |
| page       | integer | Selects the page of results to return. Default 1.         |
| count      | integer | Specifies how many results per page to return. Default 5. |
+------------+---------+-----------------------------------------------------------+
*/

{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}

/*
GET /qa/questions/:question_id/answers
Status: 200 OK
+-------------+---------+---------------------------------------------------------+
|  Parameter  |  Type   |                       Description                       |
+-------------+---------+---------------------------------------------------------+
| question_id | integer | Required ID of the question for wich answers are needed |
+-------------+---------+---------------------------------------------------------+
===================================================================================
query parameters
+-----------+---------+-----------------------------------------------------------+
| Parameter |  Type   |                        Description                        |
+-----------+---------+-----------------------------------------------------------+
| page      | integer | Selects the page of results to return. Default 1.         |
| count     | integer | Specifies how many results per page to return. Default 5. |
+-----------+---------+-----------------------------------------------------------+
*/

{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}

/*
POST /qa/questions
Status: 201 CREATED
+------------+---------+-------------------------------------------------------------+
| Parameter  |  Type   |                         Description                         |
+------------+---------+-------------------------------------------------------------+
| body       | text    | Text of question being asked                                |
| name       | text    | Username for question asker                                 |
| email      | text    | Email address for question asker                            |
| product_id | integer | Required ID of the Product for which the question is posted |
+------------+---------+-------------------------------------------------------------+
*/

/*
POST /qa/questions/:question_id/answers
Status: 201 CREATED
+-------------+---------+----------------------------------------------------+
|  Parameter  |  Type   |                    Description                     |
+-------------+---------+----------------------------------------------------+
| question_id | integer | Required ID of the question to post the answer for |
+-------------+---------+----------------------------------------------------+
==============================================================================
body parameters
+-----------+--------+-----------------------------------------------------+
| Parameter |  Type  |                     Description                     |
+-----------+--------+-----------------------------------------------------+
| body      | text   | Text of question being asked                        |
| name      | text   | Username for question asker                         |
| email     | text   | Email address for question asker                    |
| photos    | [text] | An array of urls corresponding to images to display |
+-----------+--------+-----------------------------------------------------+
*/

/*
PUT /qa/questions/:question_id/helpful
Status: 204 NO CONTENT
+-------------+---------+---------------------------------------+
|  Parameter  |  Type   |              Description              |
+-------------+---------+---------------------------------------+
| question_id | integer | Required ID of the question to update |
+-------------+---------+---------------------------------------+
*/

/*
PUT /qa/questions/:question_id/report
Status: 204 NO CONTENT
+-------------+---------+---------------------------------------+
|  Parameter  |  Type   |              Description              |
+-------------+---------+---------------------------------------+
| question_id | integer | Required ID of the question to update |
+-------------+---------+---------------------------------------+
*/

/*
PUT /qa/answers/:answer_id/helpful
Status: 204 NO CONTENT
+-----------+---------+-------------------------------------+
| Parameter |  Type   |             Description             |
+-----------+---------+-------------------------------------+
| answer_id | integer | Required ID of the answer to update |
+-----------+---------+-------------------------------------+
*/

/*
PUT /qa/answers/:answer_id/report
Status: 204 NO CONTENT
+-----------+---------+-------------------------------------+
| Parameter |  Type   |             Description             |
+-----------+---------+-------------------------------------+
| answer_id | integer | Required ID of the answer to update |
+-----------+---------+-------------------------------------+
*/