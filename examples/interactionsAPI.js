/*
POST /interactions
Status: 201 CREATED
Invalid parameters: Status: 422 UNPROCESSABLE ENTITY
+-----------+--------+----------------------------------------------------------------+
| Parameter |  Type  |                          Description                           |
+-----------+--------+----------------------------------------------------------------+
| element   | string | Required. Selector for the element which was clicked           |
| widget    | string | Required. Name of the module/widget in which the click occured |
| time      | string | Required. Time the interaction occurred                        |
+-----------+--------+----------------------------------------------------------------+
*/
