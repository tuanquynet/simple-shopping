PRODUCT_ID=621a17041fbf4a004dd941e6
curl --location --request DELETE "http://localhost:3000/products/$PRODUCT_ID"
echo "---"
PRODUCT_ID=621a1b1ec20c9529bfe2c5ab
curl --location --request DELETE "http://localhost:3000/products/$PRODUCT_ID"
echo ""