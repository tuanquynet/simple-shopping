curl --location --request POST 'http://localhost:3000/products' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "621a17041fbf4a004dd941e6",
  "name": "VF e34",
  "color": "black",
  "branchId": "6217163b43cdc079a9d40554",
  "categoryId": "6218ab93c5f00500555cbc4a",
  "price": 30000
}'
echo "-----"

curl --location --request POST 'http://localhost:3000/products' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "621a1b1ec20c9529bfe2c5ab",
  "name": "VF 8",
  "color": "white",
  "branchId": "6217163b43cdc079a9d40554",
  "categoryId": "6218ab93c5f00500555cbc4a",
  "price": 40000
}'
echo ""
